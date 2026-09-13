(() => {
  const splash=document.getElementById('appSplash');if(!splash)return;
  const reduce=matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  const seen=sessionStorage.getItem('partyplay.splash.v1');
  if(seen){splash.remove();return}
  sessionStorage.setItem('partyplay.splash.v1','1');
  const delay=reduce?180:1050;
  setTimeout(()=>{splash.classList.add('leaving');setTimeout(()=>splash.remove(),reduce?80:360)},delay);
})();
