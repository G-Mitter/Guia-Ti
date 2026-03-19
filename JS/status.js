// Arquivo: JS/status.js
document.addEventListener('DOMContentLoaded', function () {
    const areaStatus = document.getElementById('area-de-status');
    
    // Busca o status salvo. Se não tiver nada, assume que está tudo OK.
    const statusSalvo = JSON.parse(localStorage.getItem('guiaTiStatus')) || {
        estado: 'ok',
        mensagem: 'Sistemas operando normalmente.'
    };

    // Monta o HTML dependendo do estado
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
});