
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
    if (confirm("Etes vous sur de vouloir supprimer votre compte ?")) {
        user.delete().then(function(){
            document.location.pathname='index.html'
        }).catch(function(error){
            console.log("erreur de suppression")
        })
    }
})

//deconnexion
const deconnexion = document.getElementById('deco')

deconnexion.addEventListener('click', e =>{
    if (confirm("Déconnecter ?")) {
        firebase.auth().signOut();
        document.location.pathname='index.html'
    }
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
const lateAbs = document.getElementById('lateAbs')
const pp = document.getElementById('photo_prof')



const fb = firebase.firestore();

window.onload = () => {
    setTimeout(() => {
        fb.collection('Personnes_connectés').doc(firebase.auth().currentUser.uid).onSnapshot(doc => {
            if (doc.data().pp != undefined && doc.data().pp != "") {
                pp.src = doc.data().pp
            }
            nom.innerHTML = doc.data().Nom
            prenom.innerHTML = doc.data().Prenom
            email.innerHTML = doc.data().Email
            tel.innerHTML = doc.data().Telephone
            if(doc.data().autorisation == 3){
                lateAbs.innerHTML = `<h3>Nombre de retards</h3>
                <p>${doc.data().retard}</p>
                <h3>Nombre d'absences</h3>
                <p>${doc.data().absence}</p>`
            }
            if (doc.data().autorisation == 3) {
                document.getElementById("return").href = "studentHub.html"
            }
            else if (doc.data().autorisation == 2) {
                document.getElementById("return").href = "profHub.html"
            }
            else{
                document.getElementById("return").href = "adminHub.html"
            }
        })
    },900)
}


const fileButton = document.getElementById('fileButton');

//Listen for file selection

fileButton.addEventListener('change', function(e){
    //get file
    var file = e.target.files[0]

    //create storage ref
    var storageRef = firebase.storage().ref("IdPicures/" + file.name)

    //upload file
     var task = storageRef.put(file);
    console.log("hello")
    task.on('state_changed',
        function progress (snapshot){
        },
        function error(err){
            console.log(err)
        },
        function complete (){
            task.snapshot.ref.getDownloadURL().then(url => {
                fb.collection('Personnes_connectés').doc(firebase.auth().currentUser.uid).update({"pp": url})
            })
        }
    );

});