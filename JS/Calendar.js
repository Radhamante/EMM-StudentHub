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

let calendarEl = document.getElementById('calendar');
let event = []
const fb = firebase.firestore();

const header = document.getElementsByTagName("header")[0]



window.onload = () => {

    fb.collection("name_class").get().then(querySnapshot => {
        fb.collection('Personnes_connectés').doc(firebase.auth().currentUser.uid).get().then((e) => {
        auth = e.data().autorisation
        if (auth == 1 ) {
            let liste = ""
            querySnapshot.forEach(doc => {
                liste += `<option value="${doc.data().name}">${doc.data().name}</option>`
            })
            header.innerHTML += `<select name="calendar" onchange="creatCalendar()" id="calendarPicker">
            <option value="" disabled selected>Choisir une classe</option>
            ${liste}
            </select>`
            document.querySelector("header").innerHTML += `<a href="addEvent.html"><i class="far fa-calendar-plus"></i></a>`
            document.getElementById("return").href = "adminHub.html"
        }
        else if (auth == 2) {
            let liste = ""
            querySnapshot.forEach(doc => {
                liste += `<option value="${doc.data().name}">${doc.data().name}</option>`
            })
            header.innerHTML += `<select name="calendar" onchange="creatCalendar()" id="calendarPicker">
            <option value="" disabled selected>Choisir une classe</option>
            ${liste}
            </select>`
            document.getElementById("return").href = "profHub.html"
        }
        else if (auth == 3) {
            document.getElementById("return").href = "studentHub.html"
            creatCalendar(e.data().Classe)
        }
            
        })

    })
};

creatCalendar = (classe) =>{
    let calendarPicker = undefined
    if (classe == undefined) {
        calendarPicker = document.getElementById("calendarPicker").value
    }else{
        calendarPicker = classe
    }
    document.getElementById("BaseBackground").style.display = "none"
    calendarEl.style.display = "block"
    let calendar
    fb.collection(calendarPicker).onSnapshot(function(querySnapshot) {
        calendarEl.innerHTML = ""
        event = []
        
        querySnapshot.forEach(function(doc) {
            event.push(doc.data())
        })
        calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: [ 'dayGrid','timeGrid' ],
            defaultView: 'timeGridWeek',
            locale:'fr',
            allDaySlot : false,
            height: 585,
            startTime:9,
            minTime: '8:00',
            maxTime: '18:00',
            
            header:{
                left:'prev,next today',
                center:'title',
                right:'dayGridMonth,timeGridWeek,timeGridDay'
            },
            buttonText:{
                today:"Aujourd'hui",
                month:"Mois",
                week:"Semaine"
            },
            nowIndicator:true,
            businessHours: {
              startTime: '9:00', 
              endTime: '17:00',
            },
            events: event,
            eventClick: function(info) {
                window.location.href = window.location.origin + "/absenceLate.html?" + info.event.id + "?" + calendarPicker
            }
        });
        
        calendar.render();
    
    })
}