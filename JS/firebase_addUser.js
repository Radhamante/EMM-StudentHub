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
var messagesRef = firebase.database().ref('messages');

const txtEmail = document.getElementById('username')
const txtPassword = document.getElementById('pass1')
const txtPassword2 = document.getElementById('pass2')
const btn_SignUp = document.getElementById('sign_up')
const name = document.getElementById('name')
const lastname = document.getElementById('lastname')
let exo = ""
firebase.firestore().collection('name_class').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      console.log(doc.data().name)
      exo+= `
      <option value="${doc.data().name}">${doc.data().name}</option>`
    })
    $('#class_choice').append(exo)
})

btn_SignUp.addEventListener('click', e =>{
if(txtPassword.value == txtPassword2.value) {
    var value_btn_radio = $("input[name='role']:checked").val();
    let choix_class = document.getElementById('class_choice');
        if (name.value!="" || lastname.value!="") {
            if(value_btn_radio == 3){
                console.log(choix_class.value)
                if (choix_class.value != "") {
                    firebase.auth().createUserWithEmailAndPassword(txtEmail.value,txtPassword.value).then(cred =>{
                        alert("Le compte "+txtEmail.value+" à bien été créé")
                        firebase.firestore().collection('Personnes_connectés').doc(cred.user.uid).set({
                            autorisation: parseInt(value_btn_radio),
                            Email: txtEmail.value,
                            Classe: choix_class.value,
                            Prenom: name.value,
                            Nom: lastname.value,
                            absence: 0,
                            late: 0,
                        })
                    });
                }
                else{
                    alert("veuillez choisir une classe")
                }
            }
            else{
                firebase.auth().createUserWithEmailAndPassword(txtEmail.value,txtPassword.value).then(cred =>{
                    alert("Le compte "+txtEmail.value+" à bien été créé")
                });
                firebase.firestore().collection('Personnes_connectés').doc(cred.user.uid).set({
                    autorisation: parseInt(value_btn_radio),
                    Email: txtEmail.value,
                    Prenom: name.value,
                    Nom: lastname.value
                })
            }
        }else{
            alert("veuillez remplir le nom et le prénon")
        }
    }
    else {
        console.log($("input[name='role']:checked").val())
        alert("les mdp ne sont pas pareils")
  }
})




