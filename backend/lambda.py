import sys
import requests
import json

def retrieve(event, handler):
    #playlist = getPlaylist()
    #tracklist = playlist['tracks']['items']
    x = event['body']
    tokens = event['body'].split("=")
    token = tokens[1]
    print('token: ' + token)
    

    terms = { 'long_term' : 'all time' }
    # {'short_term' : 'the last four weeks' ,       'medium_term' : 'the last six months',  'long_term' : 'all time'}
            
    selects = []
    for term in terms.keys():
        faves = getFaves(term, token)
        bangers = faves['items']
        print("Top " + str(len(bangers)) + " of " + terms[term])
        for banger in bangers:
            selects.append(banger['name'] + ' by ' + banger['artists'][0]['name'])
        print(selects)
#        selects = []



    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": '*' ,
            "Access-Control-Allow-Headers": "*"
        },
        "body": json.dumps(selects)
    }
    


def getPlaylist():
    headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer BQAKFUUCqrRLi6IkonzVjF4YLt3MSdgwuopmIJ1b5b369sGKWAmOTA4ut8aGAaZceGJ3FIGwvPBUyuH4ZykKxGijsWbQAc_b3ruOIoI6gOmhg8uzsP4BxBKYidGS370CIlklAbuj5c7HujN4bMYM5x4Q5w',
    }   
    response = requests.get('https://api.spotify.com/v1/playlists/5lLnJnb3LkaYxxsYc2ZpVS', headers=headers)

    return response.json()
    
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