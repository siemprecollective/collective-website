firebase.initializeApp({
  apiKey: 'AIzaSyBgbzQkV_PsBGXlVKd58FUPEVUfJaQsacA',
  authDomain: 'siemprewebsite.firebaseapp.com',
  projectId: 'siemprewebsite'
});
  
var db = firebase.firestore();

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; domain=.siempre.io";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function makeId(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function initAnalytics() {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-162028230-2');
}

function htmlToElement(html) {
  var template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

if (!window.localStorage["id"]) {
  let newId = makeId(30);
  window.localStorage["id"] = newId;
  db.collection("votes").doc(newId).set({});
}

if (readCookie("disableAnalytics") !== "true") {
  initAnalytics();
}

/*
// for when we become more popular in the EU
if (window.localStorage["analytics"] === "true") {
  initAnalytics();
} else if (!window.localStorage["analytics"]) {
  let analyticsPrompt =
    "<div class='vertical-container cookie-container'>" +
      "<div style='margin-bottom: 10px;'>" +
        "We store cookies to help us analyze traffic on our site. " +
        "This helps us adjust our writing, services, and decision-making to match usage and interest." +
      "</div>" +
      "<div class='horizontal-container' style='justify-content: space-around'>" +
        "<div id='yes-consent' class='horizontal-container'>" +
          "<i class='fas fa-check' style='color: #01a200; font-size:20px; margin-right: 10px;'></i>" +
          "<div style='font-weight: bold'>I do consent</div>" +
        "</div>" +
        "<div id='no-consent' class='horizontal-container'>" +
          "<i class='fas fa-times' style='color: red; font-size:20px; margin-right: 10px;'></i>" +
          "<div style='font-weight: bold'>I do not consent</div>" +
        "</div>" +
        "<div style='font-weight: bold'><a href='/privacy'>Learn more</a></div>" +
      "</div>"
    "</div>";
  let analyticsEl = htmlToElement(analyticsPrompt);
  document.addEventListener("DOMContentLoaded", (e) => {
    if (window.location.pathname !== "/privacy") {
      document.body.appendChild(analyticsEl);
      document.getElementById("yes-consent").onclick = (e) => {
        document.body.removeChild(analyticsEl);
        window.localStorage["analytics"] = "true";
        initAnalytics();
      }
      document.getElementById("no-consent").onclick = (e) => {
        document.body.removeChild(analyticsEl);
        window.localStorage["analytics"] = "false";
      }
    }
  });
}
*/