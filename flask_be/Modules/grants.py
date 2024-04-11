
"""What this script does:
(1) finds the latest database on grants.gov
(2) downloads the database
(3) unzips the database to an xml file
(4) converts the xml database into a pandas dataframe
(5) filters the dataframe by keywords
"""
import os
import time
import zipfile
import requests
import pandas as pd
from datetime import datetime, timedelta
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
import joblib
from sklearn import preprocessing

pd.options.mode.chained_assignment = None


# ------------- find the database -------------


def get_xml_url_and_filename():
    """Get the URL and filename of the most recent XML database file
    posted on grants.gov."""

    day_to_try = datetime.today()

    file_found = None
    while file_found is None:
        url = f'{os.environ.get("GRANTSDB_URL", None)}' + '{}v2.zip'.format(
            day_to_try.strftime('%Y%m%d'))
        response = requests.get(url, stream=True)

        # look back in time if todays data is not posted yet
        if response.status_code == 200:
            file_found = url
        else:
            day_to_try = day_to_try - timedelta(days=1)

        filename = 'GrantsDBExtract{}v2.zip'.format(
            day_to_try.strftime('%Y%m%d'))

    print('Found database file {}'.format(filename))

    return url, filename


# get url and filename of the latest database available for extraction
# url, filename = get_xml_url_and_filename()


# ------------- download the database -------------


def download_file_from_url(url, filename):
    """Download a file from a URL"""
    # remove all previously-downloaded zip files
    [os.remove(f) for f in os.listdir() if f.endswith(".zip")]
    # ping the dataset url
    response = requests.get(url, stream=True)
    # if file url is found
    if response.status_code == 200:
        handle = open(filename, "wb")
        for chunk in response.iter_content(chunk_size=512):
            if chunk:  # filter out keep-alive new chunks
                handle.write(chunk)
        handle.close()
        time.sleep(3)
        print('Database successfully downloaded')
    # if file url is not found
    else:
        print('URL does not exist')


# download the database zip file
# download_file_from_url(url, filename)


# ------------- unzip and parse file -------------


def unzip_and_soupify(filename, unzipped_dirname='unzipped'):
    """Unzip a zip file and parse it using beautiful soup"""

    # if unzipped directory doesn't exist, create it
    if not os.path.exists(unzipped_dirname):
        os.makedirs(unzipped_dirname)

    # remove all previously-downloaded zip files
    for f in os.listdir(unzipped_dirname):
        os.remove(os.path.join(unzipped_dirname, f))

    # unzip raw file
    with zipfile.ZipFile(filename, "r") as z:
        z.extractall(unzipped_dirname)

    # get path of file in unzipped folder
    unzipped_filepath = os.path.join(
        unzipped_dirname,
        os.listdir(unzipped_dirname)[0])

    print('Unzipping {}'.format(unzipped_filepath))

    # parse as tree and convert to string
    tree = ET.parse(unzipped_filepath)
    root = tree.getroot()
    doc = str(ET.tostring(root, encoding='unicode', method='xml'))
    # initialize beautiful soup object
    soup = BeautifulSoup(doc, 'lxml')
    print('Database unzipped')

    return soup


# get beautiful soup object from parsed zip file
# soup = unzip_and_soupify(filename)


# ------------------ populate dataframe with every xml tag -------------


def soup_to_df(soup):
    """Convert beautifulsoup object from grants.gov XML into dataframe"""
    # list of bs4 FOA objects
    s = 'opportunitysynopsisdetail'
    foa_objs = [tag for tag in soup.find_all() if s in tag.name.lower()]

    # loop over each FOA in the database and save its details as a dictionary
    dic = {}
    for i, foa in enumerate(foa_objs):
        ch = foa.findChildren()
        dic[i] = {fd.name.split('ns0:')[1]: fd.text for fd in ch}

    # create dataframe from dictionary
    df = pd.DataFrame.from_dict(dic, orient='index')
    day_to_try = datetime.today()
    df.to_csv('GrantsDBExtract{}v2.csv'.format(
        day_to_try.strftime('%Y%m%d')))
    return df


# get full dataframe of all FOAs
# dff = soup_to_df(soup)

# ============================================================ML===========================================================
class Grants:
    def __init__(self) -> None:
        pass
    @staticmethod
    def parse(user_id):
        cwd = os.getcwd()
        dff = pd.read_csv(f'{cwd}/csv/GrantsDBExtract20230507v2.csv')
        lbEncoder = preprocessing.LabelEncoder()

        # ------------------------ filter by dates and keywords -------------------
        def to_date(date_str):
            """Convert date string from database into date object"""
            return datetime.strptime(str(date_str), '%m%d%Y').date()

        def is_recent(date, days=14):
            """Check if date occured within n amount of days from today"""
            return (datetime.today().date() - to_date(date)).days <= days

        def is_open(date):
            """Check if FOA is still open (closedate is in the past)"""
            if type(date) == float:
                return True
            elif type(date) == str:
                return (datetime.today().date() - to_date(date)).days <= 0

        def reformat_date(s):
            """Reformat the date string with hyphens so its easier to read"""
            s = str(s)
            return s[4:]+'-'+s[:2]+'-'+s[2:4]

        def sort_by_recent_updates(df):
            """Sort the dataframe by recently updated dates"""
            new_dates = [reformat_date(i) for i in df['lastupdateddate']]
            df.insert(1, 'updatedate', new_dates)
            df = df.sort_values(by=['updatedate'], ascending=False)
            print('Databae sorted and filtered by date')
            return df

        def filter_by_keywords(df):
            """Filter the dataframe by keywords and nonkeywords (words to avoid).
            The keywords and nonkeywords are set in external csv files called
            'keywords.csv' and 'nonkeywords.csv'"""
            # get keywords to filter dataframe
            keywords = list(pd.read_csv(
                f'{cwd}/csv/keywords-{user_id}.csv', header=None)[0])
            keywords_str = '|'.join(keywords).lower()
            #output somthing like "quantitative|information|software|bpm|ict for dev|analysis|systems|engineering"
            # get non-keywords to avoid
            nonkeywords = list(pd.read_csv(
                f'{cwd}/csv/nonkeywords.csv', header=None)[0])
            nonkeywords_str = '|'.join(nonkeywords).lower()

            # filter dataframe by keywords and nonkeywords
            df = df[df['description'].str.contains(keywords_str, na=False)]
            df = df[~df['description'].str.contains(nonkeywords_str, na=False)]

            print('Database filtered by keywords')

            return df

        # include only recently updated FOAs
        df = dff[[is_recent(i) for i in dff['lastupdateddate']]]

        # include only FOAs which are not closed
        df = df[[is_open(i) for i in df['closedate']]]

        # sort by newest FOAs at the top
        df = sort_by_recent_updates(df)

        # filter by keywords
        df = filter_by_keywords(df)

        # drop unwanted columns
        df = df.drop(['Unnamed: 0', 'opportunityid', 'opportunitycategory', 'fundinginstrumenttype', 'categoryoffundingactivity', 'categoryexplanation', 'cfdanumbers',
                      'agencycode', 'version', 'costsharingormatchingrequirement', 'additionalinformationtext', 'closedateexplanation', 'opportunitycategoryexplanation'], axis='columns')

        # Data Cleaning and Data Drop Process
        df['closedate'] = df['closedate'].fillna('N/A')
        df['additionalinformationoneligibility'] = df['additionalinformationoneligibility'].fillna(
            'N/A')
        df['agencyname'] = df['agencyname'].fillna('N/A')
        df['awardceiling'] = df['awardceiling'].fillna('N/A')
        df['awardfloor'] = df['awardfloor'].fillna('N/A')
        df['estimatedtotalprogramfunding'] = df['estimatedtotalprogramfunding'].fillna(
            'N/A')
        df['expectednumberofawards'] = df['expectednumberofawards'].fillna(
            'N/A')
        df['description'] = df['description'].fillna('N/A')
        df['archivedate'] = df['archivedate'].fillna('N/A')
        df['grantorcontactemail'] = df['grantorcontactemail'].fillna('N/A')
        df['grantorcontactemaildescription'] = df['grantorcontactemaildescription'].fillna(
            'N/A')
        df['additionalinformationurl'] = df['additionalinformationurl'].fillna(
            'N/A')

        temp = dff.copy()
        y = lbEncoder.fit_transform(temp['opportunitytitle'])

        # get confidence-level
        loaded_model = joblib.load(f'{cwd}/models/grants-model.joblib')

        return {"grants": pd.DataFrame.to_dict(df), "confidence-level": float(format(loaded_model.inertia_/float(y.size)))}
