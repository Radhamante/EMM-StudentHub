
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
    const user = firebase.auth().currentUser
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
      deconnexion.classList.remove('hide')

    }else{
      console.log('not logged in')
      deconnexion.classList.add('hide')
    }
  })

//profil change



const nom = document.getElementById('nom')
const prenom = document.getElementById('prenom')
const email = document.getElementById('email')
const tel = document.getElementById('tel')


const fb = firebase.firestore();

window.onload = () => {
    setTimeout(() => {
        fb.collection('Personnes_connectés').doc(firebase.auth().currentUser.uid).get().then(doc => {
            nom.innerHTML = doc.data().Nom
            prenom.innerHTML = doc.data().Prenom
            email.innerHTML = doc.data().Email
            telephone.innerHTML = doc.data().Telephone
        })
    },700)
}
