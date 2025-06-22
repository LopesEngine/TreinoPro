// ./js/pages/viewProfile/viewProfile.js

// Função para remover uma linha de exercício ou medida
window.removerLinha = function(botao) {
  const container = botao.closest('.registro-exercicio, .medida-item');
  if (container) container.remove();
};

// Adicionar novo exercício na lista
window.adicionarExercicio = function() {
  const container = document.getElementById('exercicios-container');
  const div = document.createElement('div');
  div.className = 'registro-exercicio';
  div.innerHTML = `
    <input type="text" placeholder="Exercício" />
    <input type="number" placeholder="Carga (kg)" min="0" />
    <input type="number" placeholder="Séries" min="1" />
    <input type="number" placeholder="Repetições" min="1" />
    <button class="btn-remover" onclick="removerLinha(this)">
      <span style="font-size: 15px; font-weight: bold; color: white;">X</span>
    </button>
  `;
  container.appendChild(div);
};

// Salvar progresso dos exercícios no histórico (localStorage)
window.salvarProgresso = function() {
  const dataTreino = document.getElementById('data-treino').value;
  if (!dataTreino) return alert('Por favor, selecione a data do treino.');

  const exercicios = [];
  const divs = document.querySelectorAll('#exercicios-container .registro-exercicio');

  for (const div of divs) {
    const [exercicio, carga, series, repeticoes] = div.querySelectorAll('input');
    if (!exercicio.value.trim()) return alert('Preencha o nome do exercício.');

    const cargaVal = carga.value.trim() ? Number(carga.value) : 0;
    const seriesVal = Number(series.value);
    const repVal = Number(repeticoes.value);

    if (seriesVal < 1 || repVal < 1) return alert('Séries e repetições devem ser pelo menos 1.');

    exercicios.push({
      exercicio: exercicio.value.trim(),
      carga: cargaVal,
      series: seriesVal,
      repeticoes: repVal
    });
  }

  if (exercicios.length === 0) return alert('Adicione pelo menos um exercício.');

  const historico = JSON.parse(localStorage.getItem('historicoProgresso') || '[]');
  historico.push({ dataTreino, exercicios });
  localStorage.setItem('historicoProgresso', JSON.stringify(historico));

  alert('Progresso salvo com sucesso!');
  atualizarHistoricoProgresso();
  document.getElementById('data-treino').value = '';
  document.querySelectorAll('#exercicios-container .registro-exercicio').forEach(div => {
    div.querySelectorAll('input').forEach(i => i.value = '');
  });
};

function atualizarHistoricoProgresso() {
  const container = document.getElementById('historico-progresso');
  container.innerHTML = '';

  const historico = JSON.parse(localStorage.getItem('historicoProgresso') || '[]');
  if (historico.length === 0) return container.innerHTML = '<p>Nenhum registro de progresso salvo.</p>';

  historico.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'historico-item';

    let exerciciosHTML = '<ul>';
    item.exercicios.forEach(ex => {
      exerciciosHTML += `<li>${ex.exercicio} - Carga: ${ex.carga}kg, Séries: ${ex.series}, Repetições: ${ex.repeticoes}</li>`;
    });
    exerciciosHTML += '</ul>';

    div.innerHTML = `<strong>Data: ${item.dataTreino}</strong>${exerciciosHTML}`;
    container.appendChild(div);
  });
}

window.adicionarMedida = function() {
  const container = document.getElementById('medidas-container');
  const div = document.createElement('div');
  div.className = 'medida-item';
  div.innerHTML = `
    <input type="text" placeholder="Parte do corpo" />
    <input type="number" placeholder="Medida (cm)" min="0" step="0.1" />
    <button class="btn-remover" onclick="removerLinha(this)">
      <span style="font-size: 15px; font-weight: bold; color: white;">X</span>
    </button>
  `;
  container.appendChild(div);
};

window.salvarMedicao = function() {
  const dataMedida = document.getElementById('data-medida').value;
  if (!dataMedida) return alert('Por favor, selecione a data da medição.');

  const medidas = [];
  const divs = document.querySelectorAll('#medidas-container .medida-item');

  for (const div of divs) {
    const [parte, medida] = div.querySelectorAll('input');
    if (!parte.value.trim()) return alert('Preencha a parte do corpo.');

    const medidaVal = Number(medida.value);
    if (!medida.value || medidaVal <= 0) return alert('Preencha uma medida válida.');

    medidas.push({ parte: parte.value.trim(), medida: medidaVal });
  }

  if (medidas.length === 0) return alert('Adicione pelo menos uma medida.');

  const historico = JSON.parse(localStorage.getItem('historicoMedidas') || '[]');
  historico.push({ dataMedida, medidas });
  localStorage.setItem('historicoMedidas', JSON.stringify(historico));

  alert('Medidas salvas com sucesso!');
  atualizarHistoricoMedidas();
  document.getElementById('data-medida').value = '';
  document.querySelectorAll('#medidas-container .medida-item').forEach(div => {
    div.querySelectorAll('input').forEach(i => i.value = '');
  });
};

function atualizarHistoricoMedidas() {
  const container = document.getElementById('historico-medidas');
  container.innerHTML = '';

  const historico = JSON.parse(localStorage.getItem('historicoMedidas') || '[]');
  if (historico.length === 0) return container.innerHTML = '<p>Nenhum registro de medidas salvo.</p>';

  historico.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'historico-item';

    let medidasHTML = '<ul>';
    item.medidas.forEach(med => {
      medidasHTML += `<li>${med.parte}: ${med.medida} cm</li>`;
    });
    medidasHTML += '</ul>';

    div.innerHTML = `<strong>Data: ${item.dataMedida}</strong>${medidasHTML}`;
    container.appendChild(div);
  });
}

// Exercícios base para geração da ficha de treino
const exerciciosBase = {
  '3x_semana': {
    emagrecimento: {
      TreinoA: ['Corrida leve 20min', 'Polichinelos 3x15', 'Abdominais 3x20'],
      TreinoB: ['Pular corda 10min', 'Burpees 3x12', 'Prancha 3x30s'],
      TreinoC: ['Bicicleta ergométrica 20min', 'Agachamento 3x15', 'Mountain climbers 3x20']
    },
    hipertrofia: {
      TreinoA: ['Supino reto 4x10', 'Remada curvada 4x10', 'Desenvolvimento 4x12'],
      TreinoB: ['Agachamento livre 4x10', 'Leg press 4x12', 'Stiff 4x12'],
      TreinoC: ['Rosca direta 4x12', 'Tríceps testa 4x12', 'Elevação lateral 4x15']
    },
    resistencia: {
      TreinoA: ['Circuito corrida 5km', 'Flexões 4x20', 'Agachamentos 4x20'],
      TreinoB: ['Corda naval 4x1min', 'Burpees 4x15', 'Abdominal bicicleta 4x25'],
      TreinoC: ['Escada de agilidade 4x', 'Prancha lateral 4x40s', 'Saltos pliométricos 4x15']
    }
  },
  '4x_ou_mais_semana': {
    emagrecimento: {
      TreinoA: ['Corrida intervalada 25min', 'Jumping jacks 4x20', 'Abdominal infra 4x25'],
      TreinoB: ['Pular corda 15min', 'Burpees 4x15', 'Prancha frontal 4x45s'],
      TreinoC: ['Bicicleta 25min', 'Agachamento com salto 4x20', 'Mountain climbers 4x30'],
      TreinoD: ['Elíptico 20min', 'Flexão de braço 4x25', 'Abdominal oblíquo 4x20']
    },
    hipertrofia: {
      TreinoA: ['Supino reto 4x10', 'Remada curvada 4x10', 'Desenvolvimento 4x12'],
      TreinoB: ['Agachamento livre 4x10', 'Leg press 4x12', 'Stiff 4x12'],
      TreinoC: ['Rosca direta 4x12', 'Tríceps testa 4x12', 'Elevação lateral 4x15'],
      TreinoD: ['Puxada frente 4x12', 'Crucifixo 4x12', 'Abdominal supra 4x25']
    },
    resistencia: {
      TreinoA: ['Circuito corrida 6km', 'Flexões 5x20', 'Agachamentos 5x20'],
      TreinoB: ['Corda naval 5x1min', 'Burpees 5x15', 'Abdominal bicicleta 5x30'],
      TreinoC: ['Escada de agilidade 5x', 'Prancha lateral 5x45s', 'Saltos pliométricos 5x20'],
      TreinoD: ['Corrida leve 30min', 'Jumping jacks 5x25', 'Abdominal infra 5x30']
    }
  }
};

window.selecionarNivel = function(nivel) {
  document.querySelectorAll('.nivel-btn').forEach(btn => btn.classList.remove('selected'));
  const nivelStr = String(nivel);
  const selecionado = [...document.querySelectorAll('.nivel-btn')].find(btn => btn.dataset.nivel === nivelStr);
  if (selecionado) selecionado.classList.add('selected');
  const rotina = document.getElementById('rotina-treino');
  if (rotina) rotina.dataset.frequencia = nivelStr;
  console.log('Frequência selecionada:', nivelStr);
};


window.gerarFichaTreino = function() {
  const rotinaSelect = document.getElementById('rotina-treino');
  const frequencia = rotinaSelect.dataset.frequencia || '3'; // pega do dataset

  const rotina = rotinaSelect.value;
  if (!rotina) return alert('Por favor, selecione o seu objetivo de treino.');
  if (!frequencia) return alert('Por favor, selecione a frequência de treino (3x ou 4x+ por semana).');

  const fichasContainer = document.getElementById('fichas-container');
  fichasContainer.innerHTML = '';

  const keyFrequencia = frequencia === '3' ? '3x_semana' : '4x_ou_mais_semana';

  if (!exerciciosBase[keyFrequencia] || !exerciciosBase[keyFrequencia][rotina]) {
    return alert('Combinação de frequência e rotina não encontrada.');
  }

  const treinos = exerciciosBase[keyFrequencia][rotina];

  Object.entries(treinos).forEach(([treinoNome, exercicios]) => {
    const card = document.createElement('div');
    card.className = 'card-treino';

    const titulo = document.createElement('h3');
    titulo.textContent = treinoNome;

    const lista = document.createElement('ul');
    exercicios.forEach(ex => {
      const li = document.createElement('li');
      li.textContent = ex;
      lista.appendChild(li);
    });

    card.appendChild(titulo);
    card.appendChild(lista);
    fichasContainer.appendChild(card);
  });
};
  

// Inicializar histórico na carga da página
document.addEventListener('DOMContentLoaded', () => {
  atualizarHistoricoProgresso();
  atualizarHistoricoMedidas();
});
