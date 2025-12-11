// Burger menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const burgerToggle = document.querySelector('.burger-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  if (burgerToggle && navMenu) {
    burgerToggle.addEventListener('click', function() {
      const isExpanded = burgerToggle.getAttribute('aria-expanded') === 'true';
      burgerToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
      burgerToggle.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        burgerToggle.classList.remove('active');
        burgerToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navMenu.contains(event.target) || burgerToggle.contains(event.target);
      if (!isClickInsideNav && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        burgerToggle.classList.remove('active');
        burgerToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections for animation
  document.querySelectorAll('section, .book-card, .category, .feature').forEach(el => {
    observer.observe(el);
  });
});

