'use strict';
// Image path first; if it fails the .no-img gradient fallback with the name is shown (never a broken icon).
const CM={hunza:"Hunza Valley, view from Eagle's Nest.jpg",skardu:'SkarduFromFort1175.JPG','fairy-meadows':'Naanga Parbat from Fairy Meadows.jpg',swat:'Kalam hills Swat KP.JPG',gwadar:'BeachOfGwadar.jpg',karachi:'Mazar e Quaid.jpg',lahore:'Badshahi Mosque Lahore Punjab.jpg',islamabad:'Shah Faisal Mosque ISB.jpg','mohenjo-daro':'Mohenjo-daro.jpg',hero:"Hunza Valley, view from Eagle's Nest.jpg"};
const cmUrl=(p,w)=>{const k=p.replace(/^images\//,'').replace(/\.jpg$/,'');return CM[k]?'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(CM[k])+'?width='+w:null};
const D=[
{id:'hunza',n:'Hunza Valley',loc:'Gilgit-Baltistan',cat:'Mountains',lat:36.32,lng:74.65,img:'hunza.jpg',d:'Beautiful mountain valley known for dramatic landscapes.',h:['Baltit & Altit Forts','Attabad Lake','Passu Cones']},
{id:'skardu',n:'Skardu',loc:'Gilgit-Baltistan',cat:'Mountains',lat:35.30,lng:75.63,img:'skardu.jpg',d:'Gateway to K2 with turquoise lakes and cold deserts.',h:['Shangrila Resort','Deosai Plains','Shigar Fort']},
{id:'fairy-meadows',n:'Fairy Meadows',loc:'Gilgit-Baltistan',cat:'Mountains',lat:35.38,lng:74.58,img:'fairy-meadows.jpg',d:'Alpine meadow with unforgettable views of Nanga Parbat.',h:['Nanga Parbat view','Raikot Bridge trek','Beyal Camp']},
{id:'swat',n:'Swat Valley',loc:'Khyber Pakhtunkhwa',cat:'Mountains',lat:35.22,lng:72.43,img:'swat.jpg',d:'The "Switzerland of the East" with rivers, forests and meadows.',h:['Malam Jabba','Kalam & Mahodand Lake','Buddhist heritage']},
{id:'gwadar',n:'Gwadar',loc:'Balochistan',cat:'Beaches',lat:25.12,lng:62.32,img:'gwadar.jpg',d:'Coastal port city with golden sands and the Hammerhead peninsula.',h:['Hammerhead Cliffs','Padi Zirr beach','Sunset views']},
{id:'karachi',n:'Karachi',loc:'Sindh',cat:'Cities',lat:24.86,lng:67.01,img:'karachi.jpg',d:'Pakistan\'s vibrant coastal metropolis of food, art and sea.',h:['Clifton Beach','Mazar-e-Quaid','Frere Hall']},
{id:'lahore',n:'Lahore',loc:'Punjab',cat:'Historical',lat:31.52,lng:74.36,img:'lahore.jpg',d:'Mughal-era cultural capital of gardens, mosques and street food.',h:['Badshahi Mosque','Lahore Fort','Walled City']},
{id:'islamabad',n:'Islamabad',loc:'Islamabad Capital Territory',cat:'Cities',lat:33.68,lng:73.05,img:'islamabad.jpg',d:'Green, modern capital set against the Margalla Hills.',h:['Faisal Mosque','Margalla Hills','Daman-e-Koh']},
{id:'mohenjo-daro',n:'Mohenjo-daro',loc:'Sindh',cat:'Historical',lat:27.33,lng:68.14,img:'mohenjo-daro.jpg',d:'UNESCO site of a 4,500-year-old Indus Valley city.',h:['Great Bath','Citadel mound','Site museum']}];
const $=s=>document.querySelector(s);
const gal=D.slice(0,9);
let favs=[];try{favs=JSON.parse(localStorage.getItem('favs'))||[]}catch(e){}
let filter='All',q='',map,markers={},lbi=0;

function imgBox(p,name,cls=''){const w=document.createElement('div');w.className='img '+cls;w.dataset.n=name;
 const i=new Image();i.alt=name+' travel photograph';i.loading='lazy';let t=0;i.onerror=()=>{const u=!t++&&cmUrl(p,900);if(u)i.src=u;else{i.remove();w.classList.add('no-img')}};i.src=p;w.appendChild(i);return w}
function toast(m,err){const t=document.createElement('div');t.className='toast'+(err?' err':'');t.textContent=m;$('#js-toasts').appendChild(t);setTimeout(()=>t.remove(),2800)}

function render(){const g=$('#js-grid');g.textContent='';
 const list=D.filter(x=>(filter==='All'||x.cat===filter)&&(x.n+' '+x.d+' '+x.cat+' '+x.loc).toLowerCase().includes(q));
 $('#js-empty').hidden=list.length>0;
 list.forEach(x=>{const c=document.createElement('article');c.className='card';
  const im=imgBox(x.img,x.n);
  im.insertAdjacentHTML('beforeend',`<button class="heart ${favs.includes(x.id)?'is-fav':''}" data-fav="${x.id}" aria-label="Favorite">${favs.includes(x.id)?'♥':'♡'}</button><span class="badge">${x.cat}</span>`);
  c.appendChild(im);
  c.insertAdjacentHTML('beforeend',`<div class="body"><h3>${x.n}</h3><p>${x.d}</p><div class="row"><button class="btn btn-gold" data-det="${x.id}">View Details</button><button class="btn btn-line" data-map="${x.id}">View on Map</button></div></div>`);
  g.appendChild(c)});$('#js-fav-count').textContent=favs.length}
function toggleFav(id){const x=D.find(d=>d.id===id);if(favs.includes(id)){favs=favs.filter(f=>f!==id);toast(x.n+' removed from favorites')}else{favs.push(id);toast(x.n+' added to favorites ♥')}
 try{localStorage.setItem('favs',JSON.stringify(favs))}catch(e){}render()}

function initMap(){if(typeof L==='undefined'){$('#js-map').textContent='Map failed to load (check internet connection).';return}
 map=L.map('js-map',{scrollWheelZoom:false}).setView([30.4,69.3],5);
 L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
 D.forEach(x=>{markers[x.id]=L.marker([x.lat,x.lng]).addTo(map).bindPopup(`<div class="popup"><h4>${x.n}</h4><small>${x.loc}</small><p>${x.d}</p><button data-det="${x.id}">View Details</button></div>`)});
 map.on('click',()=>map.scrollWheelZoom.enable());}
function showOnMap(id){const x=D.find(d=>d.id===id);closeModal();$('#map').scrollIntoView({behavior:'smooth'});
 setTimeout(()=>{if(!map)return;map.invalidateSize();map.flyTo([x.lat,x.lng],8,{duration:1.2});markers[id].openPopup();toast('Showing '+x.n+' on the map')},600)}

function openModal(id){const x=D.find(d=>d.id===id),b=$('#js-modal-box');b.textContent='';
 b.appendChild(imgBox(x.img,x.n));
 b.insertAdjacentHTML('beforeend',`<button class="m-x" data-close aria-label="Close">✕</button><div class="m-body"><h3>${x.n}</h3><p class="m-meta">📍 ${x.loc} · ${x.cat}</p><p>${x.d}</p><ul>${x.h.map(h=>`<li>${h}</li>`).join('')}</ul><div class="row"><button class="btn btn-gold" data-map="${x.id}">View on Map</button><button class="btn btn-line" data-close>Close</button></div></div>`);
 $('#js-modal').hidden=false}
function closeModal(){$('#js-modal').hidden=true}

function buildGallery(){const g=$('#js-gallery');gal.forEach((x,i)=>{const d=document.createElement('div');d.className='g-item';d.dataset.i=i;d.appendChild(imgBox(x.img,x.n));g.appendChild(d)})}
function lb(i){lbi=(i+gal.length)%gal.length;const x=gal[lbi],im=$('#js-lb-img');let t=0;im.onerror=()=>{const u=!t++&&cmUrl(x.img,1600);if(u)im.src=u;else{im.removeAttribute('src');im.alt=x.n}};im.src=x.img;im.alt=x.n;$('#js-lb-cap').textContent=x.n+' — '+x.loc;$('#js-lb').hidden=false}

document.addEventListener('click',e=>{const t=e.target.closest('[data-fav],[data-det],[data-map],[data-close],.g-item');if(!t)return;
 if(t.dataset.fav)toggleFav(t.dataset.fav);else if(t.dataset.det){openModal(t.dataset.det)}else if(t.dataset.map)showOnMap(t.dataset.map);else if('close' in t.dataset)closeModal();else lb(+t.dataset.i)});
$('#js-modal').addEventListener('click',e=>{if(e.target.id==='js-modal')closeModal()});
$('#js-search').addEventListener('input',e=>{q=e.target.value.trim().toLowerCase();render()});
$('#js-filters').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;filter=b.dataset.f;document.querySelectorAll('.chip').forEach(c=>c.classList.toggle('is-active',c===b));render()});
$('#js-lb-close').onclick=()=>$('#js-lb').hidden=true;$('#js-lb-prev').onclick=()=>lb(lbi-1);$('#js-lb-next').onclick=()=>lb(lbi+1);
$('#js-lb').addEventListener('click',e=>{if(e.target.id==='js-lb')$('#js-lb').hidden=true});
document.addEventListener('keydown',e=>{if(!$('#js-lb').hidden){if(e.key==='Escape')$('#js-lb').hidden=true;if(e.key==='ArrowLeft')lb(lbi-1);if(e.key==='ArrowRight')lb(lbi+1)}else if(e.key==='Escape')closeModal()});
$('#js-burger').onclick=()=>$('#menu').classList.toggle('is-open');
$('#menu').addEventListener('click',()=>$('#menu').classList.remove('is-open'));

function setTheme(d){document.body.classList.toggle('dark-mode',d);$('#js-theme').textContent=d?'☀️':'🌙'}
$('#js-theme').onclick=()=>{const d=!document.body.classList.contains('dark-mode');setTheme(d);try{localStorage.setItem('theme',d?'dark':'light')}catch(e){}};
try{setTheme(localStorage.getItem('theme')==='dark')}catch(e){}

$('#js-news').addEventListener('submit',e=>{e.preventDefault();const n=$('#js-name').value.trim(),m=$('#js-email').value.trim(),o=$('#js-msg');
 if(n.length<2){o.className='msg err';o.textContent='Please enter your name.';return}
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m)){o.className='msg err';o.textContent='Please enter a valid email address.';toast('Invalid email',true);return}
 o.className='msg ok';o.textContent=`Thanks ${n}! You're subscribed with ${m}.`;toast('Newsletter subscription submitted');e.target.reset()});

// Hero background (with fallback gradient defined in CSS)
(()=>{const h=$('.hero'),i=new Image();let t=0;i.onload=()=>h.style.backgroundImage=`url(${i.src})`;i.onerror=()=>{const u=!t++&&cmUrl('hero.jpg',1920);if(u)i.src=u};i.src='hero.jpg'})();
render();buildGallery();initMap();
