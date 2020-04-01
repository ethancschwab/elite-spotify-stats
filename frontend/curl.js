const Http = new XMLHttpRequest();
const url = 'https://1z3pmsgw4f.execute-api.us-west-1.amazonaws.com/default/helloworld';
Http.open("POST", url,true);
//Http.setRequestHeader("Content-Type", "application/json");
//Http.setRequestHeader("token", "BQCs9fnv7F-a5OVE1zlkqNbSTQSc2tEXS4FBaVUjGFFNtEuRf0E-l1IWVOVyfUb3k3l9c5jYjm1tV_GUfSuisXlrfHtxisOvKGErMVTRlnxSPGX-Fq029mCqeRB_hhzwUEjXc6GLrmZyskKtTTt5peW7Ig");

//Http.setRequestHeader("Access-Control-Allow-Origin", '*') 
// Http.setRequestHeader("Access-Control-Allow-Headers", "*")

Http.send("token=BQDRNnSjW4ruH9PsD3U5r919UxXzDfZXhLhqnMdmjGLukLNAlNTJhHvQ_oP5xHQ5Uyk9uCiJZ1R3zM6rXzE5JvN90-HBhcQpnty8H8CBvOC_ouJjXaPkA3HTqgu4jQzVhoDjWmUVv5dMew8Ql3-9wHm2QQ");
console.log(Http);
document.cookie = "test_cookie=sup";
console.log(document.cookie);

Http.onreadystatechange=(e)=>{
	document.body.innerHTML = Http.responseText
}

// Http.onload=(e)=>{
// 	console.log(Http.responseText)
// }

Http.onerror=(e)=>{
	console.log("Error!")
} 