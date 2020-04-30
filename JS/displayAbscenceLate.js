const firebaseConfig = {
    apiKey: "AIzaSyB0nAFCjtW-dc5h8iCyRZgtmcEjjUTJ-QM",
    authDomain: "projestage-eb43e.firebaseapp.com",
    databaseURL: "https://projestage-eb43e.firebaseio.com",
    projectId: "projestage-eb43e",
    storageBucket: "projestage-eb43e.appspot.com",
    messagingSenderId: "326415405931",
    appId: "1:326415405931:web:68ce4d45c0e5cd941d722e",
    measurementId: "G-11M751R6E0"
  };
firebase.initializeApp(firebaseConfig);

const fb = firebase.firestore();



fb.collection("Personnes_connectés").get().then(querySnapshot => {
    let list = ""
    querySnapshot.forEach(doc => {
        if(doc.data().autorisation == 3){
            list += `<div class="onePersonne"><p>${doc.data().Nom} ${doc.data().Prenom}</p><p>${doc.data().retard}</p><p>${doc.data().absence}</p></div>`
        }
    });
    document.getElementById("display").innerHTML += list
    fb.collection('Personnes_connectés').doc(firebase.auth().currentUser.uid).get().then(doc => {
        if (doc.data().autorisation == 1) {
            document.getElementById("return").href = "adminHub.html"
        }else{
            document.getElementById("return").href = "profHub.html"
        }
    })
})
