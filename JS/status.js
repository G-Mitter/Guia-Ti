// Arquivo: JS/status.js
document.addEventListener('DOMContentLoaded', function () {
    const areaStatus = document.getElementById('area-de-status');
    
    // COLOQUE SUAS CHAVES AQUI
    const BIN_ID = '69bc5cc4c3097a1dd53ea62c'; 
    const API_KEY = '$2a$10$rUq7CDtC9n0BAD1QiZonbe81hzcDQASDdlwWRtYJTv7CTjYzAYm0i';

    // Busca o status na nuvem
    fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        method: 'GET',
        headers: {
            'X-Access-Key': API_KEY
        }
    })
    .then(resposta => resposta.json())
    .then(dados => {
        const statusSalvo = dados.record; // O JSONBin guarda nossos dados dentro de "record"
        renderizarStatus(statusSalvo);
    })
    .catch(erro => {
        console.error("Erro ao buscar status:", erro);
        // Se a internet falhar, assume que está tudo OK para não assustar os usuários
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