var C='navexpertzp-1-v1.1.1',F=['./','./index.html','./v2.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon.svg'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
/* páginas HTML: rede primeiro (sempre a versão nova), cache só como reserva offline; demais arquivos: cache primeiro */
self.addEventListener('fetch',function(e){
 var r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 var html=r.mode==='navigate'||/\.html?$/.test(new URL(r.url).pathname)||new URL(r.url).pathname.slice(-1)==='/';
 if(html){e.respondWith(fetch(r).then(function(n){var cp=n.clone();caches.open(C).then(function(c){c.put(r,cp)});return n}).catch(function(){return caches.match(r).then(function(m){return m||caches.match('./index.html')})}));return}
 e.respondWith(caches.match(r).then(function(m){return m||fetch(r).then(function(n){var cp=n.clone();caches.open(C).then(function(c){c.put(r,cp)});return n})}))});
