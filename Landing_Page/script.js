document.addEventListener("DOMContentLoaded", function () {
    const slideshow = document.querySelector(".my-slideshow");
    const slides = slideshow.querySelectorAll(".my-slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const indicatorsContainer = document.querySelector(".indicators");

    let currentSlide = 0;

    // Function to show a specific slide
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
        });

        const indicators = indicatorsContainer.querySelectorAll(".indicator");
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle("active", i === index);
        });
    }

    // Function to move to the next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Function to move to the previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement("div");
        indicator.classList.add("indicator");
        if (index === currentSlide) indicator.classList.add("active");
        indicator.addEventListener("click", () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
        indicatorsContainer.appendChild(indicator);
    });

    // Add event listeners for buttons
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    // Initialize slideshow
    showSlide(currentSlide);
    setInterval(nextSlide, 3000); // Auto-slide every 3 seconds
});

// Toggle menu function
function toggleMenu() {
    document.querySelector('.navbar').classList.toggle('show');
}

// Optimize Scroll Effect
window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

//for typewritter effect

document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const target = entry.target;

                // If the element is visible
                if (entry.isIntersecting) {
                    // Add the 'visible' class to start animation
                    target.classList.add("visible");

                    // Restart animation by triggering reflow
                    setTimeout(() => {
                        target.classList.remove("visible");
                        void target.offsetWidth; // Trigger reflow
                        target.classList.add("visible");
                    }, 1000); // Delay equals total animation duration
                }
            });
        },
        { threshold: 0.1 } // Adjust visibility threshold
    );

    // Observe the ul element
    const target = document.querySelector(".social-text ul");
    if (target) observer.observe(target);
});

//number animation
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.number');

    counters.forEach(counter => {
        const animateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const speed = 250; // Lower means faster
            const increment = target / speed;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target; // Ensure it reaches the target
                }
            };

            updateCounter();
        };

        // Observe visibility and animate when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter();
                    observer.unobserve(counter); // Stop observing after animation
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% visible

        observer.observe(counter);
    });
});

//for AMP effect
document.addEventListener("DOMContentLoaded", () => {
    // Create an Intersection Observer
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const h3 = entry.target.querySelector("h3");
                    if (h3) {
                        h3.style.animationPlayState = "running";
                    }
                }
            });
        },
        {
            threshold: 0.5, // Trigger when 50% of the element is visible
        }
    );

    // Select all heading intro elements
    const headingIntro = document.querySelector(".heading-intro");
    if (headingIntro) {
        // Initially set animationPlayState to paused
        const h3 = headingIntro.querySelector("h3");
        if (h3) {
            h3.style.animationPlayState = "paused";
        }

        // Observe the element
        observer.observe(headingIntro);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const alumniCardsContainer = document.querySelector('.alumni-cards');
    const alumniCards = Array.from(alumniCardsContainer.children);

    function displayThreeRandomCards() {
        // Hide all cards initially
        alumniCards.forEach(card => card.style.display = 'none');

        // Get three unique random indices
        let indices = [];
        while (indices.length < 3) {
            let randomIndex = Math.floor(Math.random() * alumniCards.length);
            if (!indices.includes(randomIndex)) {
                indices.push(randomIndex);
            }
        }

        // Display only three random cards
        indices.forEach(index => {
            alumniCards[index].style.display = 'flex';
        });
    }

    displayThreeRandomCards(); // Initial display
    setInterval(displayThreeRandomCards, 5000); // Refresh every 5 seconds
});

// alumni-section.js
const alumniData = [
    {
        name: "Yash Rathi",
        image: "./assets/images/test-images/person1.webp",
        company: "Google",
        batch: "2018",
        email: "sarah.j@example.com",
        linkedin: "sarahj"
    },
    {
        name: "Mrizzu",
        image: "./assets/images/test-images/person4.jpg",
        company: "Microsoft",
        batch: "2019",
        email: "m.chen@example.com",
        linkedin: "mchen"
    },
    {
        name: "Kavlin Kaur",
        image: "./assets/images/test-images/person2.webp ",
        company: "Amazon",
        batch: "2017",
        email: "priya.p@example.com",
        linkedin: "priyap"
    },
    {
        name: "Kesahv",
        image: "./assets/images/test-images/person5.jpg",
        company: "Tesla",
        batch: "2020",
        email: "j.wilson@example.com",
        linkedin: "jwilson"
    }
];

function createAlumniCard(alumni) {
    return `
      <div class="alumni-card">
        <div class="card-image">
          <img src="${alumni.image}" alt="${alumni.name}">
        </div>
        <div class="alumni-info">
          <h3 class="alumni-name">${alumni.name}</h3>
          <p class="alumni-role"><strong>Company:</strong> ${alumni.company}</p>
          <p class="alumni-company"><strong>Batch:</strong> ${alumni.batch}</p>
          <div class="alumni-actions">
            <button class="contact-btn" onclick="window.location.href='mailto:${alumni.email}'">
              <i class="fas fa-envelope"></i>
            </button>
            <button class="contact-btn" onclick="window.open('https://linkedin.com/in/${alumni.linkedin}', '_blank')">
              <i class="fab fa-linkedin"></i>
            </button>
          </div>
        </div>
      </div>
    `;
}

let currentIndex = 0;
const container = document.getElementById('alumniContainer');
const cardsToShow = window.innerWidth > 768 ? 3 : 1;

function updateCards() {
    const visibleAlumni = alumniData.slice(currentIndex, currentIndex + cardsToShow);
    container.innerHTML = visibleAlumni.map(createAlumniCard).join('');

    currentIndex = (currentIndex + 1) % (alumniData.length - cardsToShow + 1);
}

// Initial render
updateCards();

// Auto-update every 3 seconds
let interval = setInterval(updateCards, 4000);

// Pause on hover
container.addEventListener('mouseenter', () => clearInterval(interval));
container.addEventListener('mouseleave', () => interval = setInterval(updateCards, 4000));



//gallary
jQuery(document).ready(function ($) {
    // Initialize Isotope with proper options
    var $grid = $('.gallery-gird').isotope({
        itemSelector: '.col-lg-3',
        layoutMode: 'fitRows',
        transitionDuration: '0.6s'
    });

    // Filter items on button click
    $('.gallery-menu span').on('click', function () {
        $('.gallery-menu span').removeClass('active');
        $(this).addClass('active');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
        return false;
    });

    // Initialize Magnific Popup for images
    $('.image-popup').magnificPopup({
        type: 'image',
        mainClass: 'mfp-fade',
        removalDelay: 300,
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        }
    });

    // Initialize Magnific Popup for videos
    $('.video-popup').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 300,
        gallery: {
            enabled: true
        },
        iframe: {
            patterns: {
                vimeo: {
                    index: 'vimeo.com/',
                    id: '/',
                    src: '//player.vimeo.com/video/%id%?autoplay=1'
                }
            }
        }
    });

    // Trigger layout after images are loaded
    $grid.imagesLoaded().progress(function () {
        $grid.isotope('layout');
    });
});