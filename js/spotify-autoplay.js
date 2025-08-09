// Spotify autoplay script to create and control the playlist embed
// This script loads the Spotify iFrame API and automatically
// creates a controller for the playlist embed located in the
// element with id `spotify-player`. Once the controller is ready
// it attempts to start playback.
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('spotify-player');
    if (!container) return;
    // Inject the Spotify iFrame API script
    const apiScript = document.createElement('script');
    apiScript.src = 'https://open.spotify.com/embed/iframe-api/v1';
    apiScript.async = true;
    document.body.appendChild(apiScript);

    // Define the callback that will run once the API is loaded
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const options = {
        uri: 'spotify:playlist:2tZL2KmBep32gptkMH58Xs',
        theme: 0,
        width: 300,
        height: 152
      };
      const callback = (EmbedController) => {
        // Try to start playback immediately when the controller is ready
        // Some browsers may block autoplay until user interacts with the page
        try {
          EmbedController.play();
        } catch (e) {
          // Fallback: do nothing if autoplay is blocked
        }
      };
      IFrameAPI.createController(container, options, callback);
    };
  });
})();