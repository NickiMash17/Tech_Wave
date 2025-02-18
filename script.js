document.addEventListener("DOMContentLoaded", () => {
    // Check if particlesJS is loaded
    if (window.particlesJS) {
      particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8 },
            repulse: { distance: 200 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
          },
        },
        retina_detect: true,
      });
  
      console.log("Particles.js loaded successfully!");
    } else {
      console.error("Particles.js is not loaded.");
    }
  
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
  
    if (cursor && cursorDot) {
      document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
          x: e.clientX - cursor.offsetWidth / 2,
          y: e.clientY - cursor.offsetHeight / 2,
          duration: 0.5
        });
        gsap.to(cursorDot, {
          x: e.clientX - cursorDot.offsetWidth / 2,
          y: e.clientY - cursorDot.offsetHeight / 2,
          duration: 0.1
        });
      });
  
      document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
        cursorDot.style.transform = 'scale(0.8)';
      });
  
      document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
        cursorDot.style.transform = 'scale(1)';
      });
    } else {
      console.error('Cursor elements are missing in the HTML.');
    }
  
    // Animate skill bars on scroll
    const skillBarsContainer = document.querySelector('.skill-bars');
    const animateSkills = () => {
      const skillBars = document.querySelectorAll('.skill-progress');
      skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
      });
    };
  
    // Animate stats counter
    const stats = document.querySelectorAll('.stat-number');
    const animateStats = () => {
      stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let count = 0;
        const increment = target / 50;
        const updateCount = () => {
          if (count < target) {
            count += increment;
            stat.textContent = Math.round(Math.min(count, target));
            requestAnimationFrame(updateCount);
          } else {
            stat.textContent = target;
          }
        };
        updateCount();
      });
    };
  
    // Split text animation
    const splitTextElement = document.querySelector('.split-text');
    if (splitTextElement) {
      const splitText = new SplitType(splitTextElement, { types: 'words, chars' });
      gsap.from(splitText.chars, {
        scrollTrigger: {
          trigger: '.split-text',
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1
        },
        opacity: 0.2,
        stagger: 0.1,
        y: 100,
        rotateX: 180,
        transformOrigin: '0% 50% -50'
      });
    }
  
    // Testimonial slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const testimonialNav = document.querySelector('.testimonial-nav');
    let currentSlide = 0;
  
    // Create navigation dots
    testimonials.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('testimonial-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      testimonialNav.appendChild(dot);
    });
  
    const dots = document.querySelectorAll('.testimonial-dot');
  
    function goToSlide(index) {
      // Remove active classes
      testimonials.forEach(card => card.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
  
      // Add active classes to current slide
      testimonials[index].classList.add('active');
      dots[index].classList.add('active');
  
      // Calculate and apply transform
      const slideWidth = testimonials[0].offsetWidth + 32; // width + gap
      testimonialTrack.style.transform = `translateX(-${slideWidth * index}px)`;
      testimonialTrack.style.transition = "transform 0.5s ease-in-out"; // smooth transition
      currentSlide = index;
    }
  
    // Auto advance slides
    function autoAdvance() {
      let nextSlide = currentSlide + 1;
      if (nextSlide >= testimonials.length) nextSlide = 0;
      goToSlide(nextSlide);
    }
  
    let slideInterval = setInterval(autoAdvance, 5000);
  
    // Pause auto-advance on hover
    testimonialTrack.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
  
    testimonialTrack.addEventListener('mouseleave', () => {
      slideInterval = setInterval(autoAdvance, 5000);
    });
  
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '50px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('skill-bars')) {
            animateSkills();
          } else if (entry.target.classList.contains('about-stats')) {
            animateStats();
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    // Observe elements
    if (skillBarsContainer) observer.observe(skillBarsContainer);
    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) observer.observe(aboutStats);
  
    // Hover effect for elements
    const hoverElements = document.querySelectorAll('a, button, .testimonial-dot, .about-image-item');
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
      });
  
      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
      });
    });
  
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursor.style.display = 'none';
      cursorDot.style.display = 'none';
    });
  
    document.addEventListener('mouseenter', () => {
      cursor.style.display = 'block';
      cursorDot.style.display = 'block';
    });
  
    // Initialize on page load
    setTimeout(animateSkills, 1000);
    setTimeout(animateStats, 1500);
  });
  