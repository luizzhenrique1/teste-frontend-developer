document.addEventListener('DOMContentLoaded', () => {
    const compactChart = document.getElementById('compact-chart');
    const balanceValue = document.getElementById('balance-value');
    
    if (compactChart) {
        // Dados para as barras do dashboard compacto
        const data = [40, 70, 45, 90, 65, 80, 55, 100, 75, 85];
        
        data.forEach((height, index) => {
            const bar = document.createElement('div');
            bar.style.height = '0%';
            bar.style.width = '100%';
            bar.style.backgroundColor = index === data.length - 1 ? '#0066FF' : '#E2E8F0';
            bar.style.borderRadius = '4px';
            bar.style.transition = `height 1s ease-out ${index * 0.1}s`;
            
            compactChart.appendChild(bar);
            
            // Disparar animação de crescimento
            setTimeout(() => {
                bar.style.height = `${height}%`;
            }, 100);
        });
    }

    // Animação de contador simples para o saldo
    if (balanceValue) {
        let current = 0;
        const target = 45280;
        const duration = 2000;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            balanceValue.innerText = `R$ ${Math.floor(current).toLocaleString('pt-BR')},00`;
        }, stepTime);
    }
});
