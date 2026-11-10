/* Travel Engine 26.0.0 — typed-cache and offline image integrity. */
const CACHE='companion-mero-family-seoul-2027-2611-7d2e247e2c96-184a42e102b8';
const SHELL=['./','./index.html','./styles.css','./icon-192.png','./icon-512.png','./trip-logo.png?v=7d2e247e2c96'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;
  if(request.mode==='navigate'){
    event.respondWith(fetch(request).then(response=>{
      if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)));}
      return response;
    }).catch(async()=>await caches.match(request)||await caches.match('./index.html')||Response.error()));
    return;
  }
  // For images, scripts and styles an HTML document is NEVER a valid fallback.
  event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{
    if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)));}
    return response;
  })));
});
