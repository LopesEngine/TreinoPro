function toggleMenu() {
  const nav = document.getElementById('navBar');
  const hamburger = document.getElementById('hamburger');
  
  nav.classList.toggle('show');
  hamburger.classList.toggle('active');
 
  if (nav.classList.contains('show')) {
    hamburger.innerHTML = '✖'; // Quando o menu abre
  } else {
    hamburger.innerHTML = '☰'; // Quando fecha
  }
 }