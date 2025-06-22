// Importa o módulo de mostrar/ocultar senha
import { mostrarSenha } from "../../global/toggle-password/mostrarSenha.js";

mostrarSenha();

const formLogin = document.getElementById('form-login');
const mensagemLogin = document.getElementById('mensagem-login');

// Previne que a página recarregue após o envio do formulário
formLogin.addEventListener('submit', function (event) {
    event.preventDefault();

    // Captura os valores dos campos
    const email = document.getElementById('form-email').value.trim();
    const senha = document.getElementById('form-senha').value.trim();

    // Verifica se todos os campos foram preenchidos
    if (email === '' || senha === '') {
        mensagemLogin.textContent = 'Preencha todos os campos!';
        mensagemLogin.style.color = 'red';
        return;
    }

    // Recupera os usuários do localStorage
    let usuarios = [];
    try {
        usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    } catch (e) {
        console.error("Erro ao ler localStorage:", e);
    }

    // Verifica se existe um usuário válido
    const usuarioValido = usuarios.find(user => user.email === email && user.senha === senha);

    if (!usuarioValido) {
        mensagemLogin.textContent = 'E-mail ou senha incorretos!';
        mensagemLogin.style.color = 'red';
        return;
    }

    // Login bem-sucedido
    mensagemLogin.textContent = 'Login realizado com sucesso!';
    mensagemLogin.style.color = 'green';
    formLogin.reset();

    // Redireciona após 2 segundos
    setTimeout(() => {
        window.location.href = 'exerciseList.html';
    }, 2000);
});

// Ao carregar a página, foca no campo de e-mail
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("form-email").focus();
});
