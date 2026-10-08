(() => {
'use strict';
const ka={
'Prepare email':'წერილის მომზადება',
'Call us':'დაგვირეკე',
'Opens a draft in your email app. Send it there to contact us.':'გაიხსნება წერილის მონახაზი ელფოსტის აპში. დასაკავშირებლად გააგზავნე იქიდან.',
'Your email app will open with a draft. Send it there to complete your request. If it does not open, email us directly.':'ელფოსტის აპში გაიხსნება წერილის მონახაზი. მოთხოვნის დასასრულებლად გააგზავნე იქიდან. თუ აპი არ გაიხსნა, მოგვწერე პირდაპირ ელფოსტაზე.',

'Home':'მთავარი','Portfolio':'პორტფოლიო','Feedback':'შეფასებები','About':'ჩვენ შესახებ','Contact us':'დაგვიკავშირდი',
'Our work':'ჩვენი ნამუშევრები','Start a project':'დავიწყოთ პროექტი',
'TSM Designs is a creative studio making eye-catching visual media, custom branding and dynamic graphics for content creators, businesses and digital platforms. High-impact typography, bold colour and clear visual hierarchy — turned into assets people remember.':'TSM Designs კრეატიული სტუდიაა. კონტენტის შემქმნელების, ბიზნესებისა და ციფრული პლატფორმებისთვის ვქმნით გამორჩეულ ვიზუალურ მასალებს, ბრენდის იდენტობასა და დინამიკურ გრაფიკას. შთამბეჭდავი ტიპოგრაფიით, მკვეთრი ფერებითა და გააზრებული კომპოზიციით შენს იდეებს დასამახსოვრებელ დიზაინად ვაქცევთ.',
'creators and brands':'კონტენტის შემქმნელი და ბრენდი','designs delivered':'შესრულებული დიზაინი','24h':'24 სთ','average turnaround':'შესრულების საშუალო დრო','h average turnaround':'სთ. საშუალო შესრულების დრო',
'Thumbnails, banners, logos, posters and jerseys — built for YouTube, Twitch, TikTok and everything in between.':'ვიდეოს გარეკანები, ბანერები, ლოგოები, პოსტერები და მაისურების დიზაინი — YouTube-ისთვის, Twitch-ისთვის, TikTok-ისა და სხვა პლატფორმებისთვის.',
'Thumbnails':'ვიდეოს გარეკანები','Logos':'ლოგოები','Banners':'ბანერები','Posters':'პოსტერები',
'The preview frame that decides whether someone clicks. Faces, contrast and text that reads at any size.':'პირველი შთაბეჭდილება, რომელიც მაყურებელს ვიდეოს გახსნისკენ უბიძგებს. გამომსახველი სახეები, კონტრასტი და ნებისმიერ ზომაზე ადვილად წასაკითხი ტექსტი.',
'A mark that works everywhere — from a profile picture to a favicon to the side of a jersey.':'შენი ბრენდის ნიშანი, რომელიც ყველგან გამოგადგება — პროფილის ფოტოზე, საიტის ხატულასა თუ მაისურზე.',
'Channel art that says who you are and what you make in a single glance.':'არხის ვიზუალური გაფორმება, რომელიც ერთი შეხედვით აჩვენებს, ვინ ხარ და რას ქმნი.',
'Event and promo artwork built to catch attention from across the room.':'ღონისძიებებისა და სარეკლამო კამპანიების დიზაინი, რომელიც შორიდანაც იპყრობს ყურადღებას.',
'What people':'ჩვენზე რას','say':'ამბობენ',
"Trusted by 400+ creators and brands. Here's what they think about the work.":'400-ზე მეტი კონტენტის შემქმნელი და ბრენდი გვენდობა. აი, რას ამბობენ ჩვენს ნამუშევრებზე.',
'Giorgi K.':'გიორგი კ.','Ana M.':'ანა მ.','YouTube · 1.2M subs':'YouTube · 1,2 მლნ გამომწერი','Twitch streamer':'Twitch-ის სტრიმერი','YouTube channel':'YouTube-არხი','Brand':'ბრენდი',
'"Our click-through rate jumped after the first batch of thumbnails. They understand what makes a Georgian audience stop scrolling."':'„პირველი გარეკანების მიღებისთანავე ვიდეოებზე დაწკაპუნების მაჩვენებელი გაიზარდა. ზუსტად იციან, რა იქცევს ქართველი მაყურებლის ყურადღებას.“',
'"Fast, easy to talk to and the revisions never felt like a hassle. The channel finally looks like one brand."':'„სწრაფად მუშაობენ, კომუნიკაცია მარტივია და შესწორებებზე შეთანხმებაც არ გვიჭირს. ბოლოს და ბოლოს, არხს ერთიანი ვიზუალური სტილი აქვს.“',
'"Quality and attention to detail is insane. We send a raw title and get back something we can publish the same day."':'„ხარისხი და დეტალებისადმი ყურადღება შთამბეჭდავია. მხოლოდ სათაურს ვუგზავნით და იმავე დღეს გამოსაქვეყნებლად გამზადებულ დიზაინს ვიღებთ.“',
'"Professional, creative and always on point. They\'re our go-to designers for every drop we announce."':'„პროფესიონალები არიან, კრეატიულად მუშაობენ და ყოველთვის ზუსტად ხვდებიან, რა გვჭირდება. ყოველი ახალი კოლექციის წარდგენისას მათ ვენდობით.“',
'About the studio':'სტუდიის შესახებ',
'TSM Designs is a small team of designers working with Georgian and international creators. We know what a feed looks like at 2am on a phone screen, and we design for that — not for a portfolio wall.':'TSM Designs დიზაინერების მცირე გუნდია, რომელიც ქართველ და უცხოელ კონტენტის შემქმნელებთან მუშაობს. ვიცით, როგორ ათვალიერებს მაყურებელი სოციალურ ქსელებს ტელეფონში, თუნდაც ღამის ორ საათზე. ჩვენს დიზაინს სწორედ ამ რეალურ გარემოს ვარგებთ.',
"Every project starts with your content, not a template. Send the raw footage, the concept or just the title, and we'll come back with something you can publish.":'ყოველი პროექტი შენი კონტენტით იწყება. გამოგვიგზავნე გადაღებული მასალა, იდეა ან მხოლოდ სათაური და გამოსაქვეყნებლად გამზადებულ დიზაინს შეგიქმნით.',
"Unlimited revisions until you're happy with it":'შესწორებები შეზღუდვის გარეშე — სანამ შედეგით კმაყოფილი არ იქნები',
'Source files handed over on request':'მოთხოვნის შემთხვევაში სამუშაო ფაილებსაც გადმოგცემთ',
'Rush delivery available for same-day uploads':'საჭიროების შემთხვევაში დიზაინს იმავე დღეს მოვამზადებთ',
'Monthly packages for channels posting weekly':'ყოველთვიური პაკეტები არხებისთვის, რომლებიც კონტენტს ყოველკვირეულად აქვეყნებენ',
"Tell us what you're making and when you need it. We usually reply within a few hours.":'მოგვიყევი, რას ქმნი და როდის გჭირდება დიზაინი. ჩვეულებრივ, რამდენიმე საათში გპასუხობთ.',
'Email us':'მოგვწერე ელფოსტაზე','Call or WhatsApp':'დაგვირეკე ან მოგვწერე WhatsApp-ში',
'Your name':'შენი სახელი','Email':'ელფოსტა','What do you need?':'რა გჭირდება?','Logo':'ლოგო','Banner':'ბანერი','Poster':'პოსტერი','Jersey':'მაისურის დიზაინი','Monthly package':'ყოველთვიური პაკეტი','Deadline':'სასურველი ვადა','Project details':'პროექტის დეტალები','Send request':'მოთხოვნის გაგზავნა','Nika':'ნიკა','This week':'ამ კვირაში',
"Channel link, video title, style you're after…":'არხის ბმული, ვიდეოს სათაური, სასურველი სტილი…',
'Add your name and a valid email so we can reply.':'მიუთითე შენი სახელი და სწორი ელფოსტის მისამართი, რომ პასუხი მოგწეროთ.',
'Request sent. This demo form does not deliver mail yet — connect it to Formspree, Netlify Forms or your own backend.':'ეს ფორმა სადემონსტრაციოა — შეტყობინება არ გაგზავნილა. გასაგზავნად საჭიროა ელფოსტის სერვისთან დაკავშირება.',
'© 2026 TSM Designs. Branding and graphics for creators.':'© 2026 TSM Designs. ბრენდინგი და გრაფიკა კონტენტის შემქმნელებისთვის.',
'The preview frame that decides whether someone clicks. A selection of thumbnails made for YouTube and TikTok creators.':'გარეკანი, რომელიც მაყურებელს ვიდეოს გახსნისკენ უბიძგებს. აქ ნახავ YouTube-ისა და TikTok-ის კონტენტის შემქმნელებისთვის შექმნილ ნამუშევრებს.',
'A compact mark designed to work everywhere — profile pictures, favicons, watermarks and jersey badges. Shown here on a few different backgrounds; more client logo work coming soon.':'ლოგო, რომელიც ყველგან გამოგადგება — პროფილის ფოტოზე, საიტის ხატულად, წყლის ნიშნად თუ მაისურის ემბლემად. აქ ის სხვადასხვა ფონზეა წარმოდგენილი. მალე სხვა დამკვეთებისთვის შექმნილ ლოგოებსაც დავამატებთ.',
'Channel art that says who you are and what you make in a single glance. More banner work is being added to this page regularly.':'არხის ვიზუალური გაფორმება, რომელიც ერთი შეხედვით აჩვენებს, ვინ ხარ და რას ქმნი. ამ გვერდს რეგულარულად ვამატებთ ახალ ბანერებს.',
'Event and promo artwork built to catch attention from across the room. More poster work is being added to this page regularly.':'ღონისძიებებისა და სარეკლამო კამპანიების დიზაინი, რომელიც შორიდანაც იპყრობს ყურადღებას. ამ გვერდს რეგულარულად ვამატებთ ახალ პოსტერებს.',
'Want something like this?':'მსგავსი დიზაინი გინდა?',
"Tell us about your channel or brand and we'll put a design together.":'მოგვიყევი შენი არხის ან ბრენდის შესახებ და შენზე მორგებულ დიზაინს შევქმნით.',
'Open menu':'მენიუს გახსნა','Close':'დახურვა','5 out of 5 stars':'5 ვარსკვლავი 5-დან',
'TSM Designs logo':'TSM Designs-ის ლოგო','YouTube thumbnail design':'YouTube-ვიდეოს გარეკანის დიზაინი','Logo design':'ლოგოს დიზაინი','Channel banner design':'არხის ბანერის დიზაინი','Event poster design':'ღონისძიების პოსტერის დიზაინი',
'TSM Designs — Thumbnails, logos and branding for creators':'TSM Designs — ვიდეოს გარეკანები, ლოგოები და ბრენდინგი',
'Thumbnails — TSM Designs':'ვიდეოს გარეკანები — TSM Designs','Logos — TSM Designs':'ლოგოები — TSM Designs','Banners — TSM Designs':'ბანერები — TSM Designs','Posters — TSM Designs':'პოსტერები — TSM Designs',
'TSM Designs is a creative studio making thumbnails, logos, banners and posters for content creators, streamers and brands.':'TSM Designs კრეატიული სტუდიაა, რომელიც კონტენტის შემქმნელებისთვის, სტრიმერებისა და ბრენდებისთვის ვიდეოს გარეკანებს, ლოგოებს, ბანერებსა და პოსტერებს ქმნის.'
};
let lang='ka';try{lang=localStorage.getItem('tsm-language')==='en'?'en':'ka';}catch{}
const translate=(text)=>{if(lang==='en')return text;if(ka[text])return ka[text];const m=text.match(/^(thumbnails|logos|banners|posters) design (\d+)$/);if(m)return ({thumbnails:'ვიდეოს გარეკანი',logos:'ლოგო',banners:'ბანერი',posters:'პოსტერი'})[m[1]]+' '+m[2];return text;};
window.tsmTranslate=translate;
const heading=document.querySelector('.hero h1');const headingEn=heading?.innerHTML;
const originalTitle=document.title;const meta=document.querySelector('meta[name="description"]');const description=meta?.content;
document.querySelectorAll('option').forEach(o=>{if(!o.hasAttribute('value'))o.value=o.textContent;});
const records=[];const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;
while(node=walker.nextNode()){if(node.parentElement.closest('script,style,.hero h1'))continue;const key=node.textContent.trim();if(ka[key])records.push({node,text:node.textContent,key});}
const attrs=[];document.querySelectorAll('[alt],[aria-label],[placeholder]').forEach(el=>{for(const name of ['alt','aria-label','placeholder']){if(el.hasAttribute(name))attrs.push({el,name,text:el.getAttribute(name)});}});
const control=document.createElement('div');control.className='language-control';
control.innerHTML='<button type="button" class="language-trigger" aria-haspopup="menu" aria-expanded="false" aria-controls="language-menu"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 6.5h14M5 17.5h14"/></svg><span class="language-current"></span><svg class="language-chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg></button><div class="language-menu" id="language-menu" role="menu" aria-label="Language / ენა" hidden><button type="button" role="menuitemradio" aria-checked="false" data-lang="ka"><span class="language-code">KA</span><span lang="ka">ქართული</span><span class="language-check" aria-hidden="true">✓</span></button><button type="button" role="menuitemradio" aria-checked="false" data-lang="en"><span class="language-code">EN</span><span lang="en">English</span><span class="language-check" aria-hidden="true">✓</span></button></div>';
const nav=document.querySelector('.nav-in');nav.insertBefore(control,nav.querySelector('.burger'));
const trigger=control.querySelector('.language-trigger'),menu=control.querySelector('.language-menu'),items=[...menu.querySelectorAll('button')];
function closeMenu(restore=false){menu.hidden=true;trigger.setAttribute('aria-expanded','false');if(restore)trigger.focus();}
function openMenu(){menu.hidden=false;trigger.setAttribute('aria-expanded','true');items.find(b=>b.dataset.lang===lang).focus();}
trigger.addEventListener('click',()=>menu.hidden?openMenu():closeMenu());
trigger.addEventListener('keydown',e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();openMenu();}});
menu.addEventListener('keydown',e=>{const i=items.indexOf(document.activeElement);if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();items[e.key==='Home'?0:e.key==='End'?items.length-1:(i+(e.key==='ArrowDown'?1:-1)+items.length)%items.length].focus();}});
control.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();closeMenu(true);}});
document.addEventListener('click',e=>{if(!control.contains(e.target))closeMenu();});
control.addEventListener('focusout',e=>{if(!control.contains(e.relatedTarget))closeMenu();});
items.forEach(button=>button.addEventListener('click',()=>{lang=button.dataset.lang;try{localStorage.setItem('tsm-language',lang);}catch{}apply();closeMenu(true);}));
function apply(){document.documentElement.lang=lang;control.querySelector('.language-current').textContent=lang==='ka'?'ქართული':'English';trigger.setAttribute('aria-label',lang==='ka'?'ენის შეცვლა: ქართული':'Change language: English');items.forEach(b=>b.setAttribute('aria-checked',String(b.dataset.lang===lang)));for(const r of records)r.node.textContent=r.text.replace(r.key,translate(r.key));for(const a of attrs)a.el.setAttribute(a.name,translate(a.text));if(heading)heading.innerHTML=lang==='ka'?'გარეკანები, რომლებიც<br><em>ყურადღებას იპყრობს</em>.':headingEn;document.title=translate(originalTitle);if(meta)meta.content=translate(description);const note=document.getElementById('note');if(note?.dataset.message)note.textContent=translate(note.dataset.message);}
window.addEventListener('storage',e=>{if(e.key==='tsm-language'){lang=e.newValue==='en'?'en':'ka';apply();}});
apply();
})();
