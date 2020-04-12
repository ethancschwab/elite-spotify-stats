import sys, requests, traceback, json

def lambda_handler(event, context):
	token = event['body'].split("&")[0].split("=")[1]
	duration = event['body'].split("&")[1].split("=")[1]
	user_id = get_user_id(token)['id']

	descriptions = {
		"short_term" : "most played tracks during the last four weeks",
		"medium_term" : "most played tracks during the last six months",
		"long_term" : "most played tracks all time"
	}
	names = {
		"short_term" : "bangers that have yet to stand the test of time",
		"medium_term" : "semiannual selects",
		"long_term" : "goat tracks"
	}
	description = descriptions[duration]
	name = names[duration]

	create_response = create_playlist(token,user_id,name,description)
	playlist_id = create_response['id']
	playlist_link = create_response['external_urls']['spotify']
	faves = get_faves(duration, token)

	uris='/tracks?uris='
	for key in faves['items']:
		uri=key['uri']
		uri=uri.replace(":","%3A")
		uris += uri + "%2C"

	# Remove last comma ;)
	uris=uris[:-3]

	response = add_to_playlist(playlist_id, uris, token)
	playlist_info = get_playlist_info(playlist_id, token)
	image_url=playlist_info['images'][1]['url']
	return {
        'statusCode': 200,
        "headers": {
            "Access-Control-Allow-Origin": 'http://elitespotifystats.s3-website-us-west-1.amazonaws.com' ,
            "Access-Control-Allow-Headers": "*"
        },
        'body': json.dumps(playlist_link+"&&&"+image_url)
    }


def get_user_id(token):
	auth_string = 'Bearer ' + token
	url = 'https://api.spotify.com/v1/me'
	headers = {
		'Accept': 'application/json',
		'Content-Type' : 'application/json',
		'Authorization' : auth_string,
	}
	response = requests.get(url, headers=headers)
	return response.json()


def create_playlist(token, user_id, name, description):

	auth_string = 'Bearer ' + token
	url = 'https://api.spotify.com/v1/users/'+user_id +'/playlists'
	headers = {
		'Accept': 'application/json',
		'Authorization' : auth_string,
		'Content-Type' : 'application/json',
	}

	body="{\"name\":\"" + name + "\", \"public\":false, \"description\": \"" + description + "\" }"

	response = requests.post(url, headers=headers, data=body)
	return response.json()

def get_faves(duration, token):
    auth_string = 'Bearer ' + token
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth_string,
    }   
    params = ( ('time_range', duration),('limit','50'),)
    response = requests.get('https://api.spotify.com/v1/me/top/tracks', headers=headers, params=params)
    
    return response.json()

def add_to_playlist(playlist_id, uris, token):
	auth_string = 'Bearer ' + token
	url = 'https://api.spotify.com/v1/playlists/'+playlist_id+uris
	headers = {
		'Authorization' : auth_string,
		'Content-Type': 'application/json',
	}
	response = requests.post(url,headers=headers)
	return response.json()

def get_playlist_info(playlist_id, token):
	auth_string = 'Bearer ' + token
	url = 'https://api.spotify.com/v1/playlists/'+playlist_id
	headers = {
		'Authorization' : auth_string,
	}
	response = requests.get(url, headers=headers)
	print(response.json())
	return response.json()

