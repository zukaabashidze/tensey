(() => {
 const nav=document.querySelector('.links'),burger=document.querySelector('.burger');
 if(!nav||!burger)return;
 const contact=document.querySelector('.nav-in>a.btn');
 if(contact){const link=contact.cloneNode(true);link.className='mobile-contact';nav.append(link);}
 function close(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false');}
 nav.addEventListener('click',event=>{if(event.target.closest('a'))close();});
 document.addEventListener('click',event=>{if(!event.target.closest('.nav'))close();});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){close();burger.focus();}});
 const desktop=matchMedia('(min-width:721px)');desktop.addEventListener('change',event=>{if(event.matches)close();});
})();
