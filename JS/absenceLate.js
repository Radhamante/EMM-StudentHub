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
const absence = document.getElementById("absence")

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
    let niv = ""
    const latePrenom = document.getElementById("latePrenom")
    const lateNom = document.getElementById("lateNom")
    let error = true
    let id = ""
    if(latePrenom.value != "" && lateNom.value != ""){
        fb.collection('Personnes_connectés').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if (doc.data().Nom == lateNom.value && doc.data().Prenom == latePrenom.value) {
                    error = false
                    id = doc.id
                }
            })
            if (!error) {
                if(confirm("confirmer votre retard ?")){
                    fb.collection('Personnes_connectés').doc(id).update({retard:increment})
                    if(auth == 1){
                        fb.collection(classe).doc(queryString).update({"late.admin":firebase.firestore.FieldValue.arrayUnion(lateNom.value + " " + latePrenom.value)})
                    }else{
                        fb.collection(classe).doc(queryString).update({"late.prof":firebase.firestore.FieldValue.arrayUnion(lateNom.value + " " + latePrenom.value)})
                    }
                    alert("retard confirmeé")
                    popupLate.style.display = "none"
                    latePrenom.value = ""
                    lateNom.value = ""
                }
            }else{
                alert("Eleve inconnu")
            }
            
        })
    }else{
        latePrenom.placeholder = "Champ vide"
        lateNom.placeholder = "Champ vide"
    }
}
ProfAndAdminAbsence = () =>{

    const absencePrenom = document.getElementById("absencePrenom")
    const absenceNom = document.getElementById("absenceNom")
    let error = true
    let id =""
    if(absencePrenom.value != "" && absenceNom.value != ""){
        fb.collection('Personnes_connectés').onSnapshot(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if (doc.data().Nom == absenceNom.value && doc.data().Prenom == absencePrenom.value) {
                    error = false
                    id = doc.id
                }
            })
            if (!error) {
                if(confirm("confirmer votre absence ?")){
                    fb.collection('Personnes_connectés').doc(id).update({absence:increment})
                    if(auth == 1){
                        fb.collection(classe).doc(queryString).update({"late.admin":firebase.firestore.FieldValue.arrayRemove(absenceNom.value + " " + absencePrenom.value)})
                    }else{
                        fb.collection(classe).doc(queryString).update({"late.student":firebase.firestore.FieldValue.arrayRemove(absenceNom.value + " " + absencePrenom.value)})
                        fb.collection(classe).doc(queryString).update({"late.prof":firebase.firestore.FieldValue.arrayRemove(absenceNom.value + " " + absencePrenom.value)})
                        fb.collection(classe).doc(queryString).update({"late.admin":firebase.firestore.FieldValue.arrayRemove(absenceNom.value + " " + absencePrenom.value)})
                    }
                    fb.collection(classe).doc(queryString).update({"absence":firebase.firestore.FieldValue.arrayUnion(absenceNom.value + " " + absencePrenom.value)})
                    alert("retard confirmeé")
                    popupAbsence.style.display = "none"
                    absencePrenom.value = ""
                    absenceNom.value = ""
                }
            }else{
                alert("Eleve inconnu")
            }
            error = true
        })
    }else{
        absencePrenom.placeholder = "Champ vide"
        absenceNom.placeholder = "Champ vide"
    }
}


fb.collection(classe).doc(queryString).onSnapshot(doc=>{
    title.innerHTML = doc.data().title.split(":")[0].replace("professeur","")
    prof.innerHTML = doc.data().title.split(":")[1]
    hours.innerHTML = doc.data().start.split(" ")[1].split(":")[0] + ":" + doc.data().start.split(" ")[1].split(":")[1] + " - " + doc.data().end.split(" ")[1].split(":")[0] + ":" +doc.data().end.split(" ")[1].split(":")[1]

    let late = doc.data().late

    let liste = ""
    late.prof.forEach(elem => {
        liste += `<li>${elem}</li>`
    })
    lateProf.innerHTML = liste

    liste = ""
    late.admin.forEach(elem => {
        liste += `<li>${elem}</li>`
    })
    lateAdmin.innerHTML = liste

    liste = ""
    late.student.forEach(elem => {
        liste += `<li>${elem}</li>`
    })
    lateStudent.innerHTML = liste

    liste = ""
    doc.data().absence.forEach(elem => {
        liste += `<li>${elem}</li>`
    })
    absence.innerHTML = liste

    
})