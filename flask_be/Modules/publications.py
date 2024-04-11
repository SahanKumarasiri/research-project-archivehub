from utils.helper import web_scraper_init
from selectolax.lexbor import LexborHTMLParser
from typing import List, Union, Dict
import os
import pandas as pd
from Modules.enums import categories
from itertools import groupby


class Publications:
    def init(self) -> None:
        pass

    def publication_data(
        self,
        user_id: str,
        parse_articles: bool = False,
        article_pagination: bool = False
    ) -> Dict[str, List[Union[str, int, None]]]:
        
        def categorize_publication(publication_title):
            for category, keywords in categories.items():
                for keyword in keywords:
                    if keyword in publication_title:
                        return category

            return 'OTHER'
        
        def remove_duplicates_by_attribute(input_list, attribute):
            seen = set()
            unique_list = []
            for obj in input_list:
                obj_attribute = obj.get(attribute)
                if obj_attribute not in seen:
                    seen.add(obj_attribute)
                    unique_list.append(obj)
            return unique_list
            
        driver = web_scraper_init()

        driver.get(
            f'{os.environ.get("PUBLICATION_KEY", None)}{user_id}&hl=en&gl=us&pagesize=100')
        parser = LexborHTMLParser(driver.page_source)

        profile_info = {
            'co-authors': [],
            'articles': [],
            'hIndex': '',
            'total': None
        }

        try:
            profile_info['hIndex'] = int([hIndex.text()
                                        for hIndex in parser.css('.gsc_rsb_std')][2])
        except:
            profile_info['hIndex'] = 0
            
        for co_author in parser.css('.gsc_rsb_aa'):
            profile_info['co-authors'].append({
                'name': co_author.css_first('.gsc_rsb_a_desc a').text(),
                'profile_link': f"{os.environ.get('BASE_URL', None)}{co_author.css_first('.gsc_rsb_a_desc a').attrs['href']}",
                'affiliation': co_author.css_first('.gsc_rsb_a_ext').text(),
                'imgURL': f'{os.environ.get("BASE_IMG_PATH", None)}{co_author.css_first("img").attrs["id"].replace("gsc_rsb-", "").replace("-img", "")}&citpid=2'
            })

        # extracts only first 100 articles, WITHOUT paginaiton
        if parse_articles:
            for index, article in enumerate(parser.css('.gsc_a_tr'), start=1):
                try:
                    article_title = article.css_first('.gsc_a_at').text()
                except:
                    article_title = None

                try:
                    article_link = f"{os.environ.get('BASE_URL', None)}{article.css_first('.gsc_a_at').attrs['href']}"
                except:
                    article_link = None

                try:
                    if ',' in article.css_first('.gsc_a_at+ .gs_gray').text():
                        article_authors: List[str] = article.css_first(
                            '.gsc_a_at+ .gs_gray').text().split(', ')  # list of authors
                    else:
                        article_authors = article.css_first(
                            '.gsc_a_at+ .gs_gray').text()           # single authour
                except:
                    article_authors = None

                try:
                    article_publication = article.css_first(
                        '.gs_gray+ .gs_gray').text()
                except:
                    article_publication = None

                try:
                    cited_by_count = article.css_first('.gsc_a_ac').text()
                except:
                    cited_by_count = None

                try:
                    publication_year = article.css_first('.gsc_a_hc').text()
                except:
                    publication_year = None

                profile_info['articles'].append({
                    'title': article_title,
                    'link': article_link,
                    'authors': article_authors,
                    'publication': article_publication if article_publication else None,
                    'category': categorize_publication(article_publication),
                    # int value or None or empty str
                    'publication_year': int(publication_year) if publication_year else publication_year or None,
                    # int value or None or empty str
                    'cited_by_count': int(cited_by_count) if cited_by_count else cited_by_count or None
                })
        elif parse_articles is False:
            profile_info.pop('articles')

        page_num = 0

        # extracts all articles
        if parse_articles and article_pagination:
            while True:
                driver.get(
                    f'{os.environ.get("PUBLICATION_KEY", None)}{user_id}&hl=en&gl=us&cstart={page_num}&pagesize=100')
                parser = LexborHTMLParser(driver.page_source)

                for article in parser.css('.gsc_a_tr'):
                    try:
                        article_title = article.css_first('.gsc_a_at').text()
                    except:
                        article_title = None

                    try:
                        article_link = f"{os.environ.get('BASE_URL', None)}{article.css_first('.gsc_a_at').attrs['href']}"
                    except:
                        article_link = None

                    try:
                        if ',' in article.css_first('.gsc_a_at+ .gs_gray').text():
                            article_authors: List[str] = article.css_first(
                                '.gsc_a_at+ .gs_gray').text().split(', ')  # list of authors
                        else:
                            article_authors = article.css_first(
                                '.gsc_a_at+ .gs_gray').text()           # single authour
                    except:
                        article_authors = None

                    try:
                        article_publication = article.css_first(
                            '.gs_gray+ .gs_gray').text()
                    except:
                        article_publication = None

                    try:
                        cited_by_count = article.css_first('.gsc_a_ac').text()
                    except:
                        cited_by_count = None

                    try:
                        publication_year = article.css_first(
                            '.gsc_a_hc').text()
                    except:
                        publication_year = None

                    profile_info['articles'].append({
                        'title': article_title,
                        'link': article_link,
                        'authors': article_authors,
                        'publication': article_publication if article_publication else None,
                        # int value or None or empty str
                        'publication_year': int(publication_year) if publication_year else publication_year or None,
                        # int value or None or empty str
                        'cited_by_count': int(cited_by_count) if cited_by_count else cited_by_count or None
                    })

                if parser.css_first('.gsc_a_e'):
                    break
                else:
                    page_num += 100  # paginate to the next page
        # remove articles key if user don't want to extract it
        elif article_pagination and parse_articles is False:
            profile_info.pop('articles')
        driver.quit()
        # remove last index beacuse of null values
        profile_info['articles'] = profile_info['articles'][:-1]
        profile_info['articles'] = remove_duplicates_by_attribute(profile_info['articles'], 'title')
        profile_info['total'] = len(profile_info['articles'])

        # data preprocessing
        for index, profile in enumerate(profile_info['articles']):
            if profile['cited_by_count'] is None:
                profile_info['articles'][index]['cited_by_count'] = 'N/A'
                profile_info['articles'][index]['publication'] = 'N/A'
                profile_info['articles'][index]['publication_year'] = 'N/A'
        
        # Sort the articles based on category
        sorted_articles = sorted(profile_info['articles'], key=lambda x: x.get('category', 'Uncategorized'))

        # Group the articles by category
        grouped_articles = []
        for category, articles in groupby(sorted_articles, key=lambda x: x.get('category', 'Uncategorized')):
            grouped_articles.append((category, list(articles)))


        profile_info['articles'] = grouped_articles

        cwd = os.getcwd()
        pd.DataFrame(profile_info['articles']).to_csv(
            f'{cwd}/csv/publications-{user_id}.csv')

        return profile_info