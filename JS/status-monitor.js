// JS/status-monitor.js
document.addEventListener('DOMContentLoaded', function () {
    const statusContainer = document.querySelector('.status-container');
    const BIN_ID = '69bc5cc4c3097a1dd53ea62c';
    const API_KEY = '$2a$10$rUq7CDtC9n0BAD1QiZonbe81hzcDQASDdlwWRtYJTv7CTjYzAYm0i';

    function atualizarStatusNoSite() {
        fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: { 'X-Access-Key': API_KEY }
        })
        .then(res => res.json())
        .then(dados => {
            const { estado, mensagem } = dados.record;
            aplicarLayoutStatus(estado, mensagem);
        })
        .catch(err => console.error("Erro ao carregar status:", err));
    }

    function aplicarLayoutStatus(estado, mensagem) {
        // Limpa o conteúdo atual
        statusContainer.innerHTML = '';

        const divBox = document.createElement('div');
        const spanIcon = document.createElement('span');
        const spanMsg = document.createElement('span');

        spanIcon.className = 'status-icon';
        spanMsg.className = 'status-message';
        spanMsg.innerHTML = mensagem; // Permite o <br> enviado pela admin

        if (estado === 'ok') {
            divBox.className = 'status-box status-ok';
            spanIcon.textContent = '✔';
        } else {
            divBox.className = 'status-box status-alert';
            spanIcon.textContent = '⚠️';
        }

        divBox.appendChild(spanIcon);
        divBox.appendChild(spanMsg);
        statusContainer.appendChild(divBox);
    }

    atualizarStatusNoSite();
});
document.addEventListener('DOMContentLoaded', function() {
    const areaStatus = document.getElementById('area-de-status');
    
    // Altere para false para simular um aviso de erro
    const sistemasOk = true; 

    if (sistemasOk) {
        areaStatus.innerHTML = `
            <div class="status-container">
                <div class="status-box status-ok">
                    <span class="status-icon">✔</span>
                    <span class="status-message">Sistemas operando normalmente.</span>
                </div>
            </div>`;
    } else {
        areaStatus.innerHTML = `
            <div class="status-container">
                <div class="status-box status-alert">
                    <span class="status-icon">⚠️</span>
                    <span class="status-message">Aviso: Instabilidade no sistema Linear.</span>
                </div>
            </div>`;
    }
});