const Http = new XMLHttpRequest();
const api_url = 'https://1z3pmsgw4f.execute-api.us-west-1.amazonaws.com/default/topartists';
var duration = document.getElementById("request").getAttribute("duration")


Http.open("POST", api_url,true);

// Fetch access token from cookie and duration from params
var token = document.cookie.split("=")[1]
var token_one="token=";
var token_final=token_one.concat(token);
var period_one="&period=";
var body_final=token_final.concat(period_one,duration);
var count=0;

// Send Request with Access Token and Duration
Http.send(body_final);




Http.onreadystatechange=(e)=>{	
	if(Http.readyState == 4){
		if (Http.status == 500){
			document.getElementById("split_output").innerHTML = "Your session may have expired - please go <a href='home.html'> to the home page </a> and try logging in again"
		} else {
			document.getElementById("split_output").innerHTML = "<div class=\"row\">"
			var output = Http.responseText.substr(0,(Http.responseText.length-1))
			output_list = output.split(",")
			output_list.forEach(do_it_to_em)
			document.getElementById("split_output").innerHTML += "</div>"
		}
	}
}

function do_it_to_em(item, index){
	if(count == 0){
		document.getElementById("split_output").innerHTML += "<div class=\"column\">"
	}
	var name = item.split("&&&")[0].substr(2)
	var img = item.split("&&&")[1]
	var link = item.split("&&&")[2]
	document.getElementById("split_output").innerHTML += "<a href=\"" + link + "\"><img width=\"200\" src=\"" + img + "\"></a>" + name 
	count += 1
	if(count == 3){
		document.getElementById("split_output").innerHTML += "</div>"
		count = 0
	}
}



Http.onerror=(e)=>{
	console.log("Error!")
} 