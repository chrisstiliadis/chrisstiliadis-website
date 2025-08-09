(function() {
  // Select all navigation buttons within the deck
  const buttons = document.querySelectorAll('.deck-buttons .btn');
  if (!buttons.length) return;

  // Load click sound effect once
  const clickFx = new Audio('click.wav');

  function pressHandler(event) {
    const btn = event.currentTarget;
    // Add pressed state class for visual feedback
    btn.classList.add('is-pressed');
    // Reset and play click sound
    try {
      clickFx.currentTime = 0;
      clickFx.play();
    } catch (e) {}
    // Remove pressed state after short duration
    setTimeout(() => {
      btn.classList.remove('is-pressed');
    }, 120);
  }

  // Attach handlers to each button
  buttons.forEach((btn) => {
    btn.addEventListener('mousedown', pressHandler);
  });
})();