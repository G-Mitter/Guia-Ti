// Arquivo: JS/status.js
document.addEventListener('DOMContentLoaded', function () {
    const areaStatus = document.getElementById('area-de-status');
    
    // Suas Chaves
    const BIN_ID = '69bc5cc4c3097a1dd53ea62c'; 
    const API_KEY = '$2a$10$rUq7CDtC9n0BAD1QiZonbe81hzcDQASDdlwWRtYJTv7CTjYzAYm0i';

    // Montando a URL de forma segura (sem usar crases)
    const urlBusca = 'https://api.jsonbin.io/v3/b/' + BIN_ID + '/latest';

    // Busca o status na nuvem
    fetch(urlBusca, {
        method: 'GET',
        headers: {
            'X-Access-Key': API_KEY
        }
    })
    .then(resposta => resposta.json())
    .then(dados => {
        const statusSalvo = dados.record; 
        renderizarStatus(statusSalvo);
    })
    .catch(erro => {
        console.error("Erro ao buscar status:", erro);
        renderizarStatus({ estado: 'ok', mensagem: 'Sistemas operando normalmente.' });
    });

    // Função que desenha a caixa na tela
    function renderizarStatus(statusSalvo) {
        if (statusSalvo.estado === 'ok') {
            areaStatus.innerHTML = `
                <div class="status-container">
                    <div class="status-box status-ok">
                        <span class="status-icon">✔</span>
                        <span class="status-message">${statusSalvo.mensagem}</span>
                    </div>
                </div>
            `;
        } else {
            areaStatus.innerHTML = `
                <div class="status-container">
                    <div class="status-box status-alert">
                        <span class="status-icon">⚠️</span>
                        <span class="status-message">${statusSalvo.mensagem}</span>
                    </div>
                </div>
            `;
        }
    }
});