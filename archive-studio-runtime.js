/* 26.1.3 — Single-authority post-completion Memory Book link.
   Complete Trip status belongs to complete-runtime.js only. */
(function(root){'use strict';
 const cfg=root.TRIP_CONFIG||{};
 const key=String(cfg.storageNamespace||'trip')+':archive_settings:v1';
 const initialUrl=String((cfg.archive&&cfg.archive.memoryUrl)||'');
 function get(){
   try{const value=JSON.parse(localStorage.getItem(key)||'null');
     return {memoryUrl:value&&typeof value.memoryUrl==='string'?value.memoryUrl:initialUrl};
   }catch(e){return {memoryUrl:initialUrl};}
 }
 function safeUrl(value){try{const u=new URL(value);return /^(https?:)$/.test(u.protocol)?u.href:'';}catch(e){return '';}}
 function isCompleted(){return typeof root.isTripCompleted==='function'&&root.isTripCompleted()===true;}
 function isAdmin(){return typeof root.isAdminMode==='function'&&root.isAdminMode()===true;}
 function updateHome(){
   const button=document.getElementById('homeTodayButton');if(!button)return;
   if(!button.dataset.dayHref){button.dataset.dayHref=button.getAttribute('href')||'day.html?day=1';button.dataset.dayLabel=button.textContent||'Open Day';}
   const url=isCompleted()?safeUrl(get().memoryUrl):'';
   if(url){button.href=url;button.target='_blank';button.rel='noopener noreferrer';button.textContent='📖 Our Memories';}
   else{button.href=button.dataset.dayHref;button.removeAttribute('target');button.removeAttribute('rel');button.textContent=button.dataset.dayLabel;}
 }
 function refresh(){
   const section=document.getElementById('studioArchiveForm');
   if(section){section.hidden=!isCompleted();section.elements.memoryUrl.value=get().memoryUrl;}
   updateHome();
 }
 function inject(){
   const host=document.getElementById('tripStudioManagement');
   if(!host||document.getElementById('studioArchiveForm')){refresh();return;}
   const section=document.createElement('form');section.id='studioArchiveForm';section.className='booking-edit-form';
   section.innerHTML='<h4>📖 Memory Book</h4><p class="trip-studio-copy">Add your finished trip flipbook link. It will appear on Home once saved.</p><label class="booking-edit-field"><span>Memory Book URL</span><input name="memoryUrl" type="url" placeholder="https://heyzine.com/flip-book/…"></label><button class="pill" type="submit">Save Memory Book Link</button><small>Stored on this device in Beta. Does not sync across devices.</small>';
   host.appendChild(section);
   section.onsubmit=function(e){e.preventDefault();if(!isAdmin()||!isCompleted())return;
     const typed=section.elements.memoryUrl.value.trim();const normalized=typed?safeUrl(typed):'';
     if(typed&&!normalized){alert('Enter a valid HTTP(S) URL');return;}
     try{localStorage.setItem(key,JSON.stringify({memoryUrl:normalized}));updateHome();alert('Memory Book link saved on this device');}
     catch(error){alert('Could not save: '+error.message);}
   };
   refresh();
 }
 function schedule(){setTimeout(inject,0);}
 document.addEventListener('travelengine:adminmodechange',schedule);
 document.addEventListener('travelengine:tripcompleted',schedule);
 document.addEventListener('travelengine:tripreopened',schedule);
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
})(globalThis);
