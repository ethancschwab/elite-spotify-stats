// Disorganized and low quality script to populate page elements
var duration = window.location.href.split("?")[1]
var type = window.location.href.split("?")[0].split("/")[3]
var title1 = ""
var title2 = ""
var button_string = ""

var script = document.createElement("script");      
script.setAttribute("duration" , duration)
script.setAttribute("id", "request")



if (duration == "short_term"){
  title2 = "last four weeks"
}else if(duration == "medium_term"){
  title2 = "last six months"
}else if(duration == "long_term"){
  title2 = "all time"
}else {
  title2 = " invalid duration :( "
}

if(type == "top_songs.html"){
  title1 = " tracks "
  src = 'js/songs.js'
  var button = document.createElement("button")
  button.setAttribute("onclick", "window.location.href='create_playlist.html?short_term'")
  button_location = document.getElementById("playlist_button")
  button_string = "<button onclick=\"window.location.href='create_playlist.html?" + duration + "';\">click to generate playlist</button>"
  button_location.innerHTML = button_string
  document.head.appendChild(button);  
}else if(type == "top_artists.html"){
  title1 = " artists "
  src = 'js/artists.js'
}else{
  title1 = " Invalid Type :( "
}


script.src = src
document.head.appendChild(script);
var title_section= document.getElementById("title")
title_section.innerHTML = "<font size='6'> your most listened to " + title1 + title2 + "</font><br><br>"



