<script>
  // Registro do Service Worker com detecção de atualização
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').then((reg) => {
        
        // Verifica se há uma atualização esperando
        reg.onupdatefound = () => {
          const installingWorker = reg.installing;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // Nova versão detectada! Recarrega a página sozinho
                console.log('Nova versão encontrada! Atualizando...');
                window.location.reload();
              }
            }
          };
        };

      }).catch((err) => console.log('Erro ao registrar SW:', err));
    });
  }

  // Lógica para recarregar se o Service Worker mudar
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      window.location.reload();
      refreshing = true;
    }
  });
</script>
