var firebaseConfig = {
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

const fd = firebase.database();
const fb = firebase.firestore();

const header = document.getElementsByTagName("header")[0]

const chat = document.getElementById("chat")
let currentClasse = ""
let pseudo = ""

setTimeout(() => {
    fb.collection('Personnes_connectés').doc(firebase.auth().currentUser.uid).get().then((e) => {
        pseudo = e.data().Nom + " " + e.data().Prenom
        if (e.data().autorisation == 3){
            currentClasse = e.data().Classe
            creatChat(currentClasse)
            document.getElementById("return").href = "studentHub.html"
        }else{
            fb.collection("name_class").get().then(querySnapshot => {
                let liste = ""
                querySnapshot.forEach(doc => {
                    liste += `<option value="${doc.data().name}">${doc.data().name}</option>`
                });
                header.innerHTML += `<select name="chat" onchange="creatChat()" id="classePicker">
                <option value="" disabled selected>Choisir une classe</option>
                ${liste}
                </select>`
            })
            document.getElementById("return").href = "profHub.html"
        }
    })
},1000)

addMessage = (classe) => {
    if (classe == undefined) {
        classePicker = currentClasse
    }else{
        classePicker = classe
    }
    const mess = document.getElementById("addMessage").value
    fd.ref(classePicker).push({pseudo,mess})
    document.getElementById("addMessage").value = ""
}

let style = ""

creatChat = (classe) => {
    chat.innerHTML = ""
    let classePicker = undefined
    if (classe == undefined) {
        classePicker = document.getElementById("classePicker").value
    }else{
        classePicker = classe
    }
    fd.ref(classePicker).on('child_added', function(snapshot) {
        snapshot = snapshot.toJSON()
        if(snapshot.pseudo == pseudo){
            style = "me"
        }else{
            style = ""
        }
        chat.innerHTML += `<div class="${style}">
        <h6>${snapshot.pseudo}</h6>
        <p>${snapshot.mess}</p>
        </div>`
        chat.scrollTop = chat.scrollHeight;
    })
}

document.addEventListener("keyup", (e) => {
    if (event.keyCode === 13) {
        addMessage()
    }
})