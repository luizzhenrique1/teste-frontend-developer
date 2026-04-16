document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica de Revelação Profissional (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    // Opções do Observer - threshold 0.15 indica visibilidade de 15% para disparar
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // Dispara um pouco antes de entrar totalmente
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe 'active' conforme solicitado
                entry.target.classList.add('active');
                
                // Revelação única: para de observar após ativar
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Efeito Cascata (Stagger) para Elementos de Grid
    const staggerContainers = ['.benefits__grid', '.faq__list'];
    
    staggerContainers.forEach(containerSelector => {
        const container = document.querySelector(containerSelector);
        if (container) {
            const children = container.children;
            Array.from(children).forEach((child, index) => {
                // Aplica atraso incremental (0.1s por item)
                child.style.transitionDelay = `${index * 0.1}s`;
                // Garante que os filhos tenham a classe reveal se não estiverem presentes
                if (!child.classList.contains('reveal')) {
                    child.classList.add('reveal');
                    revealObserver.observe(child);
                }
            });
        }
    });

    // 3. Lógica do Acordeão FAQ (Modificada para evitar conflitos de classe)
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const header = item.querySelector('.faq__header');
        header.addEventListener('click', () => {
            const isOpened = item.classList.contains('faq-opened');
            
            // Fecha todos os outros itens abertos
            faqItems.forEach(i => i.classList.remove('faq-opened'));
            
            // Alterna o estado do item atual
            if (!isOpened) {
                item.classList.add('faq-opened');
            }
        });
    });

    // 4. Mudança de fundo da Navbar ao rolar (scroll)
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }
    });

    // 5. Lógica de Scroll Spy (Destaque Automático da Navbar)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    const spyOptions = {
        threshold: 0.5 // Destaque quando 50% da seção estiver visível
    };

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove destaque de todos os links
                navLinks.forEach(link => {
                    link.classList.remove('nav__link--active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('nav__link--active');
                    }
                });
            }
        });
    }, spyOptions);

    sections.forEach(section => spyObserver.observe(section));
});
