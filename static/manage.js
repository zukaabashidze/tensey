const state=JSON.parse(JSON.stringify(window.TSM_PORTFOLIO));
const status=document.getElementById('status'),download=document.getElementById('download');
let dirty=false,busy=0;
const mark=()=>{dirty=true;status.textContent='ცვლილებები ჩამოსატვირთია';};
function valid(value){const s=value.trim();if(/^data:image\/(png|jpeg|webp|gif);base64,/i.test(s))return s;if(/^(https?:\/\/|assets\/)/i.test(s))return s;throw Error('ჩასვი სურათის https:// ლინკი ან assets/ ფაილის გზა.');}
async function read(file){if(!['image/png','image/jpeg','image/webp','image/gif'].includes(file.type))throw Error('აირჩიე PNG, JPG, WebP ან GIF.');if(file.size>15*1024*1024)throw Error('ერთი ფოტო მაქსიმუმ 15 MB უნდა იყოს.');return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(Error('ფაილი ვერ წავიკითხე'));r.readAsDataURL(file);});}
function preview(src){return new Promise((resolve,reject)=>{const image=new Image();image.onload=resolve;image.onerror=()=>reject(Error('ფოტო ვერ ჩაიტვირთა — გადაამოწმე პირდაპირი ლინკი.'));image.src=src;});}
async function run(action){busy++;download.disabled=true;try{await action();mark();}catch(e){status.textContent=e.message;}finally{busy--;download.disabled=busy>0;}}
for(const [key,title] of Object.entries({thumbnails:'Thumbnails',logos:'Logos',banners:'Banners',posters:'Posters'})){
 const item=state[key],section=document.createElement('section');
 section.innerHTML=`<h2>${title}</h2><label for="${key}-cover">მთავარი ბარათის ფოტო — ლინკი</label><input id="${key}-cover" placeholder="https://example.com/photo.jpg"><button class="set-cover">ლინკის გამოყენება</button><label for="${key}-file">ან აირჩიე ბარათის ფოტო</label><input id="${key}-file" type="file" accept="image/png,image/jpeg,image/webp,image/gif"><img class="cover" alt="${title} ბარათის ფოტო"><label for="${key}-links">გალერეაში დამატება — თითო ლინკი ახალ ხაზზე</label><textarea id="${key}-links" rows="3" placeholder="https://example.com/photo-1.jpg\nhttps://example.com/photo-2.jpg"></textarea><button class="add-links">ლინკების დამატება</button><label for="${key}-files">ან აირჩიე გალერეის ფოტოები</label><input id="${key}-files" type="file" multiple accept="image/png,image/jpeg,image/webp,image/gif"><small>ფოტოები გამოჩნდება ქვემოთ. შეგიძლია წაშალო ან მთავარ ბარათად აირჩიო.</small><div class="gallery"></div>`;
 const cover=section.querySelector('.cover'),coverLink=section.querySelector('#'+key+'-cover'),gallery=section.querySelector('.gallery');
 function updateCover(){cover.src=item.cover;coverLink.value=item.cover.startsWith('data:')?'':item.cover;}
 function render(){gallery.replaceChildren();item.images.forEach((src,i)=>{const box=document.createElement('div');box.className='item';const img=document.createElement('img');img.src=src;img.alt=title+' '+(i+1);const remove=document.createElement('button');remove.textContent='წაშლა';remove.onclick=()=>{item.images.splice(i,1);render();mark();};const set=document.createElement('button');set.textContent='ბარათად';set.onclick=()=>{item.cover=src;updateCover();mark();};box.append(img,set,remove);gallery.append(box);});}
 section.querySelector('.set-cover').onclick=()=>run(async()=>{const src=valid(coverLink.value);await preview(src);item.cover=src;updateCover();});
 section.querySelector('#'+key+'-file').onchange=e=>run(async()=>{if(!e.target.files.length)return;const src=await read(e.target.files[0]);await preview(src);item.cover=src;updateCover();e.target.value='';});
 section.querySelector('.add-links').onclick=()=>run(async()=>{const input=section.querySelector('textarea');const sources=input.value.split(/\r?\n/).map(x=>x.trim()).filter(Boolean).map(valid);if(!sources.length)throw Error('ჯერ ჩასვი სურათის ლინკი.');await Promise.all(sources.map(preview));item.images.push(...sources);input.value='';render();});
 section.querySelector('#'+key+'-files').onchange=e=>run(async()=>{const sources=await Promise.all([...e.target.files].map(read));await Promise.all(sources.map(preview));item.images.push(...sources);render();e.target.value='';});
 updateCover();render();document.getElementById('categories').append(section);
}
download.onclick=()=>{const blob=new Blob(['window.TSM_PORTFOLIO = '+JSON.stringify(state,null,2)+';\n'],{type:'text/javascript;charset=utf-8'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='portfolio-images.js';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);dirty=false;status.textContent='ჩამოტვირთული ფაილი ჩაანაცვლე საიტის საქაღალდეში.';};
window.addEventListener('beforeunload',e=>{if(dirty||busy){e.preventDefault();e.returnValue='';}});
const siteState=JSON.parse(JSON.stringify(window.TSM_SITE));
const socialSection=document.createElement('section');
socialSection.innerHTML='<h2>სოციალური ქსელების ბმულები</h2><p>ჩასვი შენი პროფილის ან Discord-ის მოწვევის სრული https:// ბმული. ცარიელი ველი პლატფორმის მთავარ გვერდს გახსნის.</p>';
for(const name of ['Facebook','Instagram','Discord']){
 const label=document.createElement('label'),input=document.createElement('input');
 label.textContent=name;label.htmlFor='social-'+name;input.id=label.htmlFor;input.type='url';input.placeholder=name==='Discord'?'https://discord.gg/...':'https://www.'+name.toLowerCase()+'.com/...';input.value=siteState.social[name]||'';
 input.addEventListener('input',()=>{siteState.social[name]=input.value.trim();mark();});socialSection.append(label,input);
}
document.getElementById('categories').before(socialSection);
const save=document.createElement('button');save.textContent='საიტზე შენახვა';save.id='save';document.querySelector('.bar').prepend(save);
const exportSite=document.createElement('button');exportSite.textContent='სოციალური ბმულების ჩამოტვირთვა';socialSection.append(exportSite);
function checkSocial(){for(const value of Object.values(siteState.social)){if(!value)continue;let url;try{url=new URL(value);}catch{throw Error('სოციალური ქსელის ბმული არასწორია.');}if(url.protocol!=='https:')throw Error('ბმული უნდა იწყებოდეს https://-ით.');}}
exportSite.onclick=()=>{try{checkSocial();const url=URL.createObjectURL(new Blob(['window.TSM_SITE = '+JSON.stringify(siteState,null,2)+';\n'],{type:'text/javascript;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='site-config.js';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='site-config.js ჩაანაცვლე საიტის საქაღალდეში.';}catch(e){status.textContent=e.message;}};
save.onclick=async()=>{if(busy){status.textContent='დაელოდე ფოტოების ჩატვირთვას.';return;}save.disabled=true;try{checkSocial();const response=await fetch('/__tsm/save',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({portfolio:state,site:siteState})});if(!response.ok)throw Error('პირდაპირი შენახვა აქ მიუწვდომელია. ჩამოტვირთე ფოტოების და ბმულების ფაილები და ჩაანაცვლე საიტის საქაღალდეში.');dirty=false;status.textContent='შენახულია! საიტის გვერდი განაახლე ცვლილებების სანახავად.';}catch(e){status.textContent=e.message;}finally{save.disabled=false;}};
document.querySelector('h1').textContent='ფოტოებისა და ბმულების მართვა';
document.querySelectorAll('main > p')[1].textContent='ფოტოს შესაცვლელად ჩასვი პირდაპირი სურათის ბმული და დააჭირე „ლინკის გამოყენება“, შემდეგ „საიტზე შენახვა“. ამ ლოკალურ ვერსიაში ცვლილებები პირდაპირ ინახება. სხვა ჰოსტინგზე გადასატანად ჩამოტვირთე შეცვლილი ფაილები და ატვირთე საიტის საქაღალდეში.';
