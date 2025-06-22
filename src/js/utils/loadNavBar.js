export async function loadNavBar() {
 const placeholder = document.getElementById('menu-placeholder');
 const res = await fetch('./components/navBar.html');
 const html = await res.text();
 placeholder.innerHTML = html;

 // Importa o script de navegação e ativa
 const navBarScript = document.createElement('script');
 navBarScript.src = './js/global/navBar/navBar.js';
 document.body.appendChild(navBarScript);
}