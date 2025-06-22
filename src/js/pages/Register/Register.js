//Importa toggle-password
import { mostrarSenha } from "../../global/toggle-password/mostrarSenha.js";

mostrarSenha();

const form = document.getElementById('form-register');
const mensagem = document.getElementById('mensagem-register');


//Previne que a página recarregue após o envio do formulário
form.addEventListener('submit', function (e) {
    e.preventDefault();
    //Atribui constantes e pega o valores do campos preenchidos
    const nome = document.getElementById('form-name').value.trim();
    const sobrenome = document.getElementById('form-surname').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const senha = document.getElementById('form-senha').value.trim();
    const confirmaSenha = document.getElementById('form-confirma-senha').value.trim();


    //Vê se os campos estão preenchidos
    if (!nome || !sobrenome || !email || !senha || !confirmaSenha) {
        mensagem.textContent = 'Preencha todos os campos!';
        mensagem.style.color = 'red';
        return;
    }
    //atribui restrições para a criação de uma senha
    const caractereEspecial = /[!@#$%^&*(),.?":{}|<>]/;
    const letraMaiuscula = /[A-Z]/;
    const umNumero = /[0-9]/;

    if (senha.length < 6) {
        mensagem.textContent = 'A senha deve conter ao menos 6 caracteres.';
        mensagem.style.color = 'red';
        return;
    }
    if (!caractereEspecial.test(senha)) {
        mensagem.textContent = 'A senha de conter ao menos um caractere especial (!@#$%^&*(),.?":{}|<>)';
        mensagem.style.color = 'red';
        return;
    }
    if (!letraMaiuscula.test(senha)) {
        mensagem.textContent = 'A senha de conter ao menos uma letra maiúscula';
        mensagem.style.color = 'red';
        return;
    }
    if (!umNumero.test(senha)) {
        mensagem.textContent = 'A senha de conter ao menos um número';
        mensagem.style.color = 'red';
        return;
    }


    //Verifica se os dados batem e salva no localStorage
    if (senha != confirmaSenha) {
        mensagem.textContent = 'As senha não coincidem!';
        mensagem.style.color = 'red';
        return;

    }
    const usuario = {
        nome,
        sobrenome,
        email,
        senha
    };
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const emailExiste = usuarios.some(u => u.email === email);

    if (emailExiste) {
        mensagem.textContent = 'Já existe um usuário com esse e-mail!';
        mensagem.style.color = 'red';
        return;
    }

    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    mensagem.textContent = 'Cadastro Realizado com sucesso!';
    mensagem.style.color = 'green';

    form.reset();
    //redireciona para a pagina de login após o cadastro
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);


});

//Inicia a página com foco no campo a ser preenchido
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("form-name").focus();
});