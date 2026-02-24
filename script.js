// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const fadeInElements = document.querySelectorAll('.glass-panel, .section-title');
    
    fadeInElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => observer.observe(el));

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 2, 10, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(91, 40, 158, 0.3)';
        } else {
            navbar.style.background = 'rgba(5, 2, 10, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Simple Particle System representing water/magic energy
    createParticles();
});

function createParticles() {
    const particleContainer = document.getElementById('particles-js');
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100vw';
    particleContainer.style.height = '100vh';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '0';

    const colors = ['#8e6db5', '#91a4ce', '#91b0d4', '#92bedb', '#5b289e'];
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const animDuration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;

        // Styling
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.left = `${left}vw`;
        particle.style.top = `${top}vh`;

        // Animation using WAAPI
        particle.animate([
            { transform: `translate(0, 0) scale(1)`, opacity: particle.style.opacity },
            { transform: `translate(${Math.random() * 100 - 50}px, -${Math.random() * 200 + 100}px) scale(0)`, opacity: 0 }
        ], {
            duration: animDuration * 1000,
            iterations: Infinity,
            delay: delay * 1000,
            easing: 'ease-in-out'
        });

        particleContainer.appendChild(particle);
    }
}
