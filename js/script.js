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

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Feature cards animation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Steps animation
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = `all 0.6s ease ${index * 0.15}s`;
        observer.observe(step);
    });

    // Step connectors
    const connectors = document.querySelectorAll('.step-connector');
    connectors.forEach((connector, index) => {
        connector.style.opacity = '0';
        connector.style.transform = 'scaleX(0)';
        connector.style.transition = `all 0.4s ease ${0.3 + index * 0.15}s`;
        observer.observe(connector);
    });

    // Update observer callback for visibility
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scaleX(1)';
            }
        });
    }, observerOptions);

    // Re-observe with animation observer
    featureCards.forEach(card => animationObserver.observe(card));
    steps.forEach(step => animationObserver.observe(step));
    connectors.forEach(connector => animationObserver.observe(connector));

    // Phone mockup word hover effect
    const words = document.querySelectorAll('.mockup-text .word');
    const translationBubble = document.querySelector('.translation-bubble');
    const mockupReader = document.querySelector('.mockup-reader');
    const phoneScreen = document.querySelector('.phone-screen');
    
    if (words.length && translationBubble && mockupReader && phoneScreen) {
        // Simulate different translations for demo
        const translations = {
            'El': 'The',
            'pequeño': 'little',
            'príncipe': 'prince',
            'vivía': 'lived',
            'en': 'in',
            'un': 'a',
            'asteroide': 'asteroid',
            'apenas': 'barely',
            'más': 'more',
            'grande': 'big',
            'que': 'than',
            'él...': 'him...'
        };

        words.forEach(word => {
            word.addEventListener('mouseenter', () => {
                const text = word.textContent;
                const translation = translations[text] || text;
                
                // Update bubble content
                const wordEl = translationBubble.querySelector('.translation-word');
                const meaningEl = translationBubble.querySelector('.translation-meaning');
                
                if (wordEl && meaningEl) {
                    wordEl.textContent = text;
                    meaningEl.textContent = translation;
                }
                
                // Position bubble below the word
                const wordRect = word.getBoundingClientRect();
                const readerRect = mockupReader.getBoundingClientRect();
                const screenRect = phoneScreen.getBoundingClientRect();
                
                // Calculate position relative to mockup-reader
                let bubbleX = wordRect.left + wordRect.width / 2 - readerRect.left;
                let bubbleY = wordRect.bottom - readerRect.top + 12; // 12px below the word
                
                // Get bubble dimensions (need to show it first to measure)
                translationBubble.style.visibility = 'hidden';
                translationBubble.style.opacity = '1';
                const bubbleRect = translationBubble.getBoundingClientRect();
                const bubbleWidth = bubbleRect.width;
                const bubbleHeight = bubbleRect.height;
                translationBubble.style.visibility = 'visible';
                
                // Constrain X to stay within phone screen
                const minX = bubbleWidth / 2 + 10; // 10px padding from edge
                const maxX = readerRect.width - bubbleWidth / 2 - 10;
                bubbleX = Math.max(minX, Math.min(maxX, bubbleX));
                
                // Constrain Y to stay within phone screen
                const maxY = readerRect.height - bubbleHeight - 10;
                bubbleY = Math.min(maxY, bubbleY);
                
                translationBubble.style.left = `${bubbleX}px`;
                translationBubble.style.top = `${bubbleY}px`;
                translationBubble.style.opacity = '1';
                
                // Highlight effect
                words.forEach(w => w.classList.remove('highlighted'));
                word.classList.add('highlighted');
            });
        });
        
        // Hide bubble when leaving the text area
        const mockupText = document.querySelector('.mockup-text');
        if (mockupText) {
            mockupText.addEventListener('mouseleave', () => {
                // Reset to default "príncipe" selection
                selectWord('príncipe');
            });
        }
        
        // Function to programmatically select a word
        function selectWord(wordText) {
            const targetWord = Array.from(words).find(w => w.textContent === wordText);
            if (targetWord) {
                const text = targetWord.textContent;
                const translation = translations[text] || text;
                
                // Update bubble content
                const wordEl = translationBubble.querySelector('.translation-word');
                const meaningEl = translationBubble.querySelector('.translation-meaning');
                
                if (wordEl && meaningEl) {
                    wordEl.textContent = text;
                    meaningEl.textContent = translation;
                }
                
                // Position bubble below the word
                const wordRect = targetWord.getBoundingClientRect();
                const readerRect = mockupReader.getBoundingClientRect();
                
                let bubbleX = wordRect.left + wordRect.width / 2 - readerRect.left;
                let bubbleY = wordRect.bottom - readerRect.top + 12;
                
                // Get bubble dimensions
                translationBubble.style.visibility = 'hidden';
                translationBubble.style.opacity = '1';
                const bubbleRect = translationBubble.getBoundingClientRect();
                const bubbleWidth = bubbleRect.width;
                const bubbleHeight = bubbleRect.height;
                translationBubble.style.visibility = 'visible';
                
                // Constrain to stay within phone screen
                const minX = bubbleWidth / 2 + 10;
                const maxX = readerRect.width - bubbleWidth / 2 - 10;
                bubbleX = Math.max(minX, Math.min(maxX, bubbleX));
                
                const maxY = readerRect.height - bubbleHeight - 10;
                bubbleY = Math.min(maxY, bubbleY);
                
                translationBubble.style.left = `${bubbleX}px`;
                translationBubble.style.top = `${bubbleY}px`;
                translationBubble.style.opacity = '1';
                
                // Highlight effect
                words.forEach(w => w.classList.remove('highlighted'));
                targetWord.classList.add('highlighted');
            }
        }
        
        // Select "príncipe" by default after a short delay for layout to settle
        setTimeout(() => {
            selectWord('príncipe');
        }, 100);
    }

    // Parallax effect for floating letters
    const floatingLetters = document.querySelectorAll('.floating-letter');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        floatingLetters.forEach((letter, index) => {
            const speed = 0.3 + (index * 0.05);
            const yPos = scrolled * speed;
            letter.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Dynamic copyright year
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = `© ${currentYear} Fabrizio Demaria. Made with ❤️ in Stockholm.`;
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

// Smooth scroll offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
