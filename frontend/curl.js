const Http = new XMLHttpRequest();
const api_url = 'https://1z3pmsgw4f.execute-api.us-west-1.amazonaws.com/default/helloworld';
Http.open("POST", api_url,true);


// Fetch Access Token from URL
var current_url = window.location.href;
var token = current_url.split("=")[1].split("&")
var token_one="token="
var token_final=token_one.concat(token[0])

// Send Request with Access Token
Http.send(token_final);


Http.onreadystatechange=(e)=>{
	console.log(Http.responseText)
	var output = document.getElementById('output');
  	output.innerHTML = Http.responseText;
}

Http.onerror=(e)=>{
	console.log("Error!")
} 