// Set your relationship start date here (hardcoded for reliability)
const startDate = new Date('2024-09-21T00:00:00'); // Your real start date

// Update the months counter
function updateMonths() {
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));
    document.getElementById('months').textContent = diffMonths;
}

// Update the countdown timer
function updateTimer() {
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Create floating hearts
function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    document.getElementById('floatingHearts').appendChild(heart);
    
    // Remove the heart after animation
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// Add click event for the love button
document.getElementById('loveButton').addEventListener('click', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Create multiple hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFloatingHeart(
                x + (Math.random() - 0.5) * 100,
                y + (Math.random() - 0.5) * 100
            );
        }, i * 100);
    }
});

// Sample gallery images (replace these with your actual images)
const galleryImages = [
    'images/photo1.webp', // 1st image
    'images/photo2.jpg', // 2nd image
    'images/photo3.jpg', // 3rd image
    'images/photo4.jpg'  // 4th image
];

// Populate gallery
function populateGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    galleryImages.forEach((imageUrl, idx) => {
        console.log('Loading image:', imageUrl);
        const item = document.createElement('div');
        item.className = 'gallery-item';
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Our memories';
        img.loading = 'lazy';
        img.style.cursor = 'pointer';
        img.onclick = function() {
            openLightbox(imageUrl);
        };
        img.onerror = function() {
            img.alt = 'Image not found';
            img.style.background = '#fff0f0';
            img.style.color = '#ff0000';
            img.style.display = 'block';
            img.style.width = '100%';
            img.style.height = '200px';
            img.style.objectFit = 'contain';
            img.src = '';
            item.innerHTML = '<div style="color:#fff;text-align:center;padding:2rem;">Image not found:<br>' + imageUrl + '</div>';
        };
        const btn = document.createElement('button');
        btn.className = 'gallery-sound-btn';
        btn.innerHTML = '💖';
        btn.title = 'Click for a cute reaction!';
        btn.onclick = function(e) {
            e.stopPropagation();
            const audio = new Audio('sounds/cute-anime.mp3');
            audio.play();
        };
        item.appendChild(img);
        item.appendChild(btn);
        gallery.appendChild(item);
    });
}

// Lightbox functions
function openLightbox(imgUrl) {
    const overlay = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    overlay.style.display = 'flex';
    lightboxImg.src = imgUrl;
}
function closeLightbox() {
    const overlay = document.getElementById('lightbox-overlay');
    overlay.style.display = 'none';
    document.getElementById('lightbox-img').src = '';
}

// Initialize everything
function init() {
    updateTimer();
    populateGallery();
    setInterval(updateTimer, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    init();
    // Lightbox event listeners
    document.getElementById('lightbox-close').onclick = closeLightbox;
    document.getElementById('lightbox-overlay').onclick = function(e) {
        if (e.target === this) closeLightbox();
    };
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });
    // Redirect to love.html on loveButton click
    document.getElementById('loveButton').onclick = function() {
        window.location.href = 'love.html';
    };
});

// --- Animated Couples Tossing Hearts ---
function tossHeart(fromSelector, toSelector) {
    const from = document.querySelector(fromSelector);
    const to = document.querySelector(toSelector);
    if (!from || !to) return;
    const fromRect = from.getBoundingClientRect();
    const toRect = to.getBoundingClientRect();
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.style.position = 'fixed';
    heart.style.left = fromRect.left + fromRect.width / 2 + 'px';
    heart.style.top = fromRect.top + fromRect.height / 2 + 'px';
    heart.style.fontSize = '2rem';
    heart.style.zIndex = 10;
    heart.innerHTML = '💖';
    document.body.appendChild(heart);
    // Animate
    heart.animate([
        { left: fromRect.left + fromRect.width / 2 + 'px', top: fromRect.top + fromRect.height / 2 + 'px', opacity: 1 },
        { left: toRect.left + toRect.width / 2 + 'px', top: toRect.top + toRect.height / 2 + 'px', opacity: 0.2 }
    ], {
        duration: 1800,
        easing: 'ease-in-out',
        fill: 'forwards'
    });
    setTimeout(() => heart.remove(), 1800);
}
// Toss hearts every few seconds
setInterval(() => {
    tossHeart('.couple-1', '.couple-2');
    setTimeout(() => tossHeart('.couple-2', '.couple-1'), 900);
}, 3000); 