// Параллакс-эффект для карточки
document.addEventListener('mousemove', (e) => {
    const card = document.querySelector('.card');
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateY(-10px)`;
});

// Анимация кнопок
document.querySelectorAll('a').forEach(button => {
    button.addEventListener('click', () => {
        button.style.transform = 'scale(0.95) translateY(2px)';
        setTimeout(() => {
            button.style.transform = 'scale(1) translateY(-4px)';
        }, 200);
    });
});

// Улучшенная генерация частиц
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 80;
    
    // Очистка предыдущих частиц
    container.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Случайные параметры
        const size = Math.random() * 8 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const animationDuration = Math.random() * 25 + 15;
        const animationDelay = Math.random() * 5;
        const hue = Math.floor(Math.random() * 60) + 180;
        const blur = Math.random() * 10 + 5;
        
        // Уникальное имя анимации
        const animationName = `float-${i}`;
        
        // Создаем ключевые кадры
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes ${animationName} {
                0% { transform: translate(0, 0); }
                25% { transform: translate(${Math.random()*100-50}px, ${Math.random()*100-50}px); }
                50% { transform: translate(${Math.random()*150-75}px, ${Math.random()*150-75}px); }
                75% { transform: translate(${Math.random()*100-50}px, ${Math.random()*100-50}px); }
                100% { transform: translate(0, 0); }
            }
        `;
        document.head.appendChild(style);
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
            top: ${posY}%;
            background: hsla(${hue}, 100%, 70%, ${Math.random()*0.3 + 0.1});
            border-radius: 50%;
            box-shadow: 0 0 ${blur}px hsla(${hue}, 100%, 70%, 0.4);
            animation: ${animationName} ${animationDuration}s ease-in-out ${animationDelay}s infinite;
            z-index: -1;
        `;
        
        container.appendChild(particle);
    }
}

// Перегенерация частиц при изменении размера окна
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        createParticles();
    }, 500);
});

// Инициализация
window.addEventListener('load', () => {
    createParticles();
    
    // Задержка для плавного появления
    setTimeout(() => {
        document.querySelector('.card').style.opacity = '1';
    }, 300);
});