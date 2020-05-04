window.onload = (e) => {
  Object.keys(window.localStorage).forEach(key => {
    console.log(key, window.localStorage[key]);
    if (key !== "id") {
      let el = document.getElementById(key);
      if (el && window.localStorage[key] === "true") {
        el.classList.add("selected");
      }
    }
  });
}

function onSubmitEmail() {
  console.log("here");
  let emailSubmit = document.getElementById("emailSubmit");
  let emailInput = emailSubmit.getElementsByTagName("input")[0];
  db.collection("subscribers").doc(window.localStorage["id"]).set({
    "email": emailInput.value,
    "time": firebase.firestore.Timestamp.fromDate(new Date()),
    "id": window.localStorage["id"]
  });

  emailSubmit.innerHTML = "<div>Subscribed!</div>"
}

function onClickVote(id) {
  let voteEl = document.getElementById(id);
  console.log("onclick", voteEl, window.localStorage[id]);
  if (voteEl) {
    if (window.localStorage[id] === "true") {
      voteEl.classList.remove("selected");
      window.localStorage[id] = "false";
      db.collection("votes").doc(window.localStorage["id"]).update({[id]: false});
    } else {
      voteEl.classList.add("selected");
      window.localStorage[id] = "true";
      db.collection("votes").doc(window.localStorage["id"]).update({[id]: true});
    }
  }
}