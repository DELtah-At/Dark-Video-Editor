const apiKey = 'AIzaSyDZMZ3ATakqiboaZL_BIv1-WTiZx0WC1DE';
const videoIds = ['dQw4w9WgXcQ', 'C0DPdy98e4c', 'TZl00fqZI1I'];

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

// Função para carregar visualizações do YouTube
async function carregarVisualizacoes() {
    let totalViews = 0;

    for (const id of videoIds) {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=${apiKey}`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            
            if (data.items && data.items.length > 0) {
                const visualizacoes = parseInt(data.items[0].statistics.viewCount);
                totalViews += visualizacoes;

                // Atualizar contadores individuais
                const viewCountElements = document.querySelectorAll('.view-count');
                viewCountElements.forEach((element, index) => {
                    if (index < videoIds.length) {
                        setTimeout(() => {
                            element.textContent = visualizacoes.toLocaleString();
                        }, index * 200);
                    }
                });
            }
        } catch (erro) {
            console.error(`Erro ao carregar vídeo ${id}:`, erro);
        }
    }

    // Mostrar total com animação
    const totalViewElem = document.getElementById('total-views');
    if (totalViewElem) {
        // Animação de contagem
        let currentCount = 0;
        const increment = totalViews / 50;
        
        const countAnimation = setInterval(() => {
            currentCount += increment;
            if (currentCount >= totalViews) {
                currentCount = totalViews;
                clearInterval(countAnimation);
            }
            totalViewElem.textContent = Math.floor(currentCount).toLocaleString();
        }, 50);
    }
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
