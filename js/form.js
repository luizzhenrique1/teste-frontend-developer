document.addEventListener('DOMContentLoaded', () => {
    const leadForm = document.getElementById('lead-form');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = leadForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'ENVIANDO...';
            btn.disabled = true;

            // Simulação de chamada de API para captura de leads
            setTimeout(() => {
                btn.innerText = 'SUCESSO!';
                btn.style.backgroundColor = '#10b981';

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                    leadForm.reset();
                }, 3000);
            }, 1500);
        });
    }
});
