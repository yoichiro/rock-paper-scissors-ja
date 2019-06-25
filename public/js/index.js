'use strict';

// TODO: Write your code here.

assistantCanvas.ready({
  onUpdate(state) {
    // Display the versus image.
    if (state.scene === 'result') {
      document.querySelector('#welcome').style.display = 'none';
      document.querySelector('#vs').style.display = 'block';
      document.querySelector('#user-choice').src = `images/${state.userChoice}.png`;
      document.querySelector('#action-choice').src = `images/${state.actionChoice}.png`;
      document.querySelector('#message').innerText = state.message;
      // Display the result.
      setTimeout(() => {
        document.querySelector('#vs').style.display = 'none';
        document.querySelector('#result').style.display = 'block';
        document.querySelector('#message').style.display = 'block';
      }, 5000);
    }
    // Initialize the screen.
    if (state.scene === 'restart') {
      document.querySelector('#welcome').style.display = 'block';
      document.querySelector('#vs').style.display = 'none';
      document.querySelector('#result').style.display = 'none';
      document.querySelector('#message').style.display = 'none';
    }
  }
});

document.querySelectorAll('#welcome img').forEach(img => {
  img.addEventListener('click', elem => {
    assistantCanvas.sendTextQuery(elem.target.dataset.choice);
  });
});
