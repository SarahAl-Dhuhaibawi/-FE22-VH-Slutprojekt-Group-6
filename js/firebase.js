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
    if (document.querySelector('.card')) {
        document.querySelectorAll('.card').forEach((el) => {
            el.classList.remove('showAnimation');
        })
    }
    container.innerHTML += `
    <div class="card showAnimation" style="margin: 0rem ${Math.floor(Math.random() * 2.5)}rem">
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
        username: "Anonymous",
        dateOfCretion: new Date().toString("yyyy-MM-dd hh:mm:ss"),
        message: input.value,
        x: 0,
        y: 0,
    });

    input.value = "" //clear text input
});

//Search functions, display in a container and show the total hits of matching word
onValue(urlRootRef, (snapshot) => {
    const searchInput = document.querySelector('#search-input');
    const searchBtn = document.querySelector('#search-btn');
    const searchErrorText = document.querySelector('.search-error-text');
    const searchResultsContainer = document.querySelector('#search-results-container');
    const searchResultCount = document.querySelector('#search-result-count');

    searchBtn.addEventListener('click', searchMessages);

    function searchMessages() {
        const searchQuery = searchInput.value.toLowerCase();
        if (searchInput.value <= 0) {
            searchResultsContainer.innerHTML = '';
            searchResultCount.innerText = ``;
            searchErrorText.innerText = 'No inputs';
        }
        else {
            const filteredMessages = [];
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.val().message.toLowerCase().includes(searchQuery.toLowerCase()))
                    filteredMessages.push(childSnapshot);
            });

            searchResultsContainer.innerHTML = '';

            //Here add class or id to style the messages
            filteredMessages.forEach(function (childSnapshot) {
                const childData = childSnapshot.val();
                const messageDiv = document.createElement('div');
                messageDiv.innerText = childData.username + ": " + childData.message;
                messageDiv.style.backgroundColor = childData.color;
                messageDiv.classList.add("messageCard");
                searchResultsContainer.appendChild(messageDiv);
            });

            searchResultCount.innerText = `${filteredMessages.length} matching results`;
            searchInput.value = '';
            searchErrorText.innerText = '';
        }
    }
});

document.getElementById("delete-btn").addEventListener(
    "click", (event) => {
        remove(ref(db, '/')).then(() => {

        })

    });