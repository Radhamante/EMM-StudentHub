
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

  //profil change

const envoye = document.getElementById('envoye')
const nom_input = document.getElementById('nom_input')
const prenom_input = document.getElementById('prenom_input')
const email_input = document.getElementById('email_input')
const tel_input = document.getElementById('tel_input')


envoye.addEventListener('click', e =>{  
  const nom = nom_input.value; 
  const prenom = prenom_input.value;
  const tel = tel_input.value;
  var user = firebase.auth().currentUser;
  console.log(nom+" "+prenom+" "+tel)
  return firebase.firestore().collection('Personnes_connectés').doc(user.uid).set({
    Nom: nom,
    Prenom: prenom,
    Telephone: tel
  },{ merge: true })
}) 