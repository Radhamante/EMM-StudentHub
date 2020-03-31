
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

//supprimer un compte 
const supprimer_le_compte = document.getElementById('supp')

supprimer_le_compte.addEventListener('click', e =>{

  var user = firebase.auth().currentUser;

  // fonction delete
  user.delete().then(function(){
      document.location.pathname='index.html'
  }).catch(function(error){
    console.log("erreur de suppression")
  })
})

//deconnexion
const deconnexion = document.getElementById('deco')

deconnexion.addEventListener('click', e =>{
    firebase.auth().signOut();
    document.location.pathname='index.html'
})

firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser){
      console.log(firebaseUser)
      console.log("PLUS CO")
      deconnexion.classList.remove('hide')

    }else{
      console.log('not logged in')
      deconnexion.classList.add('hide')
    }
  })

//Add class
const class_button = document.getElementById('add_class_button')
const supp_button = document.getElementById('supp_class_button')
const name_new_class = document.getElementById('nouvelle_classe_name')

const fb = firebase.firestore();

class_button.addEventListener('click', e =>{
  let new_class =  name_new_class.value;
    console.log(new_class)
    firebase.firestore().collection("name_class").doc(new_class).set({
      name: new_class
    })
})

//Delete class
let exo = ""
firebase.firestore().collection('name_class').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      console.log(doc.data().name)
      exo+= `
      <option value="${doc.data().name}">${doc.data().name}</option>`
    })
    $('#hello').append(exo)
})

let choix_class = document.getElementById('hello');

supp_button.addEventListener('click', e =>{
    firebase.firestore().collection("name_class").doc(choix_class.value).delete().then(function() {
      alert("Vous avez bien supprimez la classe: "+choix_class.value);
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  

})