// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

document.addEventListener("DOMContentLoaded", () => {

  const modal = document.querySelector("#modal")
  const hearts = document.querySelectorAll("span.like-glyph")

  modal.hidden = true

  for (const heart of hearts) {
    heart.addEventListener("click", (event) => {
      // make a server call
      // promises have the `.then()` function
      // TWO of them that we use:
      // 1. is to take the response, jsonify it.
      // 2. take the jsonified response, do something with it
      mimicServerCall() // return a promise......this is a fake fetch so we can just go into our second `.then`
      .then(() => {
        // when successful, change the heart
        // if it's empty, make it full, add the `.activated-heart` class
        // else if it's full, make it empty, remove `.activated-heart` class
        if (heart.innerHTML == EMPTY_HEART){
          heart.innerHTML = FULL_HEART
          heart.className = "activated-heart"
        } else {
          heart.innerHTML = EMPTY_HEART
          heart.className = "like-glyph"
        }
      })
      .catch(error => {
        modal.hidden = false
        const modalMessage = document.querySelector("#modal-message")
        modalMessage.innerText = error
        setTimeout(() => {
          // do this during the timeout
          modal.hidden = true
        }, 5000) // times out after 5 seconds
      })
    })
  }


  // DOM Content Loaded
})


//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
