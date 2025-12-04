// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navigation scroll effect
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe app cards
document.addEventListener('DOMContentLoaded', () => {
    const appCards = document.querySelectorAll('.app-card');

    appCards.forEach((card, index) => {
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;

        // Observe for intersection
        observer.observe(card);
    });

    // Add parallax effect to hero decoration
    const heroDecorations = document.querySelectorAll('.floating-icon');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        heroDecorations.forEach((icon, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            icon.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Add hover effect sound preparation (optional, doesn't make actual sound)
    appCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Dynamic copyright year
    const footerYear = document.querySelector('.footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = `© ${currentYear} My iOS Apps. All rights reserved.`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

// Optional: Add app data dynamically
// You can replace the static HTML app cards with dynamic data
const appData = [
    {
        name: "App Name 1",
        category: "Productivity",
        description: "A beautiful app that helps you stay organized and productive throughout your day.",
        icon: "📱",
        rating: 4.8,
        downloads: "10K+",
        appStoreUrl: "#"
    },
    {
        name: "App Name 2",
        category: "Creative",
        description: "Express your creativity with powerful tools designed for artists and designers.",
        icon: "🎨",
        rating: 4.9,
        downloads: "25K+",
        appStoreUrl: "#"
    },
    {
        name: "App Name 3",
        category: "Health & Fitness",
        description: "Track your fitness journey and achieve your health goals with personalized insights.",
        icon: "🏃",
        rating: 4.7,
        downloads: "15K+",
        appStoreUrl: "#"
    },
    {
        name: "App Name 4",
        category: "Education",
        description: "Learn something new every day with engaging content and interactive lessons.",
        icon: "📚",
        rating: 4.6,
        downloads: "8K+",
        appStoreUrl: "#"
    }
];

// Function to dynamically generate app cards (if you want to use JavaScript data)
function generateAppCards(apps) {
    const appsGrid = document.getElementById('appsGrid');
    if (!appsGrid) return;

    // Uncomment the line below to clear existing cards and use dynamic data
    // appsGrid.innerHTML = '';

    apps.forEach(app => {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.innerHTML = `
            <div class="app-icon">
                <div class="app-icon-placeholder">${app.icon}</div>
            </div>
            <div class="app-content">
                <h3 class="app-name">${app.name}</h3>
                <p class="app-category">${app.category}</p>
                <p class="app-description">${app.description}</p>
                <div class="app-stats">
                    <span class="stat">⭐ ${app.rating}</span>
                    <span class="stat">📥 ${app.downloads}</span>
                </div>
                <a href="${app.appStoreUrl}" class="btn-app-store" target="_blank" rel="noopener">
                    <svg width="120" height="40" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
                        <rect width="120" height="40" rx="8" fill="#000"/>
                        <text x="60" y="24" font-family="Arial, sans-serif" font-size="12" fill="#fff" text-anchor="middle">View on App Store</text>
                    </svg>
                </a>
            </div>
        `;

        // appsGrid.appendChild(card);
    });
}

// Uncomment to use dynamic app data
// generateAppCards(appData);
