/**
 * BASE DE DATOS DE TUS BOTAS INDUSTRIALES (Tus 8 modelos)
 * Instrucciones: Reemplaza los enlaces en 'image' con las rutas a tus imágenes PNG transparentes.
 */
const boots = [
    {
        name: "TITÁN",
        feature: "Puntera de Acero",
        colorStart: "#FFB75E", // Degradado Inicial
        colorEnd: "#ED8F03",   // Degradado Final
        image: "imagenes/bota.png"
    },
    {
        name: "KRYPTON",
        feature: "Protección Dieléctrica",
        colorStart: "#4facfe", 
        colorEnd: "#00f2fe",
        image: "imagenes/bota.png"
    },
    {
        name: "VULCAN",
        feature: "Resistencia Térmica",
        colorStart: "#ff0844", 
        colorEnd: "#ffb199",
        image: "imagenes/bota.png"
    },
    {
        name: "ARMOR",
        feature: "Suela Kevlar",
        colorStart: "#11998e", 
        colorEnd: "#38ef7d",
        image: "imagenes/bota.png"
    },
    {
        name: "STEEL",
        feature: "Impermeabilidad Pro",
        colorStart: "#667eea", 
        colorEnd: "#764ba2",
        image: "imagenes/bota.png"
    },
    {
        name: "GOLIAT",
        feature: "Soporte Tobillo 360",
        colorStart: "#f79d00", 
        colorEnd: "#64f38c",
        image: "imagenes/bota.png"
    },
    {
        name: "RHINO",
        feature: "Plantilla Antifatiga",
        colorStart: "#000000", 
        colorEnd: "#434343",
        image: "imagenes/bota.png"
    },
    {
        name: "FALCON",
        feature: "Ultraligera (Composite)",
        colorStart: "#b224ef", 
        colorEnd: "#7579ff",
        image: "imagenes/bota.png"
    }
];

let currentIndex = 0;
let isAnimating = false;

// Elementos del DOM
const bootContainer = document.getElementById('bootContainer');
const textContainer = document.getElementById('textContainer');
const featureText = document.getElementById('featureText');
const indicators = document.getElementById('indicators');
const rootStyles = document.documentElement.style;

// Carga inicial
function init() {
    const boot = boots[currentIndex];
    const img = document.createElement('img');
    img.src = boot.image;
    img.className = 'boot-image boot-active';
    img.alt = boot.name;
    bootContainer.appendChild(img);

    rootStyles.setProperty('--color-start', boot.colorStart);
    rootStyles.setProperty('--color-end', boot.colorEnd);
    document.getElementById('bgTextCurrent').innerText = boot.name;
    featureText.innerText = boot.feature;
    updateIndicators();
}

// Lógica de transición
function changeBoot(direction) {
    if (isAnimating) return;
    isAnimating = true;

    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % boots.length;
    } else {
        currentIndex = (currentIndex - 1 + boots.length) % boots.length;
    }

    const newBoot = boots[currentIndex];

    // Animación de texto
    const oldText = document.querySelector('.background-text.text-active');
    const newText = document.createElement('div');
    newText.className = 'background-text';
    newText.innerText = newBoot.name;
    
    if (direction === 'next') {
        newText.classList.add('text-enter-up');
        oldText.classList.replace('text-active', 'text-exit-up');
    } else {
        newText.classList.add('text-enter-down');
        oldText.classList.replace('text-active', 'text-exit-down');
    }
    textContainer.appendChild(newText);

    // Actualizar colores y textos
    rootStyles.setProperty('--color-start', newBoot.colorStart);
    rootStyles.setProperty('--color-end', newBoot.colorEnd);
    featureText.innerText = newBoot.feature;
    document.querySelector('.specs-card h2').innerText = `Nº ${currentIndex + 1}`;

    // Animación de la ruleta de zapatos
    const oldImg = document.querySelector('.boot-active');
    const newImg = document.createElement('img');
    newImg.src = newBoot.image;
    newImg.className = `boot-image ${direction === 'next' ? 'boot-next' : 'boot-prev'}`;
    newImg.alt = newBoot.name;
    bootContainer.appendChild(newImg);

    void newImg.offsetWidth;
    void newText.offsetWidth;

    if (direction === 'next') {
        oldImg.classList.replace('boot-active', 'boot-prev');
    } else {
        oldImg.classList.replace('boot-active', 'boot-next');
    }
    
    newImg.className = 'boot-image boot-active';
    newText.className = 'background-text text-active';

    updateIndicators();

    setTimeout(() => {
        oldImg.remove();
        oldText.remove();
        isAnimating = false;
    }, 800); 
}

function updateIndicators() {
    let dots = '';
    for(let i=0; i<boots.length; i++) {
        dots += i === currentIndex ? '● ' : '○ ';
    }
    indicators.innerText = dots.trim();
}

// Botones de control
document.getElementById('btnNext').addEventListener('click', () => changeBoot('next'));
document.getElementById('btnPrev').addEventListener('click', () => changeBoot('prev'));

window.onload = init;