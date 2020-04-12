import sys, requests, traceback, json, random


def retrieve(event, handler):

    try:
        token = event['body'].split("&")[0].split("=")[1]
        duration=event['body'].split("&")[1].split("=")[1]
        print('token: ' + token)
        print('duration: ' + duration)
        
               
        favorite_artists = []
        faves = getFaves(duration, token)
        artists = faves['items']
        print(artists)
        for artist in artists:
            favorite_artists.append(artist['name'].replace(",","") + "&&&" + artist['images'][2]['url']+ "&&&" + artist['external_urls']['spotify'])
            
        

        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": 'http://elitespotifystats.s3-website-us-west-1.amazonaws.com' ,
                "Access-Control-Allow-Headers": "*"
            },
            "body": json.dumps(favorite_artists)
        }
    except:
        print("Something broken")
        traceback.print_exc(file=sys.stdout)
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": 'http://elitespotifystats.s3-website-us-west-1.amazonaws.com' ,
                "Access-Control-Allow-Headers": "*"
            },
            "body": "Ethan is trash and this is broken :( "
        }
    

    
def getFaves(duration, token):
    auth_string = 'Bearer ' + token
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth_string,
    }   
    params = ( ('time_range', duration),('limit','50'),)
    response = requests.get('https://api.spotify.com/v1/me/top/artists', headers=headers, params=params)
    
    return response.json()









