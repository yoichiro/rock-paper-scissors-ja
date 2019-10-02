'use strict';

// TODO: Write your code here.

interactiveCanvas.ready({
  onUpdate(data) {
    // Display the versus image.
    if (data.scene === 'result') {
      document.querySelector('#welcome').style.display = 'none';
      document.querySelector('#vs').style.display = 'block';
      document.querySelector('#user-choice').src = `images/${data.userChoice}.png`;
      document.querySelector('#action-choice').src = `images/${data.actionChoice}.png`;
      document.querySelector('#message').innerText = data.message;
      // Display the result.
      setTimeout(() => {
        document.querySelector('#vs').style.display = 'none';
        document.querySelector('#result').style.display = 'block';
        document.querySelector('#message').style.display = 'block';
      }, 5000);
    }
    // Initialize the screen.
    if (data.scene === 'restart') {
      document.querySelector('#welcome').style.display = 'block';
      document.querySelector('#vs').style.display = 'none';
      document.querySelector('#result').style.display = 'none';
      document.querySelector('#message').style.display = 'none';
    }
  }
});

document.querySelectorAll('#welcome img').forEach(img => {
  img.addEventListener('click', elem => {
    interactiveCanvas.sendTextQuery(elem.target.dataset.choice);
  });
});
