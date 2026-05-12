document.addEventListener('DOMContentLoaded', () => {
    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionContent = header.nextElementSibling;
            
            // Close other open items
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== accordionItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle current item
            accordionItem.classList.toggle('active');

            if (accordionItem.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
            } else {
                accordionContent.style.maxHeight = null;
            }
        });
    });

    // Smooth Scroll for Navbar Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple scroll reveal animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                
                // Remove the inline transition once the animation finishes
                // so it doesn't interfere with CSS hover transitions
                entry.target.addEventListener('transitionend', function handler(e) {
                    if (e.propertyName === 'opacity' || e.propertyName === 'transform') {
                        entry.target.style.transition = '';
                        entry.target.removeEventListener('transitionend', handler);
                    }
                });

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const selectors = ['.card', '.accordion-item', '.contact-card'];
    selectors.forEach(selector => {
        const animateElements = document.querySelectorAll(selector);
        animateElements.forEach((el, index) => {
            el.style.opacity = 0;
            el.style.transform = 'translateY(30px)';
            // Delay is based on the index within its own group, so the first item always animates first
            el.style.transition = `all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) ${(index % 10) * 0.1}s`;
            observer.observe(el);
        });
    });
});
