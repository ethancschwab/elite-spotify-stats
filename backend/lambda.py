import sys
import requests
import json

def retrieve(event, handler):

    try:
        token = event['body'].split("&")[0].split("=")[1]
        duration=event['body'].split("&")[1].split("=")[1]
        print('token: ' + token)
        print('duration: ' + duration)
        
               
        selects = []
        faves = getFaves(duration, token)
        bangers = faves['items']
        for banger in bangers:
            selects.append(banger['name'] + ' by ' + banger['artists'][0]['name'])
        print(selects)



        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": '*' ,
                "Access-Control-Allow-Headers": "*"
            },
            "body": json.dumps(selects)
        }
    except:
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": '*' ,
                "Access-Control-Allow-Headers": "*"
            },
            "body": "Ya tresh"
        }
    

    
def getFaves(duration, token):
    auth_string = 'Bearer ' + token
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth_string,
    }   
    params = ( ('time_range', duration),('limit','50'),)
    response = requests.get('https://api.spotify.com/v1/me/top/tracks', headers=headers, params=params)
    
    return response.json()









