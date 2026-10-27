// Lê o aviso do arquivo status.json (edite o arquivo no GitHub para trocar o aviso).
// "estado": "ok" mostra verde; qualquer outro valor (ex: "erro") mostra alerta vermelho.
document.addEventListener('DOMContentLoaded', function () {
    const areaStatus = document.getElementById('area-de-status');
    if (!areaStatus) return;

    fetch('status.json', { cache: 'no-store' })
        .then(res => res.json())
        .then(({ estado, mensagem }) => {
            const ok = estado === 'ok';
            const container = document.createElement('div');
            const box = document.createElement('div');
            const icone = document.createElement('span');
            const texto = document.createElement('span');

            container.className = 'status-container';
            box.className = 'status-box ' + (ok ? 'status-ok' : 'status-alert');
            icone.className = 'status-icon';
            icone.textContent = ok ? '✔' : '⚠️';
            texto.className = 'status-message';
            texto.style.whiteSpace = 'pre-line'; // quebras de linha (\n) da mensagem
            texto.textContent = mensagem; // texto puro: nunca interpretado como HTML

            box.append(icone, texto);
            container.appendChild(box);
            areaStatus.appendChild(container);
        })
        .catch(err => console.error('Erro ao carregar status:', err));
});
