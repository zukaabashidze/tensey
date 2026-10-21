(() => {
  const config = window.TSM_SITE;
  const counters = document.querySelectorAll('.counter[data-target]');
  const numberFormat = new Intl.NumberFormat(document.documentElement.lang === 'ka' ? 'ka-GE' : 'en-US');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  counters.forEach(counter => {
    const target = Number(counter.dataset.target);
    if (!Number.isFinite(target) || target < 0) return;
    if (reducedMotion) {
      counter.textContent = numberFormat.format(target);
      return;
    }
    const duration = 1600;
    const start = performance.now();
    const animate = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = numberFormat.format(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  });

  const burger = document.getElementById('burger');
  const links = document.getElementById('links');
  burger?.addEventListener('click', () => {
    burger.setAttribute('aria-expanded', String(links.classList.toggle('open')));
  });
  burger?.setAttribute('aria-controls', 'links');
  const navLinks = [...(links?.querySelectorAll('a[href^="#"]') || [])];
  const sections = navLinks.map(a => ({a, el: a.hash === '#top' ? document.querySelector('.hero') : document.querySelector(a.hash)})).filter(x => x.el);
  if (sections.length) {
    const update = () => {
      const active = [...sections].reverse().find(x => x.el.getBoundingClientRect().top <= innerHeight * .4) || sections[0];
      sections.forEach(({a}) => {a.classList.toggle('on', a === active.a); if(a === active.a)a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current');});
    };
    let queued=false;
    addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{update();queued=false;});}},{passive:true});
    update();
  }
  document.querySelectorAll('.channels > .channel:not(.social-channel)').forEach((channel,i) => {
    const a=document.createElement('a');
    a.className=channel.className;
    a.href=i===0?'mailto:'+config.email:'tel:'+config.phone.replace(/[^+\d]/g,'');
    a.append(...channel.childNodes);a.querySelector('b').textContent=i===0?config.email:config.phone;
    channel.replaceWith(a);
  });
  document.querySelectorAll('.social-link').forEach(a=>{
    const value=config.social[a.getAttribute('aria-label')];
    const defaults={Facebook:'https://www.facebook.com/',Instagram:'https://www.instagram.com/',Discord:'https://discord.com/'};
    a.href=value && /^https:\/\//i.test(value)?value:defaults[a.getAttribute('aria-label')];
    a.target='_blank';a.rel='noopener noreferrer';a.removeAttribute('aria-disabled');
  });
  const lb=document.getElementById('lightbox');
  if(!lb)return;
  const img=document.getElementById('lbImg'),closeButton=document.getElementById('lbClose');
  let previous,overflow;
  lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Image preview');
  const close=()=>{lb.classList.remove('open');document.body.style.overflow=overflow||'';previous?.focus();};
  const open=picture=>{previous=picture;overflow=document.body.style.overflow;img.src=picture.src;img.alt=picture.alt;lb.classList.add('open');document.body.style.overflow='hidden';closeButton.focus();};
  document.querySelectorAll('.gallery .grid img').forEach(picture=>{
    picture.tabIndex=0;picture.setAttribute('role','button');picture.setAttribute('aria-haspopup','dialog');
    picture.addEventListener('click',()=>open(picture));
    picture.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(picture);}});
  });
  closeButton.addEventListener('click',close);
  lb.addEventListener('click',e=>{if(e.target===lb)close();});
  addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='Tab'){e.preventDefault();closeButton.focus();}});
})();
