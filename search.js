(function () {

  // ── Base path (root '' oppure subdir '../') ────────────────────────
  const scriptEl = document.querySelector('script[src*="search.js"]');
  const base = scriptEl ? (scriptEl.getAttribute('data-root') || '') : '';

  // ── Indice di ricerca ─────────────────────────────────────────────
  const INDEX = [
    // Pagine principali
    { title: 'About Us',        desc: 'About the Iuav Master Fashion Community',       href: 'about-us.html',        tags: ['about','imac','iuav','community','fashion'] },
    { title: 'Living Archive',  desc: 'Archive of fashion research themes',             href: 'living-archive.html',  tags: ['archive','living','research','temi'] },
    { title: "Let's Network",   desc: 'Fashion industry connections and studios',       href: 'lets-network.html',    tags: ['network','industry','connect','aziende'] },
    { title: "Let's Share",     desc: 'Share projects with the community',              href: 'lets-share.html',      tags: ['share','blog','community','condividi'] },
    { title: 'Iuav 4 Venice',   desc: 'Map of Venice and Veneto fashion locations',    href: 'iuav-4-venice.html',   tags: ['map','venice','veneto','mappa','mestre'] },

    // Living Archive — temi
    { title: 'Heritage',        desc: 'Living Archive',  href: 'living-archive.html',  tags: ['heritage','storia','patrimonio'] },
    { title: 'Memory',          desc: 'Living Archive',  href: 'living-archive.html',  tags: ['memory','memoria'] },
    { title: 'Decoloniality',   desc: 'Living Archive',  href: 'living-archive.html',  tags: ['decoloniality','decoloniale'] },
    { title: 'Tailoring',       desc: 'Living Archive',  href: 'living-archive.html',  tags: ['tailoring','sartoria','craft'] },
    { title: 'Ecology',         desc: 'Living Archive',  href: 'living-archive.html',  tags: ['ecology','ecologia'] },
    { title: 'Gender',          desc: 'Living Archive',  href: 'living-archive.html',  tags: ['gender','genere'] },
    { title: 'Literature',      desc: 'Living Archive',  href: 'living-archive.html',  tags: ['literature','letteratura'] },
    { title: 'Communication',   desc: 'Living Archive',  href: 'living-archive.html',  tags: ['communication','comunicazione'] },
    { title: 'Sustainability',  desc: 'Living Archive',  href: 'living-archive.html',  tags: ['sustainability','sostenibilità'] },
    { title: 'Politics',        desc: 'Living Archive',  href: 'living-archive.html',  tags: ['politics','politica'] },
    { title: 'Emotions',        desc: 'Living Archive',  href: 'living-archive.html',  tags: ['emotions','emozioni'] },
    { title: 'Nature',          desc: 'Living Archive',  href: 'living-archive.html',  tags: ['nature','natura'] },
    { title: 'Speculative',     desc: 'Living Archive',  href: 'living-archive.html',  tags: ['speculative','speculativo'] },
    { title: 'Body',            desc: 'Living Archive',  href: 'living-archive.html',  tags: ['body','corpo'] },

    // Let's Network — categorie
    { title: 'Industries',          desc: "Let's Network",  href: 'lets-network.html',  tags: ['industries','industria','produzione'] },
    { title: 'Image Makers',        desc: "Let's Network",  href: 'lets-network.html',  tags: ['image','makers','fotografia','photography'] },
    { title: 'Styling Practises',   desc: "Let's Network",  href: 'lets-network.html',  tags: ['styling','practises','stile'] },
    { title: 'Studios',             desc: "Let's Network",  href: 'lets-network.html',  tags: ['studios','atelier','studio'] },
    { title: 'Casting & Scouting',  desc: "Let's Network",  href: 'lets-network.html',  tags: ['casting','scouting','modelli'] },
    { title: 'Specialized Services',desc: "Let's Network",  href: 'lets-network.html',  tags: ['services','servizi','specialized'] },
    { title: 'Artisan Network',     desc: "Let's Network",  href: 'lets-network.html',  tags: ['artisan','artigiano','craft','network'] },

    // Studenti
    { title: 'Riccardo Cappello',   desc: 'Heritage — Corpus Terrae',  href: 'Profili studenti/riccardo-cappello.html',  tags: ['riccardo','cappello','studente','student','heritage','corpus','terrae','maglia','sweater'] },
    { title: 'Francesca Caneva',    desc: 'Student — Iuav MA Fashion', href: 'lets-share.html',  tags: ['francesca','caneva','studente','student'] },
    { title: 'Flora Conticello',    desc: 'Student — Iuav MA Fashion', href: 'lets-share.html',  tags: ['flora','conticello','studente','student'] },
    { title: 'Giovanni Dancelli',   desc: 'Student — Iuav MA Fashion', href: 'lets-share.html',  tags: ['giovanni','dancelli','studente','student'] },
    { title: 'Annamaria Pieretti',  desc: 'Student — Iuav MA Fashion', href: 'lets-share.html',  tags: ['annamaria','pieretti','studente','student'] },
    { title: 'Agnese Prandi',       desc: 'Student — Iuav MA Fashion', href: 'lets-share.html',  tags: ['agnese','prandi','studente','student'] },
    { title: 'Alice Schiappacasse', desc: 'Student — Iuav MA Fashion', href: 'lets-share.html',  tags: ['alice','schiappacasse','studente','student'] },

    // Progetti
    { title: 'Corpus Terrae',  desc: 'Progetto di Riccardo Cappello — Heritage',  href: 'Profili studenti/riccardo-cappello.html',  tags: ['corpus','terrae','progetto','project','heritage','riccardo','cappello'] },

    // Mappa — luoghi
    { title: 'IUAV — Tolentini',             desc: 'Iuav 4 Venice — University Campus',    href: 'iuav-4-venice.html',  tags: ['iuav','tolentini','university','venezia'] },
    { title: 'IUAV — Cotonificio',           desc: 'Iuav 4 Venice — University Campus',    href: 'iuav-4-venice.html',  tags: ['iuav','cotonificio','university','dorsoduro'] },
    { title: 'Fondaco dei Tedeschi',         desc: 'Iuav 4 Venice — Fashion & Design',     href: 'iuav-4-venice.html',  tags: ['fondaco','tedeschi','venezia','fashion'] },
    { title: 'Museo del Merletto',           desc: 'Iuav 4 Venice — Lace Museum, Burano',  href: 'iuav-4-venice.html',  tags: ['merletto','lace','burano','museo'] },
    { title: 'Museo del Vetro',              desc: 'Iuav 4 Venice — Glass Museum, Murano', href: 'iuav-4-venice.html',  tags: ['vetro','glass','murano','museo'] },
    { title: 'Mercato di Rialto',            desc: 'Iuav 4 Venice — Materials & Crafts',   href: 'iuav-4-venice.html',  tags: ['rialto','mercato','market','tessuti','fabric'] },
    { title: 'Porto Marghera',               desc: 'Iuav 4 Venice — Industrial Zone',      href: 'iuav-4-venice.html',  tags: ['marghera','porto','industrial','industria'] },
    { title: 'Piazza Ferretto',              desc: 'Iuav 4 Venice — City Centre Mestre',   href: 'iuav-4-venice.html',  tags: ['ferretto','mestre','piazza'] },
    { title: 'Berto Industria Tessile',      desc: 'Iuav 4 Venice — Fabric Industry',      href: 'iuav-4-venice.html',  tags: ['berto','tessile','denim','fabric','industria'] },
  ];

  // ── CSS ───────────────────────────────────────────────────────────
  const css = document.createElement('style');
  css.textContent = `
    #search-btn {
      position: fixed;
      top: 28px;
      right: 28px;
      z-index: 9999;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      color: rgb(1, 0, 226);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.15s;
      transform: translateY(-50%);
    }
    #search-btn:hover { opacity: 0.55; }

    #search-overlay {
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: rgba(255, 255, 255, 0.97);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 110px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.18s;
    }
    #search-overlay.open {
      opacity: 1;
      pointer-events: all;
    }

    #search-close {
      position: absolute;
      top: 28px;
      right: 28px;
      background: none;
      border: none;
      cursor: pointer;
      font-family: 'LFT Etica Mono', 'Courier New', monospace;
      font-size: 22px;
      font-weight: 700;
      color: rgb(1, 0, 226);
      padding: 4px;
      line-height: 1;
    }
    #search-close:hover { opacity: 0.55; }

    #search-input-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
      width: min(620px, 80vw);
      border-bottom: 2px solid rgb(1, 0, 226);
      padding-bottom: 10px;
    }

    #search-input {
      flex: 1;
      font-family: 'LFT Etica Light', 'LFT Etica', sans-serif;
      font-size: 30px;
      font-weight: 300;
      color: rgb(1, 0, 226);
      background: none;
      border: none;
      outline: none;
      letter-spacing: 0.01em;
    }
    #search-input::placeholder { color: rgba(1, 0, 226, 0.25); }

    #search-results {
      width: min(620px, 80vw);
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      max-height: 52vh;
      overflow-y: auto;
    }
    #search-results::-webkit-scrollbar { width: 3px; }
    #search-results::-webkit-scrollbar-thumb { background: rgba(1,0,226,0.2); border-radius: 2px; }

    .search-result {
      display: block;
      padding: 14px 0;
      border-bottom: 1px solid rgba(1, 0, 226, 0.1);
      text-decoration: none;
      cursor: pointer;
    }
    .search-result:hover .sr-title { text-decoration: underline; text-underline-offset: 3px; }

    .sr-title {
      font-family: 'LFT Etica Mono', 'Courier New', monospace;
      font-size: 15px;
      font-weight: 700;
      color: rgb(1, 0, 226);
      letter-spacing: 0.05em;
      margin-bottom: 3px;
    }

    .sr-desc {
      font-family: 'LFT Etica Light', 'LFT Etica', sans-serif;
      font-size: 12px;
      font-weight: 300;
      color: rgba(1, 0, 226, 0.5);
    }

    .search-empty {
      font-family: 'LFT Etica Light', 'LFT Etica', sans-serif;
      font-size: 14px;
      color: rgba(1, 0, 226, 0.4);
      padding: 24px 0;
    }
  `;
  document.head.appendChild(css);

  // ── Icona lente ───────────────────────────────────────────────────
  const btn = document.createElement('button');
  btn.id = 'search-btn';
  btn.setAttribute('aria-label', 'Search');
  btn.innerHTML = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="2"/>
    <path d="M15.5 15.5L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
  document.body.appendChild(btn);

  // ── Overlay ───────────────────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.id = 'search-overlay';
  overlay.innerHTML = `
    <button id="search-close">✕</button>
    <div id="search-input-wrap">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="flex-shrink:0;opacity:0.35">
        <circle cx="10.5" cy="10.5" r="6.5" stroke="rgb(1,0,226)" stroke-width="2"/>
        <path d="M15.5 15.5L21 21" stroke="rgb(1,0,226)" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <input id="search-input" type="text" placeholder="search students, projects, themes…" autocomplete="off" spellcheck="false">
    </div>
    <div id="search-results"></div>
  `;
  document.body.appendChild(overlay);

  // ── Logica ricerca ────────────────────────────────────────────────
  function doSearch(q) {
    if (!q.trim()) return [];
    const lq = q.toLowerCase();
    return INDEX.filter(item =>
      item.title.toLowerCase().includes(lq) ||
      item.desc.toLowerCase().includes(lq)  ||
      item.tags.some(t => t.includes(lq))
    ).slice(0, 9);
  }

  function renderResults(q) {
    const box = document.getElementById('search-results');
    if (!q.trim()) { box.innerHTML = ''; return; }
    const items = doSearch(q);
    if (!items.length) {
      box.innerHTML = `<p class="search-empty">No results for "${q}"</p>`;
      return;
    }
    box.innerHTML = items.map(item => `
      <a class="search-result" href="${base}${item.href}">
        <div class="sr-title">${item.title}</div>
        <div class="sr-desc">${item.desc}</div>
      </a>
    `).join('');
  }

  function openSearch() {
    overlay.classList.add('open');
    setTimeout(() => document.getElementById('search-input').focus(), 40);
  }

  function closeSearch() {
    overlay.classList.remove('open');
    document.getElementById('search-input').value = '';
    document.getElementById('search-results').innerHTML = '';
  }

  // ── Allinea lente alla prima voce del menu ────────────────────────
  function alignBtn() {
    const firstItem = document.querySelector('#menu-box nav a, #menu-box nav button');
    if (firstItem) {
      const rect = firstItem.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      btn.style.top = center + 'px';
    }
  }
  window.addEventListener('load', alignBtn);
  window.addEventListener('resize', alignBtn);
  // Fallback immediato dopo il rendering
  requestAnimationFrame(alignBtn);

  btn.addEventListener('click', openSearch);
  document.getElementById('search-close').addEventListener('click', closeSearch);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });
  document.getElementById('search-input').addEventListener('input', e => renderResults(e.target.value));

})();
