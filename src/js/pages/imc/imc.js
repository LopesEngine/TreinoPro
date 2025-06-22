function imcResultado(event) {
  const altura = parseFloat(
    document.getElementById("altura").value.replace(",", ".")
  );

  const peso = parseInt(document.getElementById("peso").value);

  const imc = parseFloat(peso / Math.pow(altura, 2)).toFixed(2);



  if (isNaN(peso) || isNaN(altura)){
    document.getElementById("imcvalor").innerText = "Por favor, preencha todos os campos corretamente.";
    return;
    }
  




  document.getElementById("imcvalor").innerText = imc;



  switch (true) {
    case imc < 18.5:
      classificacao = "Abaixo do peso";
      break;

    case imc >= 18.5 && imc < 24.9:
      classificacao = "Peso normal";
      break;

    case imc >= 25 && imc < 29.9:
      classificacao = "Sobrepeso";
      break;

    case imc >= 30:
      classificacao = "Obesidade";
      break;

    default:
      classificacao = "Valor invalido";
      break;
  }

  document.getElementById("classificacao").innerText = classificacao;

  event.preventDefault();
}

/* CALCULADORA DE MACRONUTRIENTES*/

function Macro(event){
  if (event) event.preventDefault();

  
  const sexo1 = document.getElementsByName("sexo");
  const idade = parseInt(document.getElementById("idade").value);
  const altura1 = parseFloat(document.getElementById("altura1").value); // cm
  const peso1 = parseFloat(document.getElementById("peso1").value); // kg
  const atividade = parseFloat(document.getElementById("atividade").value);
  const objetivo = document.getElementById("objetivo").value;



  let sexo = null;

 
  for (let i = 0; i < sexo1.length; i++) 
  if (sexo1[i].checked) {
    sexo = sexo1[i].value; 
    break;
  }

 
  if (
    (!sexo || isNaN(idade) || isNaN(altura1) ||
    isNaN(peso1))
  ) {
    document.getElementById("macroNutrientesResult").innerText = "Por favor, preencha todos os campos corretamente.";
    return;
  }

  
  let bmr;
  if (sexo === "masculino") {
    bmr = 10 * peso1 + 6.25 * altura1 - 5 * idade + 5;
  } else if (sexo === "feminino") {
    bmr = 10 * peso1 + 6.25 * altura1 - 5 * idade - 161;
  }

  const tde = bmr * atividade;
  let pesoObjetivo;

  switch (objetivo) {
    case "perder":
      pesoObjetivo = tde - (0.18 * tde);
      break;
    case "ganhar":
      pesoObjetivo = tde + (0.18 * tde);
      break;
    case "manter":
      pesoObjetivo = tde;
      break;
  }

 
  const proteinaG = (pesoObjetivo * 0.25) / 4;
  const carbo = (pesoObjetivo * 0.50) / 4;
  const gordura = (pesoObjetivo * 0.25) / 9;

  const resultado =
    `Calorias alvo: ${pesoObjetivo.toFixed(0)} kcal\n` +
    `Proteínas: ${proteinaG.toFixed(1)} g\n` +
    `Carboidratos: ${carbo.toFixed(1)} g\n` +
    `Gorduras: ${gordura.toFixed(1)} g`;
  
  document.getElementById("macroNutrientesResult").innerText = resultado;
}