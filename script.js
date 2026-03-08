// --- 1. ЛОГИКА ОТКРЫТИЯ ---
const intro = document.getElementById('intro-screen');
const btnConfirm = document.getElementById('confirm-button');

// Функция, которая срабатывает при нажатии на подарок
function openMagic() {
    document.body.classList.add('opened');
    
    // Запускаем праздничный салют через 600мс (когда карточка начнет появляться)
    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff477e', '#ff85a2', '#ffffff']
        });
    }, 600);
}

// Привязываем функцию к клику на весь стартовый экран
intro.addEventListener('click', openMagic);



// --- 2. ЛОГИКА КНОПКИ "Я ПРИДУ" ---
btnConfirm.addEventListener('click', (e) => {
    e.stopPropagation();

    // 1. Запускаем эффект "Золотых звезд"
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#FFD700', '#FFA500', '#FFFFFF'], // Золото и серебро
            ticks: 200
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#FFD700', '#FFA500', '#FFFFFF'],
            ticks: 200
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    // 2. Меняем стиль кнопки и карточки на Ифтар-стайл
    btnConfirm.innerHTML = "9 Наурызда күтеміз! 🌷";
    
    btnConfirm.style.background = "linear-gradient(45deg, #D4AF37, #FFD700)"; 
    btnConfirm.style.transform = "scale(0.95)";
    btnConfirm.style.pointerEvents = "none"; // Чтобы нельзя было спамить кликом
    
    // Добавляем золотое свечение всей карточке
    const card = document.getElementById('main-card');
    if (card) {
        card.style.boxShadow = "0 0 50px rgba(212, 175, 55, 0.6)";
    }
});

// --- 3. АНИМАЦИЯ ЛЕПЕСТКОВ (CANVAS) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height, petals = [];

// Подстраиваем размер холста под окно
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Класс лепестка
class Petal {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height - height;
        this.size = Math.random() * 5 + 2;
        this.speed = Math.random() * 2 + 1;
        this.angle = Math.random() * 360;
        this.spin = Math.random() * 0.2 - 0.1;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.beginPath();
        // Рисуем форму эллипса (лепесток)
        ctx.fillStyle = "rgba(255, 182, 193, 0.7)";
        ctx.ellipse(0, 0, this.size, this.size * 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.y += this.speed;
        this.x += Math.sin(this.y / 50); // Легкое покачивание влево-вправо
        this.angle += this.spin;

        // Если улетел за низ — возвращаем наверх
        if (this.y > height) {
            this.y = -20;
            this.x = Math.random() * width;
        }
    }
}

// Создаем 40 лепестков
for (let i = 0; i < 40; i++) {
    petals.push(new Petal());
}

// Цикл анимации
function animate() {
    ctx.clearRect(0, 0, width, height);
    petals.forEach(petal => {
        petal.update();
        petal.draw();
    });
    requestAnimationFrame(animate);
}

animate();




