import requests
import os
from collections import Counter
import numpy as np
from sklearn.cluster import KMeans
from rake_nltk import Rake
from utils.helper import web_scraper_init
import nltk
nltk.download('stopwords')
nltk.download('punkt')


class Recommendation:

    @staticmethod
    def result(user_id, type, payload):
        topConf = []
        topJour = []
        resultCon = []
        resultJour = []
        data = []  # Initialize data as a list
        items = []  # Initialize items as a list

        web_scraper_init()
        
        def get_conferences_and_journals(title, Type):
            url = f'{os.environ.get("CROSREF", None)}{title}&filter=type:{Type}&rows=1000'

            response = requests.get(url)
            cwd = os.getcwd()

            if response.status_code == 200:
                api_data = response.json()
                items.extend(api_data['message']['items'])
               
            
                if len(items) > 0:
                    for item in items:
                        item_type = item['type']
                        if item_type == 'proceedings':
                            publisher = item.get('publisher', '')
                            title = item.get('title', [''])[0]
                            if publisher == "ACM":
                                publisher = "ACM Press"
                            topConf.append(publisher)
                            resultCon.append({"title": title, "year": item.get('published-print'), "publisher":publisher})
                        elif item_type == 'journal-article':
                            publisher = item.get('publisher', '')
                            title = item.get('title', [''])[0]
                            if publisher:
                                topJour.append(publisher)
                                resultJour.append({"title": title, "year": item.get('published-print'), "publisher": publisher})
                            else:
                                print(f"No publisher found for '{title}'.")
                else:
                    # No conferences or journals found for the given title
                    print(f"No conferences or journals found for '{title}'.")
            else:
                raise ValueError(
                    "Error occurred while fetching data from the API.")

        if type == 'TITLE':
            get_conferences_and_journals(payload["query"], 'proceedings')
            get_conferences_and_journals(payload["query"], 'journal-article')
        elif type == 'PERSONALIZED':
            interests = payload['interests']
            print(interests)
            for topic in interests:
                get_conferences_and_journals(topic, 'proceedings')
                get_conferences_and_journals(topic, 'journal-article')
        else:
            r = Rake()
            r.extract_keywords_from_text(payload["query"])
            keywords = r.get_ranked_phrases()[0:2]
            
            for keyword in keywords:
                get_conferences_and_journals(keyword, 'proceedings')
                get_conferences_and_journals(keyword, 'journal-article')

        # Perform clustering using k-means
        if len(data) > 0:
            # Convert the data list into a NumPy array
            data_array = np.array(data)

            # Check for duplicate points
            unique_indices = np.unique(
                data_array, axis=0, return_index=True)[1]
            unique_data = data_array[unique_indices]

            if len(unique_data) > 1:
                # Apply k-means clustering
                kmeans = KMeans(n_clusters=3)  # Define the number of clusters
                clusters = kmeans.fit_predict(unique_data)

                # Assign cluster labels to conferences and journals
                for i, item in enumerate(items):
                    if item['type'] == 'proceedings':
                        resultCon[i] += f" (Cluster {clusters[i]})"
                    elif item['type'] == 'journal-article':
                        resultJour[i] += f" (Cluster {clusters[i]})"

        # Count occurrences and sort in descending order
        topConf_counts = Counter(topConf)
        topConf_sorted = sorted(topConf_counts.items(),
                                key=lambda x: x[1], reverse=True)

        topJour_counts = Counter(topJour)
        topJour_sorted = sorted(topJour_counts.items(),
                                key=lambda x: x[1], reverse=True)

        if type == 'TITLE' or type == 'ABSTRACT':
            return {'ConferenceSuggestions': resultCon, 'JournalSuggestions': resultJour, 'topConferences': topConf_sorted, 'topJournals': topJour_sorted}
        else:
            return {
                'topConferences': topConf_sorted,
                'topJournals': topJour_sorted
            }