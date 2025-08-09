function renderCommercialReel() {
    const container = document.getElementById('commercial-container');
    if (!container) return;
    commercialReel.forEach(item => {
        const card = document.createElement('div');
        card.className = 'reel-item';
        const iframe = document.createElement('iframe');
        iframe.src = item.videoUrl;
        iframe.allow = 'autoplay; fullscreen';
        iframe.allowFullscreen = true;
        card.appendChild(iframe);
        const title = document.createElement('h3');
        title.textContent = item.title;
        card.appendChild(title);
        const credits = document.createElement('p');
        credits.innerHTML = item.credits.join('<br/>');
        card.appendChild(credits);
        container.appendChild(card);
    });
}
function renderArtistPage() {
    const container = document.getElementById('artist-container');
    if (!container) return;
    const desc = document.createElement('p');
    desc.textContent = artistDescription;
    container.appendChild(desc);
    const iframe = document.createElement('iframe');
    iframe.src = artistPlaylistUrl;
    iframe.width = '100%';
    iframe.height = '380';
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.loading = 'lazy';
    container.appendChild(iframe);
}
function renderPodcastPage() {
    const container = document.getElementById('podcast-container');
    if (!container) return;
    const iframe = document.createElement('iframe');
    iframe.src = podcastEmbedUrl;
    iframe.width = '100%';
    iframe.height = '232';
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.loading = 'lazy';
    container.appendChild(iframe);
    const title = document.createElement('h3');
    title.textContent = podcastTitle;
    container.appendChild(title);
    const subtitle = document.createElement('h4');
    subtitle.textContent = podcastSubtitle;
    subtitle.style.marginTop = '5px';
    subtitle.style.color = '#555';
    container.appendChild(subtitle);
    const desc = document.createElement('p');
    desc.textContent = podcastDescription;
    container.appendChild(desc);
    const credits = document.createElement('p');
    credits.innerHTML = podcastCredits.join('<br/>');
    container.appendChild(credits);
}
document.addEventListener('DOMContentLoaded', () => {
    renderCommercialReel();
    renderArtistPage();
      setActiveNav();
    renderPodcastPage();
});
  
function setActiveNav() {
  const links = document.querySelectorAll('nav.bottom-nav ul li a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === 'index.html' && href.includes('index'))) {
      link.classList.add('active');
    }
  });
}


