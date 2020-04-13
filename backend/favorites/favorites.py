import sys, requests, traceback, json


def retrieve(event, handler):

    try:
        token = event['body'].split("&")[0].split("=")[1]
        duration=event['body'].split("&")[1].split("=")[1]
        
               
        selects = []
        faves = getFaves(duration, token)
        bangers = faves['items']
        for banger in bangers:
            str_select = banger['name'].replace(",","") + ' between ' + banger['artists'][0]['name'].replace(",","") + ' between ' + banger['external_urls']['spotify'] + ' between ' + banger['album']['images'][2]['url']
            selects.append(str_select)
        print(json.dumps(selects))



        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": 'http://elitespotifystats.s3-website-us-west-1.amazonaws.com' ,
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json"
            },
            "body": json.dumps(selects, ensure_ascii=False)
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









