// Select elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Toggle menu on hamburger click
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside (optional)
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
          window.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth',
          });
      }
  });
});



let currentIndex = 0; // Track the current image index
const images = document.querySelectorAll('.hero-images img');
const slider = document.querySelector('.hero-images');

// Set the total number of images
const totalImages = images.length;

// Function to move the slider
function moveSlide(direction) {
  currentIndex += direction;

  // Handle boundary conditions
  if (currentIndex < 0) {
    currentIndex = totalImages - 1; // Go to the last image
  } else if (currentIndex >= totalImages) {
    currentIndex = 0; // Wrap around to the first image
  }

  // Calculate the transform value
  const transformValue = -currentIndex * 100;
  slider.style.transform = `translateX(${transformValue}%)`;
}

// Auto-slide (optional)
setInterval(() => {
  moveSlide(1); // Move to the next slide every 3 seconds
}, 5000);
