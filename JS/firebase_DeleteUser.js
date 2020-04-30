
// Your web app's Firebase configuration
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
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Add class
const class_button = document.getElementById('add_class_button')
const supp_button = document.getElementById('supp_class_button')
const name_new_class = document.getElementById('nouvelle_classe_name')

const fb = firebase.firestore();

class_button.addEventListener('click', e =>{
  let new_class =  name_new_class.value;
    firebase.firestore().collection("name_class").doc(new_class).set({
      name: new_class
    })
})

//Delete class
let exo = ""
firebase.firestore().collection('Personnes_connectés').get().then(function (querySnapshot) {
    let tbl=[];
    querySnapshot.forEach(function (doc) {
        tbl.push(doc.id)
      exo+= `
      <option value="${doc.id}" class="${doc.data().Email}">${doc.data().Email}</option>`
    })
    $('#hello').append(exo)
})
let choix_class = document.getElementById('hello');
supp_button.addEventListener('click', e =>{
    let idUser = choix_class.value
    firebase.firestore().collection("people_delete").doc(idUser).set({
        id: idUser
    })
    firebase.firestore().collection("Personnes_connectés").doc(idUser).delete().then(function() {
      alert("Vous avez bien supprimez l'utilisateur ");
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
  });
  

})

        
