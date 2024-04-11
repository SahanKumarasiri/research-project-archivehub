from selenium import webdriver
from selenium_stealth import stealth
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import jwt
import os
from flask import jsonify


def web_scraper_init():
    # selenium stealth
    options = webdriver.ChromeOptions()
    # options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')

    options.add_experimental_option(
        'excludeSwitches', ['enable-automation', 'enable-logging'])
    options.add_experimental_option('useAutomationExtension', False)

    service = Service(ChromeDriverManager().install())
    # driver = webdriver.Chrome(
    #     chrome_options=options, executable_path=os.environ.get("CHROMEDRIVER_PATH"), service=service)
    driver = webdriver.Chrome(
        options=options, service=service)

    stealth(driver,
            languages=['en-US', 'en'],
            vendor='Google Inc.',
            platform='Win32',
            webgl_vendor='Intel Inc.',
            renderer='Intel Iris OpenGL Engine',
            fix_hairline=True
            )
    return driver

def decodedHeaderHelper(token):
    if not token:
        return jsonify({'error': 'You do not have permission to access this resource.'}), 403

    if token.startswith('Bearer '):
        token = token.split(' ')[1]
        try:
            jwt.decode(token, '305721d15b0ca', algorithms=['HS256'])['authorized'] 
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token Expired!'}), 400
        except jwt.InvalidAlgorithmError:
            return jsonify({'error': 'The specified algorithm value is not allowed'}), 400
        except jwt.InvalidSignatureError:
            return jsonify({'error': 'Signature verification failed'}), 400