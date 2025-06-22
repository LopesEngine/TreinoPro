export function setupDynamicNavigation({ reloadMode = false } = {}) {
  const links = document.querySelectorAll('.textNavBar[data-page]');
  const mainContent = document.getElementById('main-content');

  async function loadPage(page) {
    try {
      const response = await fetch(page);
      const html = await response.text();
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;

      const newMain = tempDiv.querySelector('main');
      if (newMain && mainContent) {
        mainContent.innerHTML = newMain.innerHTML;
      } else {
        mainContent.innerHTML = '<p>Conteúdo não encontrado.</p>';
      }
    } catch (error) {
      console.error('Erro ao carregar a página:', error);
      mainContent.innerHTML = '<p>Erro ao carregar a página.</p>';
    }
  }

  links.forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      if (!page) return;

      if (reloadMode) {
        history.pushState({ page }, '', page);
        location.reload();
      } else {
        await loadPage(page);
        history.pushState({ page }, '', page);
      }
    });
  });

  window.addEventListener('popstate', async (event) => {
    if (event.state && event.state.page && !reloadMode) {
      await loadPage(event.state.page);
    } else {
      location.reload();
    }
  });
}
