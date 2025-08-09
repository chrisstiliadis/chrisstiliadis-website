(function() {
      const strip = document.querySelector('.boombox-buttons');
      const hits = document.querySelectorAll('.boombox-hitrow a');
      if (!strip || !hits.length) return;
      const clickSound = new Audio('click.wav');
      function pressFx() {
        strip.classList.add('pressed');
        try {
          clickSound.currentTime = 0;
          clickSound.play();
        } catch (e) {}
        setTimeout(() => {
          strip.classList.remove('pressed');
        }, 120);
      }
      hits.forEach((a) => {
        a.addEventListener('click', pressFx);
      });
    })();
