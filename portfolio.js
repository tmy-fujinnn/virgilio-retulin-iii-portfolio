/* Edit your details here */
const CONFIG = {
  name: "Virgilio Retulin III", title: "Aspiring Developer", email: "retulintommy@gmail.com", phone: "+63 966 184 9375",
  location: "Philippines", github: "github.com/tmy-fujinnn", site: "https://yourusername.github.io",
  facts: ["I live in Quezon City, Philippines!", "Aspiring Developer | Cloud Computing & Software Development", "Outside of code: Writing, Music, Sleeping!"]
};

document.querySelectorAll('[data-cfg]').forEach(el=>{
  const k=el.dataset.cfg; el.textContent = k==='first' ? CONFIG.name.split(' ')[0] : CONFIG[k];
});
document.getElementById('logo').textContent = CONFIG.name;
document.getElementById('yr').textContent = new Date().getFullYear();
document.title = CONFIG.name + ' Retulin III' + ' | Portfolio';

const rows = [['Email',CONFIG.email,'mailto:'+CONFIG.email],['Phone',CONFIG.phone,'tel:'+CONFIG.phone.replace(/\s/g,'')],
  ['GitHub',CONFIG.github,'https://'+CONFIG.github],['Location',CONFIG.location,null]];
document.getElementById('info').innerHTML = rows.map(([l,v,h])=>
  h?`<a href="${h}"><span>${l}</span><b>${v}</b></a>`:`<div><span>${l}</span><b>${v}</b></div>`).join('');

/* cursor glow */
addEventListener('pointermove',e=>{
  document.body.style.setProperty('--mx',e.clientX+'px');
  document.body.style.setProperty('--my',e.clientY+'px');
});

/* photo: click cycles fact + ring colour */
const colors=['var(--cyan)','var(--pink)','var(--sun)','var(--coral)'];
let n=0;
document.getElementById('blob').addEventListener('click',()=>{
  
  document.getElementById('bubble').textContent = CONFIG.facts[n%CONFIG.facts.length];
  document.getElementById('stage').style.setProperty('--ring',colors[n%colors.length]);
  n++;
});
const profileImage=document.getElementById('profile-image');
const showProfileImage=()=>document.getElementById('front').classList.add('has-photo');
profileImage.addEventListener('load',showProfileImage);
if(profileImage.complete && profileImage.naturalWidth>0) showProfileImage();

/* QR business card */
const qrBox=document.getElementById('qr'); let qr=null;
const vcard=()=>['BEGIN:VCARD','VERSION:3.0','FN:'+CONFIG.name + ' Retulin III','TITLE:'+CONFIG.title,'TEL:'+CONFIG.phone,'EMAIL:'+CONFIG.email,'URL:'+ 'https://www.linkedin.com/in/virgilio-retulin-iii/','END:VCARD'].join('\n');
function drawQR(mode){
  const text = mode==='site' ? CONFIG.site : vcard();
  if(typeof QRCode==='undefined'){qrBox.textContent='QR code could not load.';return;}
  if(!qr){qr=new QRCode(qrBox,{text,width:240,height:240,colorDark:'#0a0716',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.L});}
  else{qr.clear();qr.makeCode(text);}
}
drawQR('vcard');
document.querySelectorAll('.seg button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.seg button').forEach(x=>x.setAttribute('aria-pressed',x===b));
  drawQR(b.dataset.mode);
}));
