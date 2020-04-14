


const request = new XMLHttpRequest();
const api_url='https://1z3pmsgw4f.execute-api.us-west-1.amazonaws.com/default/createPlaylist';


var duration = window.location.href.split("?")[1]
var token = document.cookie.split("=")[1]
var token_one="token=";
var token_final=token_one.concat(token,"&duration=",duration);

if (document.cookie.includes(duration)){
	if(confirm('You already created this playlist in this session. Create again?')) {
		console.log('Creating again')
		createPlaylist();
	} else {
  		window.location.href = "menu.html"
	}
} else{
	createPlaylist();
}



function createPlaylist(){

	document.cookie = duration+"=true"
	document.getElementById("image_section").innerHTML = "creating your playlist<br><br><br><img src='media/kirby.gif' width=\"300\"><br>"

	request.open("POST", api_url, true);

	request.send(token_final);

	var image_section = document.getElementById("image_section")



	request.onreadystatechange=(e)=>{
		if(request.readyState == 4){
			if(request.status == 500){
				document.getElementById("image_section").innerHTML = "your session has expired - please go <a href='home.html'>to the home page</a> and try logging in again"
			}else{
				console.log(request.responseText)
				response = request.responseText.substr(0,(request.responseText.length-1))
				var link = response.split("&&&")[0].substr(1)
				var image = response.split("&&&")[1]
				image_section.innerHTML = "your playlist is complete <br><br><a href='"+link+"'><img border=\"2\"src=" + image +">"

			}

		}
	}
}


