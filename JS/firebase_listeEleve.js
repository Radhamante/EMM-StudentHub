
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



//Prénom
let e_prenom = ""
firebase.firestore().collection('Personnes_connectés').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        // let console = doc.data();
        if(doc.data().autorisation == 3){
            e_prenom +=  `<p>${doc.data().Prenom}</p>`
        }
    })
    $('#name_usersID').append(e_prenom)
})

//Nom
let e_nom = ""
firebase.firestore().collection('Personnes_connectés').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
    if(doc.data().autorisation == 3){
    
        e_nom +=  `<p>${doc.data().Nom}</p>`
    }
        console.log(doc.data())
    })
    $('#lastname_usersID').append(e_nom)
})

//Classe
let e_classee = ""
firebase.firestore().collection('Personnes_connectés').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
    if(doc.data().autorisation == 3){
        e_classee +=  `<p>${doc.data().Classe}</p>`
    }
        console.log(doc.data())
    })
    $('#class_usersID').append(e_classee)
})

//Email
let e_email = ""
firebase.firestore().collection('Personnes_connectés').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
    if(doc.data().autorisation == 3){
        e_email +=  `<p>${doc.data().Email}</p>`
    }
        console.log(doc.data())
    })
    $('#email_usersID').append(e_email)
})
      
let all_user = document.getElementById('list_complet_user')
    //profil change
    all_user.addEventListener('click', e =>{     
      //Prénom
      let e_prenom = ""
      firebase.firestore().collection('Personnes_connectés').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            if(doc.data().autorisation == 3){
                e_prenom +=  `<p>${doc.data().Prenom}</p>`
            }
          })
          $('#name_usersID').append(e_prenom)
      })
      //Nom
      let e_nom = ""
      firebase.firestore().collection('Personnes_connectés').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            if(doc.data().autorisation == 3){
                e_nom +=  `<p>${doc.data().Nom}</p>`
            }

          })
          $('#lastname_usersID').append(e_nom)
      })
      //Classe
      let e_classee = ""
      firebase.firestore().collection('Personnes_connectés').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            if(doc.data().autorisation == 3){
                e_classee +=  `<p>${doc.data().Classe}</p>`
            }
          })
          $('#class_usersID').append(e_classee)
      })
      //Email
      let e_email = ""
      firebase.firestore().collection('Personnes_connectés').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            if(doc.data().autorisation == 3){
                e_email +=  `<p>${doc.data().Email}</p>`
            }
        })
        $('#email_usersID').append(e_email)
    })
})


let exo = ""
firebase.firestore().collection('name_class').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      exo+= `<button value="${doc.data().name}" class="hhey" id="${doc.data().name}">${doc.data().name}</button>`
    })
    $('#filter_class').append(exo)
    let tbl = document.getElementsByClassName('hhey');
    for(let j=0; j<tbl.length; j++){
        $('#filter_class').on('click','button', e =>{
        $("#lastname_usersID").html("")
        $("#class_usersID").html("")
        $("#email_usersID").html("")
        $("#tel_usersID").html("")
        $("#name_usersID").html("")
        if (e.target && e.target.id == tbl[j].value){
            let e_classe = "";
            let e_mail ="";
            let e_name = "";
            let e_lastname ="";
            firebase.firestore().collection('Personnes_connectés').get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    if(doc.data().Classe ==tbl[j].value ){
                        e_classe +=  `<p>${doc.data().Classe}</p>`
                        e_mail +=  `<p>${doc.data().Email}</p>`
                        e_name +=  `<p>${doc.data().Prenom}</p>`
                        e_lastname += `<p>${doc.data().Nom}</p>`
                    }
                })
                $('#class_usersID').append(e_classe)
                $('#email_usersID').append(e_mail)
                $('#name_usersID').append(e_name)
                $('#lastname_usersID').append(e_lastname)
                })
            }
        })
    }
})
