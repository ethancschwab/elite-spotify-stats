const Http = new XMLHttpRequest();
const api_url = 'https://1z3pmsgw4f.execute-api.us-west-1.amazonaws.com/default/helloworld';
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


function do_it_to_em(item, index){
	var item_split = item.split("between")
	var name = item_split[0].substr(2);
	if(name.length > 20){name = name.substr(0,35)}
	var artist = item_split[1].slice(0, -1);
	var link = item_split[2].slice(0,-1);
	var cover = item_split[3].slice(0,-1);
	var table = document.getElementById("selects")
	var row = table.insertRow()
	var insert_name = row.insertCell(0)
	var insert_artist = row.insertCell(1)
	var insert_cover = row.insertCell(2)
	insert_name.innerHTML = "<a href='" + link + "'> " + name + "</a>";
	insert_artist.innerHTML = artist
	insert_cover.innerHTML="<img src='" + cover + "'></img>";
}

Http.onreadystatechange=(e)=>{	
	if(Http.readyState == 4){
		console.log(Http.responseText)
		document.getElementById("split_output").innerHTML = "<table style='width:85%' id='selects' align='center'><tr><th>Name</th><th>Artist</th><th>Album</th></tr>"
		var output=Http.responseText.substr(0,(Http.responseText.length-1));
		var output_list = output.split(",");
		output_list.forEach(do_it_to_em);
		document.getElementById("split_output").innerHTML += "</table>"
	}
}



Http.onerror=(e)=>{
	console.log("Error!")
} 