export async function carregarBotaoSair() {
  try {
    // Corrige o caminho com base em /index.html
    const response = await fetch('./components/logoutButton/logoutButton.html');
    const html = await response.text();

    const container = document.createElement('div');
    container.innerHTML = html;

    const botaoSair = container.querySelector('#btn-sair');
    if (!botaoSair) {
      console.error('Botão "Sair" não encontrado no HTML carregado.');
      return;
    }

    // Aplica o CSS externamente
    const estilo = document.createElement('link');
    estilo.rel = 'stylesheet';
    estilo.href = './css/global/logoutButton/logoutButton.css';
    document.head.appendChild(estilo);

    // Ações do botão
    botaoSair.addEventListener('click', () => {
      localStorage.removeItem('usuarioLogado');
      window.location.href = 'login.html';
    });

    // Insere no body ou num local específico
    document.body.appendChild(botaoSair);

    console.log('Botão "Sair" carregado com sucesso!');
  } catch (error) {
    console.error('Erro ao carregar o botão "Sair":', error);
  }
}
