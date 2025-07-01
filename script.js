// Dados fixos para o portfólio - mais seguro e rápido
const portfolioData = {
    totalViews: 30000, // Total de visualizações
    projectViews: 10000, // Visualizações por projeto
    projects: [
        { id: 'dQw4w9WgXcQ', views: 10000, title: 'Projeto Comercial' },
        { id: 'C0DPdy98e4c', views: 10000, title: 'Conteúdo para Redes Sociais' },
        { id: 'TZl00fqZI1I', views: 10000, title: 'Vídeo Corporativo' }
    ]
};

// Loading Screen
document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simular carregamento
    setTimeout(function() {
        loadingScreen.classList.add('hidden');
        initializeAnimations();
        initializeNavigation();
        initializePortfolioFilters();
        initializeSkillBars();
        initializeScrollEffects();
    }, 1500);

    carregarVisualizacoes();
});

// Navegação
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle menu mobile
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth scroll e fechamento do menu
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                // Fechar menu mobile
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Navbar background no scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 0, 21, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 0, 21, 0.95)';
        }
    });
}

// Filtros do Portfolio
function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona active no botão clicado
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}


// Animação das barras de habilidades
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.getAttribute('data-level');
                setTimeout(() => {
                    skillBar.style.width = level + '%';
                }, 200);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => observer.observe(bar));
}

// Efeitos de scroll
function initializeScrollEffects() {
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => scrollObserver.observe(el));
}

// Inicializar animações
function initializeAnimations() {
    // Adicionar classes de animação aos elementos
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    
    if (heroTitle) {
        heroTitle.style.animation = 'slideInLeft 1s ease 0.2s both';
    }
    if (heroSubtitle) {
        heroSubtitle.style.animation = 'slideInLeft 1s ease 0.4s both';
    }
    if (heroDescription) {
        heroDescription.style.animation = 'slideInLeft 1s ease 0.6s both';
    }

    // Adicionar classes animate-on-scroll aos elementos
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id !== 'home') {
            section.classList.add('animate-on-scroll');
        }
    });
}

// Função para copiar Discord
function copyDiscord() {
    const discord = '.rafa_apenas';
    navigator.clipboard.writeText(discord).then(() => {
        // Criar notificação personalizada
        showNotification('Discord copiado para a área de transferência! 🎉');
    }).catch(() => {
        // Fallback para navegadores mais antigos
        const textArea = document.createElement('textarea');
        textArea.value = discord;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Discord copiado para a área de transferência! 🎉');
    });
}

// Função para mostrar notificações
function showNotification(message) {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #25d366, #128c7e);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Função para carregar visualizações com dados fixos (mais seguro e rápido)
function carregarVisualizacoes() {
    const totalViews = portfolioData.totalViews;
    const projectViews = portfolioData.projectViews;

    // Atualizar contadores individuais com animação
    const viewCountElements = document.querySelectorAll('.view-count');
    viewCountElements.forEach((element, index) => {
        setTimeout(() => {
            // Animar contagem individual
            animateCounter(element, projectViews);
        }, index * 200);
    });

    // Mostrar total com animação
    const totalViewElem = document.getElementById('total-views');
    if (totalViewElem) {
        setTimeout(() => {
            animateCounter(totalViewElem, totalViews);
        }, 800);
    }
}

// Função para animar contadores
function animateCounter(element, targetValue) {
    let currentCount = 0;
    const increment = targetValue / 50;
    
    const countAnimation = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetValue) {
            currentCount = targetValue;
            clearInterval(countAnimation);
        }
        element.textContent = Math.floor(currentCount).toLocaleString();
    }, 30);
}

// Adicionar CSS para as animações da notificação
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(notificationStyles);
