/**
 * Toggle navbar shadow based on page scroll.
 */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('#navbar .nav-links a');
const sections = document.querySelectorAll('main section');
const navToggle = document.getElementById('nav-toggle');
const navList = document.querySelector('#navbar .nav-links');
const contactForm = document.getElementById('contact-form');

const revealTargets = [
  ...document.querySelectorAll('.project-card'),
  ...document.querySelectorAll('.timeline-item'),
  ...document.querySelectorAll('#education .education-entry'),
  ...document.querySelectorAll('#skills .skill-group')
];

const handleScroll = () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};

/**
 * Smooth scrolling for navbar links and mobile menu closing.
 */
const handleNavLinkClick = event => {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute('href');
  const targetSection = document.querySelector(targetId);

  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (navList.classList.contains('open')) {
    navList.classList.remove('open');
  }
};

/**
 * Highlight active nav link based on the section in view.
 */
const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const sectionId = `#${entry.target.id}`;
      const matchingLink = document.querySelector(`#navbar .nav-links a[href="${sectionId}"]`);

      if (matchingLink) {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      }
    });
  },
  { threshold: 0.35 }
);

/**
 * Add reveal animation when elements scroll into view.
 */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

/**
 * Toggle mobile navigation overlay.
 */
const handleNavToggle = () => {
  navList.classList.toggle('open');
};

/**
 * Handle the contact form submission locally and show a temporary success message.
 */
const handleContactSubmit = event => {
  event.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  console.log('Contact form submitted:', { name, email, message });

  const successMessage = document.createElement('div');
  successMessage.className = 'form-success';
  successMessage.textContent = "Thanks! I'll get back to you soon.";

  const existingMessage = document.querySelector('.form-success');
  if (existingMessage) {
    existingMessage.remove();
  }

  contactForm.insertAdjacentElement('afterend', successMessage);

  setTimeout(() => {
    successMessage.classList.add('fade-out');
  }, 3000);

  setTimeout(() => {
    successMessage.remove();
  }, 4000);

  contactForm.reset();

  // Note: This form currently only logs values in the browser.
  // A real backend or a service like Formspree is required to actually send email.
};

window.addEventListener('scroll', handleScroll);

navLinks.forEach(link => {
  link.addEventListener('click', handleNavLinkClick);
});

sections.forEach(section => {
  sectionObserver.observe(section);
});

revealTargets.forEach(target => {
  target.classList.add('reveal');
  revealObserver.observe(target);
});

navToggle.addEventListener('click', handleNavToggle);
contactForm.addEventListener('submit', handleContactSubmit);

// Initialize scroll state on load.
handleScroll();