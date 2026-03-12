// Arquivo: exportar-pdf.js

document.getElementById('btn-gerar-pdf').addEventListener('click', function () {
    // Seleciona apenas a área do conteúdo da solução
    const elemento = document.getElementById('conteudo-pdf');

    // Configurações aprimoradas do PDF
    const opcoes = {
        margin: 10, // Margem em milímetros
        filename: 'solucao-pdv-guia-ti.pdf',
        image: { type: 'jpeg', quality: 0.98 },

        // scrollY: 0 resolve o problema das páginas em branco
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },

        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },

        // Evita que imagens e textos sejam cortados na quebra de página
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Gera e faz o download do PDF
    html2pdf().set(opcoes).from(elemento).save();
});