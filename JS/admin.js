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

    // SENHA DO PAINEL (Lembre-se: em frontend isso não é 100% seguro contra hackers, mas serve para usuários comuns)
    const SENHA_CORRETA = "1234";

    // Lógica de Login
    btnEntrar.addEventListener('click', function () {
        if (inputSenha.value === SENHA_CORRETA) {
            telaLogin.style.display = 'none';
            painelControle.style.display = 'block';
            carregarDadosAtuais(); // Carrega o que já está salvo
        } else {
            msgErro.style.display = 'block';
        }
    });

    // Função para preencher o painel com o status atual
    function carregarDadosAtuais() {
        const statusSalvo = JSON.parse(localStorage.getItem('guiaTiStatus'));
        if (statusSalvo) {
            seletorStatus.value = statusSalvo.estado;
            textoMensagem.value = statusSalvo.mensagem !== 'Sistemas operando normalmente.' ? statusSalvo.mensagem : '';
        }
    }

    // Lógica de Salvar
    btnSalvar.addEventListener('click', function () {
        const estadoEscolhido = seletorStatus.value;
        let mensagemEscolhida = textoMensagem.value.trim();

        // Se o cara escolheu OK e deixou o texto em branco, coloca a mensagem padrão
        if (estadoEscolhido === 'ok' && mensagemEscolhida === '') {
            mensagemEscolhida = 'Sistemas operando normalmente.';
        } 
        // Se escolheu Erro e deixou em branco
        else if (estadoEscolhido === 'erro' && mensagemEscolhida === '') {
            mensagemEscolhida = 'Sistema com instabilidade. A equipe de TI já está atuando.';
        }

        const novoStatus = {
            estado: estadoEscolhido,
            mensagem: mensagemEscolhida.replace(/\n/g, '<br>') // Troca quebras de linha por <br> do HTML
        };

        // Salva na memória
        localStorage.setItem('guiaTiStatus', JSON.stringify(novoStatus));

        // Mostra mensagem de sucesso
        msgSucesso.style.display = 'block';
        setTimeout(() => {
            msgSucesso.style.display = 'none';
        }, 3000);
    });
});