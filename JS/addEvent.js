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
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);



const spanColor = document.getElementsByClassName("selectColor")[0]

/* style */

const inputs = document.querySelectorAll("input");

function blur(){
    if(this.value != ""){
        this.style.borderBottom = "2px solid #2fd69a"
    }else{
        this.style.borderBottom = "2px solid #999"
    }
}

inputs.forEach(input => {
    input.addEventListener("blur", blur);
});


changeColor = () =>{
    const color = document.getElementById("color")
    spanColor.style.backgroundColor = color.value
}

/* firebase */

const fb = firebase.firestore();
const classe = document.getElementById("classe")

fb.collection("name_class").onSnapshot(querySnapshot => {
    let liste
    querySnapshot.forEach(doc => {
        liste += `<option value="${doc.data().name}">${doc.data().name}</option>`
    })
    classe.innerHTML = liste
})


valider = () =>{
    let error = false
    const titre = document.getElementById("titre")
    const prof = document.getElementById("prof")
    const jour = document.getElementById("jour")
    const debut = document.getElementById("debut")
    const fin = document.getElementById("fin")
    const color = document.getElementById("color")

    if (titre.value == "") {
        error = true
        titre.style.borderBottom = "2px solid rgb(255, 99, 71) "
    }
    if (prof.value == "") {
        error = true
        prof.style.borderBottom = "2px solid rgb(255, 99, 71) "
    }
    if (jour.value == "") {
        error = true
        jour.style.borderBottom = "2px solid rgb(255, 99, 71) "
    }
    if (debut.value == "") {
        error = true
        debut.style.borderBottom = "2px solid rgb(255, 99, 71) "
    }
    if (fin.value == "") {
        error = true
        fin.style.borderBottom = "2px solid rgb(255, 99, 71) "
    }

    if (!error) {
        fb.collection(classe.value).add({
            title: `${titre.value} \n professeur : \n ${prof.value}`,
            start: `${jour.value} ${debut.value}:00`,
            end: `${jour.value} ${fin.value}:00`,
            backgroundColor: color.value,
            borderColor: "#999",
            late:{student:[],admin:[],prof:[]},
            absence:[]
        })
        .then(function(docRef) {
            fb.collection(classe.value).doc(docRef.id).update({id:docRef.id})
            alert("La classe a été crée")
            titre.value = ""
            prof.value = ""
            jour.value = ""
            debut.value = ""
            fin.value = ""
            color.value = "#2fd69a"
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
}
let user = null

