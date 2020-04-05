const Http = new XMLHttpRequest();
const api_url = 'https://1z3pmsgw4f.execute-api.us-west-1.amazonaws.com/default/helloworld';
var duration = document.getElementById("request").getAttribute("duration")


Http.open("POST", api_url,true);


// Fetch access token from URL and duration from params
var current_url = window.location.href;
var token = current_url.split("=")[1].split("&");
var token_one="token=";
var token_final=token_one.concat(token[0]);
var period_one="&period=";
var body_final=token_final.concat(period_one,duration);


// Send Request with Access Token and Duration
Http.send(body_final);


Http.onreadystatechange=(e)=>{	
	var output_list = Http.responseText.split(",");
	output_list.forEach(element => console.log(element));
	output_list.forEach(do_it_to_em);
	// document.getElementById("selects").deleteRow(1);
	document.getElementById("split_output").innerHTML += "</table>"
}

function do_it_to_em(item, index){
	console.log(item)
	var name = item.split("between")[0].substr(2);
	var artist = item.split("between")[1].slice(0, -1);
	var table = document.getElementById("selects")
	var row = table.insertRow()
	var insert_name = row.insertCell(0)
	var insert_artist = row.insertCell(1)
	insert_name.innerHTML = name
	insert_artist.innerHTML = artist
}

Http.onerror=(e)=>{
	console.log("Error!")
} 