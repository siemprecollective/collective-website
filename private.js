window.onload = (e) => {
  let disableButton = document.getElementById("disable-button");
  disableButton.onclick = (e) => {
    createCookie("disableAnalytics", "true", 3000);
    let parentEl = disableButton.parentNode;
    parentEl.removeChild(disableButton);
    parentEl.appendChild(htmlToElement("<div>Disabled!</div>"));
  }
}