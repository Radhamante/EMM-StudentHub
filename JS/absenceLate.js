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

const fb = firebase.firestore();
const increment = firebase.firestore.FieldValue.increment(1);

let queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1)
const classe = queryString.split("?")[1]
queryString = queryString.split("?")[0]


const title = document.getElementsByTagName("h1")[0]
const prof = document.getElementsByTagName("h3")[2]
const hours = document.getElementsByTagName("p")[0]

const lateAdmin = document.getElementById("lateAdmin")
const lateProf = document.getElementById("lateProf")
const lateStudent = document.getElementById("lateStudent")
const absenceList = document.getElementById("absenceList")

const absence = document.getElementById("absence")
const late = document.getElementById("late")

const popupLate = document.getElementById("popupLate")
const popupAbsence = document.getElementById("popupAbsence")

let auth 


setLate = () =>{
    fb.collection('Personnes_connectés').doc(firebase.auth().currentUser.uid).get().then((e) => {
        auth = e.data().autorisation
        if (auth == 2 || auth == 1) {
            popupLate.style.display = "flex"
        }
        else if (auth == 3) {
            if(confirm("confirmer votre retard ?")){
                fb.collection('Personnes_connectés').doc(firebase.auth().currentUser.uid).update({retard:increment})
                fb.collection(classe).doc(queryString).update({"late.student":firebase.firestore.FieldValue.arrayUnion(e.data().Nom + e.data().Prenom)})
                alert("retard confirmeé")
            }
        }
    })
} 

setAbsence = () =>{
    fb.collection('Personnes_connectés').doc(firebase.auth().currentUser.uid).get().then((e) => {
        auth = e.data().autorisation
        if (auth == 2 || auth == 1) {
            popupAbsence.style.display = "flex"
        }
        else if (auth == 3) {
            if(confirm("confirmer votre retard ?")){
                fb.collection('Personnes_connectés').doc(firebase.auth().currentUser.uid).update({absence:increment})
                fb.collection(classe).doc(queryString).update({"late.student":firebase.firestore.FieldValue.arrayRemove(e.data().Nom + " " + e.data().Prenom)})
                fb.collection(classe).doc(queryString).update({"absence":firebase.firestore.FieldValue.arrayUnion(e.data().Nom + " " + e.data().Prenom)})
                alert("retard confirmeé")
            }
        }
    })
} 

ProfAndAdminLate = () =>{
    let id = late.value.split("/")[0]
    if(confirm("confirmer l'retard ?")){
        fb.collection('Personnes_connectés').doc(id).update({retard:increment})
        if(auth == 1){
            fb.collection(classe).doc(queryString).update({"late.admin":firebase.firestore.FieldValue.arrayUnion(late.value.split("/")[1])})
        }else{
            fb.collection(classe).doc(queryString).update({"late.prof":firebase.firestore.FieldValue.arrayUnion(late.value.split("/")[1])})
        }
        alert("retard confirmeé")
        popupLate.style.display = "none"
    }
}

ProfAndAdminAbsence = () =>{

    const absence = document.getElementById("absence")
    let id = late.value.split("/")[0]
    if(confirm("confirmer l'absence ?")){
        fb.collection('personnes_connectés').get().then(querySnapshot => {
            querySnapshot.forEach
        })
        fb.collection('Personnes_connectés').doc(id).update({absence:increment})
        if(auth == 1){
            fb.collection(classe).doc(queryString).update({"late.admin":firebase.firestore.FieldValue.arrayRemove(absence.value.split("/")[1])})
        }else{
            fb.collection(classe).doc(queryString).update({"late.student":firebase.firestore.FieldValue.arrayRemove(absence.value.split("/")[1])})
            fb.collection(classe).doc(queryString).update({"late.prof":firebase.firestore.FieldValue.arrayRemove(absence.value.split("/")[1])})
            fb.collection(classe).doc(queryString).update({"late.admin":firebase.firestore.FieldValue.arrayRemove(absence.value.split("/")[1])})
        }
        fb.collection(classe).doc(queryString).update({"absence":firebase.firestore.FieldValue.arrayUnion(absence.value.split("/")[1])})
        alert("retard confirmeé")
        popupAbsence.style.display = "none"
    }
}


fb.collection(classe).doc(queryString).onSnapshot(doc=>{
    title.innerHTML = doc.data().title.split(":")[0].replace("professeur","")
    prof.innerHTML = doc.data().title.split(":")[1]
    hours.innerHTML = doc.data().start.split(" ")[1].split(":")[0] + ":" + doc.data().start.split(" ")[1].split(":")[1] + " - " + doc.data().end.split(" ")[1].split(":")[0] + ":" +doc.data().end.split(" ")[1].split(":")[1]

    let getLate = doc.data().late

    let liste = ""
    getLate.prof.forEach(elem => {
        liste += `<li>${elem}</li>`
    })
    lateProf.innerHTML = liste

    liste = ""
    getLate.admin.forEach(elem => {
        liste += `<li>${elem}</li>`
    })
    lateAdmin.innerHTML = liste

    liste = ""
    getLate.student.forEach(elem => {
        liste += `<li>${elem}</li>`
    })
    lateStudent.innerHTML = liste

    liste = ""
    doc.data().absence.forEach(elem => {
        liste += `<li>${elem}</li>`
    })
    absenceList.innerHTML = liste

})

fb.collection("Personnes_connectés").get().then(querySnapshot => {
    let liste = ""
    querySnapshot.forEach(doc => {
        if (doc.data().Classe == classe){
            liste += `<option value="${doc.id}/${doc.data().Nom} ${doc.data().Prenom}"> ${doc.data().Nom} ${doc.data().Prenom} </option>`
        }
    })
    late.innerHTML += liste
    absence.innerHTML += liste
})