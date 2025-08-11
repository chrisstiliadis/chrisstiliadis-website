// nav.js — injects header.html and highlights current page
(function(){
  const mount = document.getElementById('site-header');
  if(!mount){ return; }

  // Support GitHub Pages repo base path
  const headerHref = (document.currentScript && document.currentScript.src) || '';
  const baseMatch = headerHref.match(/^(https?:\/\/[^\/]+)(\/[^\/]+\/)?/);
  const basePath = baseMatch && baseMatch[2] ? baseMatch[2] : '/';

  fetch(basePath + 'header.html').then(r => {
    if(!r.ok) throw new Error('Failed to load header.html');
    return r.text();
  }).then(html => {
    mount.innerHTML = html;

    // load css if not already
    const existing = Array.from(document.styleSheets).some(s => (s.href||'').includes('nav.css'));
    if(!existing){
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = basePath + 'nav.css';
      document.head.appendChild(link);
    }

    // Highlight current link
    const here = location.pathname.replace(/\/$/, '');
    document.querySelectorAll('.cs-nav-list a').forEach(a => {
      const path = a.getAttribute('href').replace(/\/$/, '');
      if(path && (here.endsWith(path) || here === path)){
        a.classList.add('cs-active');
      }
      if((here === '' || here === '/' || here.endsWith('/index.html')) && (path === '' || path === '/')){
        a.classList.add('cs-active');
      }
    });
  }).catch(err => {
    console.error('[nav] ', err);
  });
})();
