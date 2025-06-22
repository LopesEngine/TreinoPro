document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll('input[type="checkbox"]');
  const cards = document.querySelectorAll('.exercise-card');

  // Filtros
  filters.forEach(filter => {
    filter.addEventListener('change', () => {
      const activeEquip = Array.from(document.querySelectorAll('#equip-filters input:checked')).map(i => i.value);
      const activeTipo = Array.from(document.querySelectorAll('#tipo-filters input:checked')).map(i => i.value);
      const activeMusculo = Array.from(document.querySelectorAll('#musculo-filters input:checked')).map(i => i.value);

      cards.forEach(card => {
        const matchesEquip = activeEquip.some(e => card.classList.contains(e));
        const matchesTipo = activeTipo.some(t => card.classList.contains(t));
        const matchesMusculo = activeMusculo.some(m => card.classList.contains(m));

        card.style.display = (matchesEquip && matchesTipo && matchesMusculo) ? 'block' : 'none';
      });
    });
  });

  // Expansão dos detalhes do exercício
  cards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('active');
    });
  });
});
