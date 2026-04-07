// Arquivo: JS/admin.js
document.addEventListener('DOMContentLoaded', function () {
    const telaLogin = document.getElementById('tela-login');
    const painelControle = document.getElementById('painel-controle');
    const inputSenha = document.getElementById('senha-admin');
    const btnEntrar = document.getElementById('btn-entrar');
    const msgErro = document.getElementById('msg-erro');

    const seletorStatus = document.getElementById('seletor-status');
    const textoMensagem = document.getElementById('texto-mensagem');
    const btnSalvar = document.getElementById('btn-salvar');
    const msgSucesso = document.getElementById('msg-sucesso');

    const SENHA_CORRETA = "1234";

    // Suas chaves
    const BIN_ID = '69bc5cc4c3097a1dd53ea62c'; 
    const API_KEY = '$2a$10$rUq7CDtC9n0BAD1QiZonbe81hzcDQASDdlwWRtYJTv7CTjYzAYm0i';

    // Login
    btnEntrar.addEventListener('click', function () {
        if (inputSenha.value === SENHA_CORRETA) {
            telaLogin.style.display = 'none';
            painelControle.style.display = 'block';
            carregarDadosAtuais();
        } else {
            msgErro.style.display = 'block';
        }
    });

    // Busca o status atual da nuvem
    function carregarDadosAtuais() {
        const urlBusca = 'https://api.jsonbin.io/v3/b/' + BIN_ID + '/latest';
        
        fetch(urlBusca, {
            method: 'GET',
            headers: { 'X-Access-Key': API_KEY }
        })
        .then(resposta => resposta.json())
        .then(dados => {
            const statusSalvo = dados.record;
            seletorStatus.value = statusSalvo.estado;
            textoMensagem.value = statusSalvo.mensagem !== 'Sistemas operando normalmente.' ? statusSalvo.mensagem.replace(/<br>/g, '\n') : '';
        });
    }

    // Lógica de Salvar na Nuvem (PUT)
    btnSalvar.addEventListener('click', function () {
        const estadoEscolhido = seletorStatus.value;
        let mensagemEscolhida = textoMensagem.value.trim();

        if (estadoEscolhido === 'ok' && mensagemEscolhida === '') {
            mensagemEscolhida = 'Sistemas operando normalmente.';
        } else if (estadoEscolhido === 'erro' && mensagemEscolhida === '') {
            mensagemEscolhida = 'Sistema com instabilidade. A equipe de TI já está atuando.';
        }

        const novoStatus = {
            estado: estadoEscolhido,
            mensagem: mensagemEscolhida.replace(/\n/g, '<br>')
        };

        btnSalvar.textContent = "Salvando...";

        const urlSalvar = 'https://api.jsonbin.io/v3/b/' + BIN_ID;

        // Envia para o JSONBin
        fetch(urlSalvar, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            },
            body: JSON.stringify(novoStatus)
        })
        .then(resposta => resposta.json())
        .then(dados => {
            btnSalvar.textContent = "Salvar Alterações";
            msgSucesso.style.display = 'block';
            setTimeout(() => { msgSucesso.style.display = 'none'; }, 3000);
        })
        .catch(erro => {
            alert("Erro ao salvar no servidor. Tente novamente.");
            btnSalvar.textContent = "Salvar Alterações";
            console.error(erro);
        });
    });
});