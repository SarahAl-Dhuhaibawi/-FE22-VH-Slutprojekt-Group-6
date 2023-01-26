const closeMenuBtn = document.querySelector('.close-icon');
const openMenuBtn = document.querySelector('.open-icon');
const dropdownMenu = document.querySelector('.navbar-items');

const toggleBtn = document.querySelector('.toggle-icon');


toggleBtn.addEventListener('click', function () {
    console.log('hej');
    openMenuBtn.classList.toggle('show');
    closeMenuBtn.classList.toggle('show');

    dropdownMenu.classList.toggle('show');
})

var input = document.getElementById('input')

var customNodeCreator = function(character) {
  // Add character to input placeholder
  input.placeholder = input.placeholder + character;

  // Return null to skip internal adding of dom node
  return null;
}

var onRemoveNode = function({ character }) {
  if(input.placeholder) {
    // Remove last character from input placeholder
    input.placeholder = input.placeholder.slice(0, -1)
  }
}

var typewriter = new Typewriter(null, {
  delay: 45,
  onCreateTextNode: customNodeCreator,
  onRemoveNode: onRemoveNode,
});

typewriter
  .typeString("What's on your mind?")
  .start();

// Har ett max-input på message och räknar tecken
let messageInput = document.getElementById("input");
let counter = document.getElementById("counter");

counter.innerText = "Characters remaining: 100";

messageInput.addEventListener("input", function () {
    let messageLength = messageInput.value.length;

    counter.innerText = "Characters remaining: " + (100 - messageLength);

    if (messageLength > 100) {
        messageInput.value = messageInput.value.substring(0, 100);
        counter.innerText = "Characters remaining: 0";
    }
});
