// Spotify autoplay script to create and control the playlist embed
// This script loads the Spotify iFrame API and automatically
// creates a controller for the playlist embed located in the
// element with id `spotify-player`. Once the controller is ready
// it attempts to start playback.
// This script loads the Spotify iFrame API and creates a persistent
// playlist controller. It resumes playback from the last saved
// position (stored in localStorage) and automatically pauses when
// the user interacts with other media elements such as video iframes.

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('spotify-player');
    if (!container) return;

    // Retrieve the last known playback position (in milliseconds) from localStorage.
    const savedPosition = Number(localStorage.getItem('spotifyPosition') || 0);

    // Dynamically inject the Spotify iFrame API script only once per page load.
    const apiScript = document.createElement('script');
    apiScript.src = 'https://open.spotify.com/embed/iframe-api/v1';
    apiScript.async = true;
    document.body.appendChild(apiScript);

    // Global reference to the Spotify EmbedController so other scripts can pause/resume.
    window.spotifyEmbedController = undefined;

    // Once the API is ready, create the controller and resume playback.
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const options = {
        uri: 'spotify:playlist:2tZL2KmBep32gptkMH58Xs',
        theme: 0,
        width: 300,
        height: 152
      };
      const controllerCallback = (EmbedController) => {
        // Store the controller globally so it can be paused/resumed by other handlers.
        window.spotifyEmbedController = EmbedController;
        // If a saved position exists, seek to that time (converted from ms to seconds).
        if (savedPosition > 0) {
          try {
            EmbedController.seek(savedPosition / 1000);
          } catch (seekErr) {
            // If seek fails (e.g. due to API limitations), ignore the error.
          }
        }
        // Attempt to start playback. Some browsers may block this until user interaction.
        try {
          EmbedController.play();
        } catch (playErr) {
          // Swallow autoplay errors silently; the user can manually start playback.
        }
        // Listen for playback updates so we can persist the current position.
        EmbedController.addListener('playback_update', (event) => {
          if (event && event.data && !isNaN(event.data.position)) {
            localStorage.setItem('spotifyPosition', event.data.position);
          }
        });
      };
      IFrameAPI.createController(container, options, controllerCallback);
    };

    // Global click listener: if the user clicks on any iframe (except our Spotify embed), pause the music.
    document.addEventListener('click', (evt) => {
      const iframeTarget = evt.target.closest('iframe');
      // Ignore clicks on the Spotify player itself.
      if (iframeTarget && !iframeTarget.closest('.mp3-screen')) {
        if (window.spotifyEmbedController && typeof window.spotifyEmbedController.pause === 'function') {
          try {
            window.spotifyEmbedController.pause();
          } catch (pauseErr) {
            // Ignore pause errors.
          }
        }
      }
    });
  });
})();
