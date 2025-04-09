let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Evita que el navegador muestre su banner
  deferredPrompt = e;
  installBtn.hidden = false;

  installBtn.addEventListener('click', () => {
    installBtn.hidden = true;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('App instalada');
      }
      deferredPrompt = null;
    });
  });
});