document.addEventListener('DOMContentLoaded', () => {
 const links = document.querySelectorAll('.textNavBar[data-page]');
 const mainContent = document.getElementById('main-content');

 links.forEach(link => {
   link.addEventListener('click', async (e) => {
     e.preventDefault();
     const page = link.getAttribute('data-page');
     const response = await fetch(page);
     const html = await response.text();

     // Extrai o conteúdo entre <main> e </main>
     const tempDiv = document.createElement('div');
     tempDiv.innerHTML = html;
     const newMain = tempDiv.querySelector('main');
     if (newMain) {
       mainContent.innerHTML = newMain.innerHTML;
     } else {
       mainContent.innerHTML = "<p>Conteúdo não encontrado.</p>";
     }

     history.pushState(null, '', page);
   });
 });

 window.addEventListener('popstate', () => {
   location.reload(); // ou criar função que recarregue a página anterior
 });
});