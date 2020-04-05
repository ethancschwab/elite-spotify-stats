import sys, requests, traceback, json


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
            print(banger)
            selects.append(banger['name'] + ' between ' + banger['artists'][0]['name'])
        print(selects)



        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": 'http://elitespotifystats.s3-website-us-west-1.amazonaws.com' ,
                "Access-Control-Allow-Headers": "*"
            },
            "body": json.dumps(selects)
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
    response = requests.get('https://api.spotify.com/v1/me/top/tracks', headers=headers, params=params)
    
    return response.json()









