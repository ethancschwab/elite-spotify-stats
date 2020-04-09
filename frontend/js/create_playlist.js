const request = new XMLHttpRequest();
const api_url='https://1z3pmsgw4f.execute-api.us-west-1.amazonaws.com/default/createplaylist';


var duration = window.location.href.split("?")[1]
var token = document.cookie.split("=")[1]
var token_one="token=";
var token_final=token_one.concat(token,"&duration=",duration);

request.open("POST", api_url, true);

request.send(token_final);

var image_section = document.getElementById("image_section")

request.onreadystatechange=(e)=>{
	if(request.readyState == 4){
		response = request.responseText.substr(0,(request.responseText.length-1))
		var link = response.split("&&&")[0].substring(1)
		var image = response.split("&&&")[1]
		console.log("link to list " + link)
		console.log("link to image " + image)
		image_section.innerHTML = "click the image below for your new mix :) <br><br><a href='"+link+"'><img src=" + image +"><br><br>"
	}
}
