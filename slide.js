const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const sliderWrapper = document.querySelector('.slider-educ');

let current = 0;
let autoplayInterval;
const autoplayDelay = 5000;

function update() {
  slides.forEach((s, i) => {
    s.classList.toggle('active', i === current);
  });

  // Двигаем wrapper
  const offset = -current * 100 + '%';
  sliderWrapper.style.transform = `translateX(${offset})`;

  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === current ? ' active' : '');
    dot.addEventListener('click', () => {
      goTo(i);
      resetAutoplay();
    });
    dotsContainer.appendChild(dot);
  });
}

function goTo(index) {
  current = (index + slides.length) % slides.length;
  update();
}

function nextSlide() { goTo(current + 1); }
function prevSlide() { goTo(current - 1); }

function startAutoplay() {
  autoplayInterval = setInterval(nextSlide, autoplayDelay);
}

function resetAutoplay() {
  clearInterval(autoplayInterval);
  startAutoplay();
}

prev.addEventListener('click', () => {
  prevSlide();
  resetAutoplay();
});
next.addEventListener('click', () => {
  nextSlide();
  resetAutoplay();
});

update();
startAutoplay();
