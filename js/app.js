/* =========================================================
   EITO TV · CONFIGURACIÓN CENTRAL
   Cambia enlaces aquí. No necesitas tocar el CSS.
   ========================================================= */
const LINKS = {
  discord: 'https://discord.gg/ReUtMYvgrx',
  tiktok: 'https://www.tiktok.com/@eito_mvp',
  twitch: 'https://www.twitch.tv/eito_ttv',
  steam: 'https://steamcommunity.com/profiles/76561199100788703/',
  spotify: 'https://open.spotify.com/user/mwsxfj27v8s7nly1zycgg9m4a',
  youtube: 'https://www.youtube.com/@eito_ttv',
  playstation: '',
  discordPersonal: ''
};

const PLATFORMS = [
  {id:'discord', name:'SERVER DE DISCORD', sub:'Somos 700 miembros · Comunidad · Gaming', icon:'discord.svg', preview:'server', previewImage:'discord-server-preview.webp', previewAlt:'Tarjeta de la comunidad gamer EITO en Discord'},
  {id:'tiktok', name:'TikTok', sub:'@eito_mvp', username:'@eito_mvp', icon:'tiktok.svg', preview:'profile', previewImage:'tiktok-preview.webp', previewAlt:'Captura del perfil de Eito en TikTok'},
  {id:'twitch', name:'Twitch', sub:'@eito_ttv', username:'eito_ttv', icon:'twitch.svg', preview:'profile', previewImage:'twitch-preview.webp', previewAlt:'Imagen de perfil o portada de Eito'},
  {id:'steam', name:'Steam', sub:'Mi perfil de Steam', username:'Eito (perfil de Steam)', icon:'steam.svg', preview:'profile', previewImage:'steam-preview.webp', previewAlt:'Captura del perfil de Steam de Eito'},
  {id:'spotify', name:'Spotify', sub:'Mi perfil de Spotify', username:'Perfil de Eito en Spotify', icon:'spotify.svg', preview:'profile', previewImage:'spotify-preview.webp', previewAlt:'Captura del perfil de Spotify de Eito'},
  {id:'youtube', name:'YouTube', sub:'@eito_ttv', username:'@eito_ttv', icon:'youtube.svg', preview:'profile', previewImage:'youtube-preview.webp', previewAlt:'Captura del canal de YouTube de Eito'},
  {id:'playstation', name:'PlayStation', sub:'Eito TTV · Eito-MVP', username:'Eito-MVP', icon:'playstation.svg', preview:'ps'},
  {id:'discordPersonal', name:'Mi Discord', sub:'eitotv', username:'eitotv', icon:'discord.svg', preview:'profile', previewImage:'discord-personal-preview.webp', previewAlt:'Captura del perfil personal de Discord de Eito'}
];

const root = document.getElementById('platforms');
let toastTimer;
function showToast(message, kind='success'){
  const toast=document.getElementById('siteToast');
  if(!toast) return;
  toast.textContent=message;
  toast.className=`site-toast show ${kind}`;
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove('show'),3200);
}

function esc(value=''){
  return value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}

function appLabel(id){
  const labels={discord:'Discord',tiktok:'TikTok',twitch:'Twitch',steam:'Steam',spotify:'Spotify',youtube:'YouTube',playstation:'PlayStation',xbox:'Xbox',discordPersonal:'Discord'};
  return labels[id] || 'la aplicación';
}

function buildPreview(item){
  const title = item.preview === 'server' ? 'VISTA DE LA COMUNIDAD' : 'VISTA DEL PERFIL';
  if(item.previewImage){
    const vertical = ['discord-server-preview.webp','discord-personal-preview.webp'].includes(item.previewImage);
    return `<div class="preview ${vertical ? 'preview-vertical' : 'preview-wide'}">
      <div class="preview-title">${title}</div>
      <div class="preview-image-frame ${vertical ? 'is-vertical' : 'is-wide'}">
        <img class="preview-image" src="assets/${esc(item.previewImage)}" alt="${esc(item.previewAlt || item.name)}" loading="lazy">
      </div>
    </div>`;
  }
  if(item.preview==='ps'){
    return `<div class="preview"><div class="preview-title">VISTA DEL PERFIL</div><div class="preview-box profile-preview"><img class="profile-avatar" src="assets/ps-avatar.png" alt="Avatar de PlayStation"><span><b>Eito TTV</b><br><small>Eito-MVP</small></span></div></div>`;
  }
  return '';
}

function makeCard(item,index){
  const url = LINKS[item.id] || '';
  const disabled = !url;
  const card=document.createElement('article');
  card.className=`platform-card ${item.id}${index===0?' featured':''}`;
  card.innerHTML=`
    <button class="platform-main" type="button" aria-expanded="false">
      <span class="platform-icon"><img src="assets/${item.icon}" alt=""></span>
      <span><span class="platform-name">${esc(item.name)}</span><span class="platform-sub">${esc(item.sub)}</span></span>
      <span class="arrow">›</span>
    </button>
    <div class="platform-panel">
      <div class="options">
        <a class="option app-link" href="${disabled?'#':url}" data-url="${esc(url)}">📱 <b>Abrir desde la aplicación</b></a>
        <a class="option" href="${disabled?'#':url}" target="_blank" rel="noopener noreferrer">🌐 <b>Abrir link desde el navegador</b></a>
        <button class="option copy-link" type="button" data-url="${esc(url)}" data-user="${esc(item.username || '')}">📋 <b>${item.id==='discord' ? 'Copiar enlace de invitación' : 'Copiar usuario'}</b></button>
        ${item.id==='discord' ? '<button class="option show-qr" type="button" data-url="'+esc(url)+'">▣ <b>Mostrar código QR</b></button>' : ''}
      </div>
      <div class="qr"><img alt="Código QR"></div>
      ${disabled ? '<div class="note">Este enlace todavía está pendiente. No se ha inventado ningún perfil.</div>' : ''}
      ${buildPreview(item)}
      ${item.id==='tiktok' ? '<div class="note">Si TikTok bloquea la apertura de la app, utiliza “Abrir link desde el navegador” o “Copiar enlace”.</div>' : ''}
    </div>`;

  const main=card.querySelector('.platform-main');
  main.addEventListener('click',()=>{
    const open=card.classList.toggle('open');
    main.setAttribute('aria-expanded',String(open));
  });

  card.querySelector('.copy-link').addEventListener('click', async e=>{
    const btn=e.currentTarget;
    const value=btn.dataset.user || btn.dataset.url;
    const isInvite=card.classList.contains('discord');
    if(!value){showToast('Este usuario todavía no está configurado.','info');return;}
    let copied=false;
    try{
      if(navigator.clipboard && window.isSecureContext){await navigator.clipboard.writeText(value);copied=true;}
      else {
        const field=document.createElement('textarea');field.value=value;field.style.position='fixed';field.style.opacity='0';document.body.appendChild(field);field.select();
        copied=document.execCommand('copy');field.remove();
      }
    }catch{}
    if(copied){
      const btn=e.currentTarget; const old=btn.innerHTML; btn.innerHTML=isInvite?'✓ <b>Invitación copiada</b>':'✓ <b>Usuario copiado</b>';
      btn.classList.add('copied'); showToast(isInvite?'✓ Invitación de Discord copiada al portapapeles':'✓ Usuario copiado al portapapeles','success');
      setTimeout(()=>{btn.innerHTML=old;btn.classList.remove('copied');},1800);
    }else{window.prompt(isInvite?'Copia la invitación de Discord:':'Copia este usuario:',value);showToast(isInvite?'Copia la invitación que aparece en pantalla':'Copia el usuario que aparece en pantalla','info');}
  });

  const qrButton=card.querySelector('.show-qr');
  if(qrButton) qrButton.addEventListener('click',e=>{
    const url=e.currentTarget.dataset.url;
    if(!url){return alert('Este enlace todavía no está configurado.');}
    const qr=card.querySelector('.qr');
    if(qr.style.display==='block'){qr.style.display='none';return;}
    qr.querySelector('img').src='https://api.qrserver.com/v1/create-qr-code/?size=260x260&data='+encodeURIComponent(url);
    qr.style.display='block';
  });

  card.querySelector('.app-link').addEventListener('click',e=>{
    const url=e.currentTarget.dataset.url;
    if(!url){e.preventDefault();alert('Este enlace todavía no está configurado.');return;}
    const ua=navigator.userAgent||'';
    const restricted=/TikTok|BytedanceWebview|musical_ly|Instagram|FBAN|FBAV|FB_IAB/i.test(ua);
    const android=/Android/i.test(ua);
    const ios=/iPhone|iPad|iPod/i.test(ua);
    if(restricted){
      e.preventDefault();
      window.location.href=url;
      return;
    }
    if(android){
      e.preventDefault();
      const host=new URL(url).host;
      const intent=`intent://${host}${new URL(url).pathname}${new URL(url).search}#Intent;scheme=https;S.browser_fallback_url=${encodeURIComponent(url)};end`;
      window.location.href=intent;
    }else if(ios){
      // iOS keeps the normal HTTPS link as the safest fallback.
      e.currentTarget.href=url;
    }
  });

  return card;
}

PLATFORMS.filter(item => (item.previewImage || item.preview === 'ps') && LINKS[item.id]).forEach((item,index)=>root.appendChild(makeCard(item,index)));


