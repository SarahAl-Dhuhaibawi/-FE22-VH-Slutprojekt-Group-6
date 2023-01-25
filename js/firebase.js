import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
import {
    getDatabase,
    ref,
    set,
    onValue,
    remove,
    push,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    databaseURL:
        "https://demo1-3c759-default-rtdb.europe-west1.firebasedatabase.app/", // <----
    apiKey: "AIzaSyDkRmoWLJ0eEXZKYEeUNwRF8V6X0oHwBi0",
    authDomain: "demo1-3c759.firebaseapp.com",
    projectId: "demo1-3c759",
    storageBucket: "demo1-3c759.appspot.com",
    messagingSenderId: "632318648569",
    appId: "1:632318648569:web:60f9813437fa829e598228",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getDatabase();
var urlRootRef = ref(db, "/");
const MAX_IMAGES = 13
let container = document.getElementsByClassName("comments-container")[0];

function createCard(user, text) {
    container.innerHTML += `
    <div class="card">
    <div class="card-img">
        <div class="user-bild" style="background-image: url('${arrayWithPicURL[Math.floor(Math.random() * MAX_IMAGES)]}');"></div>
    </div>
    <div class="comments-text">
        <h4>${user}</h4>
        <p>${text}</p>
    </div>
    </div>
`;
}

let arrayWithPicURL = [];
function getfiles() {
    for (let index = 1; index <= MAX_IMAGES; index++) {
        arrayWithPicURL.push("index.html/../images/profile/" + index.toString().padStart(3, "0") + ".png");
    }
    console.log(arrayWithPicURL);
}
getfiles();

/*var filename = url.substring(url.lastIndexOf('/')+1);
var urlTOProfiles= ("index.html/../images/profile");
-*/

//alert(filename);

onValue(urlRootRef, (snapshot) => {
    container.innerHTML = ""; // clear the container before looping and creating new cards
    snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        console.log(childKey);
        console.log(childData.message);
        createCard(childData.username, childData.message);
    });
});


let input = document.getElementById("input");

document.querySelector(".upload-bottom h2").addEventListener("click", (event) => {

    let adressRef = ref(db, "/");
    push(adressRef, {
        username: "username",
        dateOfCretion: new Date().toString("yyyy-MM-dd hh:mm:ss"),
        message: input.value,
        x: 0,
        y: 0,
    });

    input.value = "" //clear text input
});

