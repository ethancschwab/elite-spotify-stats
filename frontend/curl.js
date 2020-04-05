const Http = new XMLHttpRequest();
const api_url = 'https://1z3pmsgw4f.execute-api.us-west-1.amazonaws.com/default/helloworld';
var duration = document.getElementById("request").getAttribute("duration")


Http.open("POST", api_url,true);


// Fetch access token from URL and duration from params
var current_url = window.location.href;
var token = current_url.split("=")[1].split("&")
var token_one="token="
var token_final=token_one.concat(token[0])
var period_one="&period="
var body_final=token_final.concat(period_one,duration)



// Send Request with Access Token and Duration
Http.send(body_final);


Http.onreadystatechange=(e)=>{	
	var output = document.getElementById(duration);
  	output.innerHTML = Http.responseText;
}

Http.onerror=(e)=>{
	console.log("Error!")
} 