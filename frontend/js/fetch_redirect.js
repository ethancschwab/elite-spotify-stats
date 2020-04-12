// Fetch access token from URL and store in cookie
document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
var current_url = window.location.href;
var token = current_url.split("=")[1].split("&");
var token_one="token=";
var token_final=token_one.concat(token[0]);

document.cookie=token_final;

window.location.href="menu.html"


