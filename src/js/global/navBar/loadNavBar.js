// js/global/loadNavBar.js
import { setupDynamicNavigation } from '../../utils/pageLoader.js';

export async function loadNavBar() {
  try {
    const response = await fetch('./components/navBar/navBar.html');
    const html = await response.text();
    document.getElementById('nav-placeholder').innerHTML = html;

    setupDynamicNavigation();

    const script = document.createElement('script');
    script.src = './js/global/navBar/navBar.js';
    document.body.appendChild(script);
  } catch (err) {
    console.error('Erro ao carregar a navbar:', err);
  }
}
