from utils.helper import web_scraper_init
from selectolax.lexbor import LexborHTMLParser
from parsel import Selector
from typing import List, Dict, Callable
import time
import random
import re
import pandas as pd
import os


class Profile:
    def init(self) -> None:
        pass

    def parse(self, parser: Callable, profile_results_data: Callable):

        try:
            imgURL: str = parser.css_first('.gs_rimg img').attrs["src"]
        except:
            imgURL = None

        for profile in parser.css('.gs_ai_chpr'):
            try:
                name: str = profile.css_first('.gs_ai_name a').text()
            except:
                name = None

            try:
                link: str = f'{os.environ.get("BASE_URL",None)}{profile.css_first(".gs_ai_name a").attrs["href"]}'
            except:
                link = None
            try:
                affiliations: str = profile.css_first('.gs_ai_aff').text()
            except:
                affiliations = None

            try:
                interests: list = [interest.text()
                                   for interest in profile.css('.gs_ai_one_int')]
            except:
                interests = None

            try:
                email: str = profile.css_first('.gs_ai_eml').text()
            except:
                email = None

            try:
                # Cited by 17143 -> 17143
                cited_by: int = re.search(
                    r'\d+', profile.css_first('.gs_ai_cby').text()).group()
            except:
                cited_by = None

            profile_results_data.append({
                'name': name,
                'link': link,
                'affiliations': affiliations,
                'interests': interests if interests else None,
                'email': email if email else None,
                'cited_by_count': int(cited_by) if cited_by else None,
                'imgURL': imgURL.replace("small_photo", "medium_photo"),
                'user_id': None
            })

    def profile(
        self,
        query: str,
        url: str,
        pagination: bool = False,
        save_to_csv: bool = False,
        save_to_json: bool = False,
        save_to_keyword: bool = False
    ) -> List[Dict[str, str]]:

        driver = web_scraper_init()

        params = {}  # stores next page token to add to URL later
        page_num = 0
        profile_results_data = []

        if pagination:
            while True:
                # if next page token appears, add to to URL as URL parameter
                # otherwise, do a search without next page token parameter (Line: 101)
                if params.get('after_author') is None:
                    driver.get(
                        f'{os.environ.get("PROFILE_KEY", None)}{query}&hl=en&astart={page_num}')
                    parser = LexborHTMLParser(driver.page_source)

                    selector = Selector(text=driver.page_source)

                    self.parse(parser=parser,
                               profile_results_data=profile_results_data)

                    # check if the next arrow button is active by checking 'onclick' attribute
                    if selector.css('.gsc_pgn button.gs_btnPR::attr(onclick)').get():
                        # extracting next page token and passing to 'after_author' query URL parameter
                        params['after_author'] = re.search(r'after_author\\x3d(.*)\\x26', str(selector.css(
                            '.gsc_pgn button.gs_btnPR::attr(onclick)').get())).group(1)  # -> XB0HAMS9__8J
                        page_num += 10                        # paginate to the next page
                        # sleep between paginations
                        time.sleep(random.randint(1, 3))
                    else:
                        break
                else:
                    driver.get(
                        f'{os.environ.get("PROFILE_KEY", None)}{query}&hl=en&astart={page_num}&after_author={params["after_author"]}')
                    parser = LexborHTMLParser(driver.page_source)

                    selector = Selector(text=driver.page_source)

                    self.parse(parser=parser,
                               profile_results_data=profile_results_data)

                    if selector.css('.gsc_pgn button.gs_btnPR::attr(onclick)').get():
                        # extracting next page token and passing to 'after_author' query URL parameter
                        params['after_author'] = re.search(r'after_author\\x3d(.*)\\x26', str(selector.css(
                            '.gsc_pgn button.gs_btnPR::attr(onclick)').get())).group(1)  # -> XB0HAMS9__8J
                        page_num += 10                        # paginate to the next page
                        # sleep between paginations
                        time.sleep(random.randint(1, 3))
                    else:
                        break
        else:
            # parse single, first page
            driver.get(
                f'{os.environ.get("PROFILE_KEY", None)}{query}&hl=en&astart={page_num}')
            parser = LexborHTMLParser(driver.page_source)

            self.parse(parser=parser, profile_results_data=profile_results_data)

        driver.quit()

        cwd = os.getcwd()
        if save_to_csv:
            pd.DataFrame(data=profile_results_data).to_csv(f'{cwd}/csv/profile.csv',
                                                           index=False, encoding='utf-8')
        if save_to_json:
            pd.DataFrame(data=profile_results_data).to_json(f'{cwd}/csv/profile.json',
                                                            orient='records')
        if save_to_keyword and len(profile_results_data):
            if len(profile_results_data) > 1:
                for profile in profile_results_data:
                    if profile['name'] == query and url in profile["email"]:
                        profile_results_data = [profile]
            user_id = profile_results_data[0]['link'][int(
                os.environ.get('START_INDEX')):]
            profile_results_data[0]['user_id'] = user_id
            if len(profile_results_data):
                my_list = []
                try:
                    my_list = profile_results_data[0]['interests']
                except:
                    my_list = []

                intersets = []
                keywords = []

                # Accessing elements and getting words separately
                if(my_list):
                    for item in my_list:
                        intersets.append(item)
                        # Splitting the string into words
                        words = re.findall(r'[A-Z][A-Za-z]*', item)
                        # Filtering out lowercase words
                        words = [word for word in words if word[0].isupper()]
                        keywords.extend(words)

                # Creating pandas DataFrame
                df = pd.DataFrame(keywords)

                # Saving to CSV without column name
                df.to_csv(f'{cwd}/csv/keywords-{user_id}.csv',
                          index=False, header=False)
                pd.DataFrame(intersets).to_csv(
                    f'{cwd}/csv/interests-{user_id}.csv', index=False, header=False)

        matching_profiles = []

        # validation for getting personalized profile
        for profile in profile_results_data:
            email = profile["email"]
            print(url in email)
            if url in email:
                matching_profiles.append(profile)

        if len(matching_profiles):
            # drop unwanted columns
            matching_profiles = pd.DataFrame(matching_profiles).drop(
                ['email', 'link'], axis='columns')
            matching_profiles = matching_profiles.to_dict(orient='list')
            # Extract values from the dictionary
            matching_profiles = {key: value[0]
                                for key, value in matching_profiles.items()}

        return matching_profiles