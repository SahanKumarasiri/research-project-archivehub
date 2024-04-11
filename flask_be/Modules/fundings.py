import pandas as pd
import numpy as np
import os
import re
import boto3

class Fundings:
    @staticmethod
    def get_fundings(user_id,type,payload):

        cwd = os.getcwd()

        data = pd.read_csv(os.environ.get('BASE_SOURCE_FUNDING', None))
        data = data.reset_index()

        interests = []

        if(type == 'PERSONALIZED'):
            df = pd.read_csv(f'{cwd}/csv/interests-{user_id}.csv', header=None)
            interests = np.array(df[0]).tolist()
        else:
            interests = payload['interests']
        final_result = []

        for index, row in data.iterrows():
            for interest in interests:
                # words = interest.split()
                print(interest)

                # pattern = r'\b(?:{})\b'.format('|'.join(map(re.escape, [w for w in words if w[0].isupper()])))
                match = re.search(interest.lower(), str(row['Synopsis']))

                if match:
                    
                    final_result.append(row.to_dict())

        return {'fundings': final_result, 'total': len(data), 'matches': len(final_result)}
    
    @staticmethod
    def enable_notifiactions(user_id, data):
        # AWS credentials and DynamoDB table name
        aws_access_key_id = os.environ.get('AWS_ACCESS_KEY_ID')
        aws_secret_access_key = os.environ.get('SECRET_ACCESS_KEY')
        table_name = os.environ.get('FUNDING_TABLE')
        region_name = os.environ.get('AWS_REGION')

        # Initialize DynamoDB client
        dynamodb = boto3.client('dynamodb', region_name=region_name, 
                                aws_access_key_id=aws_access_key_id, 
                                aws_secret_access_key=aws_secret_access_key)
        
        for item in data:
            title = item['Title']

            # Check if the title already exists in DynamoDB
            response = dynamodb.query(
                TableName=table_name,
                KeyConditionExpression='Title = :t',
                ExpressionAttributeValues={':t': {'S': title}}
            )

            if response['Count'] == 0:
                # Title does not exist, save the row in DynamoDB
                dynamodb.put_item(
                    TableName=table_name,
                    Item={
                        'UserId': user_id,
                        'Title': {'S': str(title)},
                        'Synopsis': {'S': str(item['Synopsis'])},
                        'Award Type': {'S': str(item['Award Type'])},
                        'Next due date (Y-m-d)': {'S': str(item['Next due date (Y-m-d)'])},
                        'Posted date (Y-m-d)': {'S': str(item['Posted date (Y-m-d)'])},
                        'URL': {'S': str(item['URL'])},
                    }
                )
        
        return 'success'

