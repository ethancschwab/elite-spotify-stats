const request = new XMLHttpRequest();
const api_url='https://1z3pmsgw4f.execute-api.us-west-1.amazonaws.com/default/createPlaylist';


var duration = window.location.href.split("?")[1]
var token = document.cookie.split("=")[1]
var token_one="token=";
var token_final=token_one.concat(token,"&duration=",duration);

request.open("POST", api_url, true);

request.send(token_final);

var image_section = document.getElementById("image_section")

request.onreadystatechange=(e)=>{
	if(request.readyState == 4){
		console.log(request.responseText)
		response = request.responseText.substr(0,(request.responseText.length-1))
		var link = response.split("&&&")[0].substr(1)
		var image = response.split("&&&")[1]
		image_section.innerHTML = "click below for your new mix gang <br><br><a href='"+link+"'><img src=" + image +"><br><br><a href='" + link + "'>favorite trax</a>"

	}
}
