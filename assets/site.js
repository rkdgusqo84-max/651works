(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CATS = window.CATEGORIES || {};
  var LIST = window.PROJECTS || [];
  var JA = root.lang === 'ja';   // 일본어 페이지면 titleJa 사용

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── Header: 스크롤 시 배경, 모바일 메뉴 ── */
  var header = document.querySelector('.header');
  // 영상 히어로가 있으면 영상을 지날 때까지 투명 헤더 유지
  var hero = document.querySelector('.hero');
  function onScroll() {
    var limit = hero ? hero.offsetHeight - header.offsetHeight : 8;
    header.classList.toggle('scrolled', window.scrollY > limit);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var menuBtn = document.querySelector('.menu-btn');
  function setMenu(open) {
    header.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.textContent = open ? 'Close' : 'Menu';
    document.body.style.overflow = open ? 'hidden' : '';
  }
  menuBtn.addEventListener('click', function () { setMenu(!header.classList.contains('open')); });
  document.querySelectorAll('.nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ── Reveal ── */
  var io = 'IntersectionObserver' in window && !reduce ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' }) : null;
  function reveal(scope) {
    (scope || document).querySelectorAll('[data-reveal]:not(.in)').forEach(function (el) {
      io ? io.observe(el) : el.classList.add('in');
    });
  }

  /* ── 페이지 전환: 같은 사이트 내 다른 페이지로 갈 때 페이드 아웃 ── */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a || reduce || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin || (url.pathname === location.pathname && url.search === location.search)) return;
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(function () { location.href = url.href; }, 260);
  });
  window.addEventListener('pageshow', function (e) { if (e.persisted) document.body.classList.remove('leaving'); });

  /* ── 쇼릴: 화면 밖이면 멈춤, 모션 줄이기 설정이면 자동재생 안 함 ── */
  var reel = document.querySelector('.hero video');
  if (reel) {
    if (reduce) { reel.removeAttribute('autoplay'); reel.pause(); reel.controls = true; }
    else if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) { var p = reel.play(); if (p) p.catch(function () {}); } else reel.pause();
      }).observe(reel);
    }
  }

  /* ── Works 그리드 ── */
  function mediaHTML(p) {
    if (p.placeholder) {
      return '<div class="ph"><span class="label">' + esc(CATS[p.category]) + '</span>' +
             '<strong>Coming soon</strong><span class="label">이미지 교체 영역</span></div>';
    }
    return '<img src="' + esc(p.image) + '" alt="" loading="lazy" decoding="async"><span class="more">View project →</span>';
  }
  function workHTML(p, half) {
    var tag = p.placeholder ? 'div' : 'a';
    var href = p.placeholder ? '' : ' href="project.html?id=' + encodeURIComponent(p.id) + '"';
    return '<' + tag + ' class="work ' + (!half && p.span === 'full' ? 'full' : 'half') + '" data-cat="' + esc(p.category) + '"' + href + ' data-reveal>' +
      '<div class="work-media" style="aspect-ratio:' + esc(p.ratio || '16/9') + '">' + mediaHTML(p) + '</div>' +
      '<div class="work-info"><h3>' + esc((JA && p.titleJa) || p.title) + '</h3><span class="year">' + esc(p.year || '—') + '</span>' +
      '<span class="label">' + esc(CATS[p.category]) + (p.type ? ' · ' + esc(p.type) : '') + '</span></div>' +
      '</' + tag + '>';
  }
  /* ── 메인: 파트별 대표작 1~2개 ── */
  var parts = document.getElementById('parts');
  if (parts) {
    parts.innerHTML = Object.keys(CATS).map(function (k, i) {
      var all = LIST.filter(function (p) { return p.category === k; });
      var feat = all.filter(function (p) { return p.featured; });
      if (!feat.length) feat = all.slice(0, 2);
      var link = 'works.html?cat=' + encodeURIComponent(k);
      return '<div class="part">' +
        '<div class="part-head" data-reveal><span class="label">(0' + (i + 1) + ')</span>' +
          '<h3><a href="' + link + '">' + esc(CATS[k]) + '</a></h3>' +
          '<a class="label u" href="' + link + '">View all ' + all.length + ' →</a></div>' +
        '<div class="works">' + feat.map(function (p) { return workHTML(p, true); }).join('') + '</div>' +
      '</div>';
    }).join('');
  }

  /* ── 골라서 보여주기: <div class="works" data-ids="id1,id2"> ── */
  document.querySelectorAll('[data-ids]').forEach(function (box) {
    box.innerHTML = box.dataset.ids.split(',').map(function (id) {
      var p = LIST.filter(function (x) { return x.id === id.trim(); })[0];
      return p ? workHTML(p, true) : '';
    }).join('');
  });

  /* ── 전체 작업: 필터 (works.html?cat=drone 처럼 바로 열 수 있음) ── */
  var grid = document.getElementById('works-grid');
  if (grid) {
    grid.innerHTML = LIST.map(function (p) { return workHTML(p); }).join('') + '<p class="empty" hidden>이 분류의 작업은 준비 중입니다.</p>';
    var filters = document.getElementById('filters');
    // 분류가 하나뿐이면 필터는 숨김
    filters.hidden = Object.keys(CATS).length < 2;
    var keys = ['all'].concat(Object.keys(CATS));
    filters.innerHTML = keys.map(function (k, i) {
      // 자리표시(placeholder)는 개수에서 제외
      var n = LIST.filter(function (p) { return !p.placeholder && (k === 'all' || p.category === k); }).length;
      return '<button type="button" aria-pressed="' + (i === 0) + '" data-filter="' + k + '">' +
             (k === 'all' ? 'All' : esc(CATS[k])) + '<sup>' + n + '</sup></button>';
    }).join('');
    filters.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      filters.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      var shown = 0;
      grid.querySelectorAll('.work').forEach(function (w) {
        var on = b.dataset.filter === 'all' || w.dataset.cat === b.dataset.filter;
        w.classList.toggle('hide', !on);
        if (on) { shown++; w.classList.add('in'); }
      });
      grid.querySelector('.empty').hidden = shown > 0;
      if (e.isTrusted) history.replaceState(null, '', b.dataset.filter === 'all' ? 'works.html' : '?cat=' + b.dataset.filter);
    });
    var pre = filters.querySelector('[data-filter="' + new URLSearchParams(location.search).get('cat') + '"]');
    if (pre) pre.click();
  }

  /* ── 프로젝트 상세 ── */
  var detail = document.getElementById('project');
  if (detail) {
    var id = new URLSearchParams(location.search).get('id');
    var found = LIST.filter(function (p) { return p.id === id && !p.placeholder; })[0];
    // 이전/다음은 같은 파트 안에서 순환
    var real = found ? LIST.filter(function (p) { return p.category === found.category && !p.placeholder; }) : [];
    var i = real.indexOf(found);
    if (i < 0) {
      detail.innerHTML = '<div class="wrap p-head"><a class="back u" href="works.html">← All work</a>' +
        '<h1 class="p-title">프로젝트를 찾을 수 없습니다.</h1></div>';
    } else {
      var p = real[i], prev = real[(i - 1 + real.length) % real.length], next = real[(i + 1) % real.length];
      document.title = p.title + ' — 651WORKS';
      var vids = [].concat(p.youtube || []);   // 영상 하나 또는 여러 개
      var player = vids.length ? '<div class="players' + (vids.length > 1 ? ' multi' : '') + '">' + vids.map(function (v, k) {
        var name = p.title + (v.label ? ' ' + v.label : '');
        return '<div class="player" data-reveal><button type="button" data-k="' + k + '" aria-label="' + esc(name) + ' 영상 재생">' +
          // 여러 편이면 편마다 유튜브 썸네일(hqdefault는 4:3 레터박스라 16:9 cover로 딱 맞음)
          '<img src="' + esc(vids.length > 1 ? 'https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg' : p.image) + '" alt="" loading="lazy">' + (v.label ? '<span class="label tag">' + esc(v.label) + '</span>' : '') +
          '<span class="play">Play film ▶</span></button></div>';
      }).join('') + '</div>' : '<div class="player" data-reveal><img src="' + esc(p.image) + '" alt=""></div>';
      detail.innerHTML =
        '<div class="wrap p-head">' +
          '<a class="back u" href="works.html?cat=' + encodeURIComponent(p.category) + '">← ' + esc(CATS[p.category]) + '</a>' +
          '<p class="label" data-reveal>' + esc(CATS[p.category]) + (p.type ? ' · ' + esc(p.type) : '') + '</p>' +
          '<h1 class="p-title" data-reveal>' + esc(p.title) + '</h1>' +
          '<dl class="p-meta" data-reveal>' +
            '<div><dt class="label">Client</dt><dd>' + esc(p.client) + '</dd></div>' +
            '<div><dt class="label">Role</dt><dd>' + esc(p.role) + '</dd></div>' +
            '<div><dt class="label">Category</dt><dd class="en">' + esc(CATS[p.category]) + '</dd></div>' +
            '<div><dt class="label">Year</dt><dd class="en">' + esc(p.year) + '</dd></div>' +
          '</dl>' +
          player +
          '<div class="p-body" data-reveal><span class="label">Overview</span>' +
            (p.summary ? '<p>' + esc(p.summary) + '</p>' : '<p class="muted">프로젝트 설명 준비 중 — assets/projects.js의 summary에 입력하세요.</p>') +
            (p.link ? '<a class="ext u" href="' + esc(p.link) + '" target="_blank" rel="noopener">Instagram에서 보기 ↗</a>' : '') +
          '</div>' +
          (real.length < 2 ? '' :
          '<nav class="p-nav" aria-label="같은 파트의 다른 프로젝트">' +
            (real.length < 3 ? '<span></span>' :   // 2개뿐이면 이전=다음이라 다음만
            '<a href="project.html?id=' + encodeURIComponent(prev.id) + '"><span class="label">← Previous</span><strong>' + esc(prev.title) + '</strong></a>') +
            '<a href="project.html?id=' + encodeURIComponent(next.id) + '"><span class="label">Next →</span><strong>' + esc(next.title) + '</strong></a>' +
          '</nav>') +
        '</div>';
      detail.querySelectorAll('.player button').forEach(function (btn) { btn.addEventListener('click', function () {
        var v = vids[btn.dataset.k];
        var f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + v.id + '?autoplay=1&rel=0&playsinline=1' + (v.start ? '&start=' + v.start : '');
        f.title = p.title + (v.label ? ' ' + v.label : '');
        f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        f.allowFullscreen = true;
        btn.replaceWith(f);
      }); });
    }
  }

  reveal();
  requestAnimationFrame(function () { root.classList.add('ready'); });
})();
