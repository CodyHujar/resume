document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('nav ul li button');
    const sections = document.querySelectorAll('main section');
    const backToTopButton = document.getElementById('backToTop');
    const themeToggleButton = document.getElementById('themeToggle');
    const body = document.body;

    // Function to show the selected section and hide others
    function showSection(id) {
        sections.forEach(section => {
            if (section.id === id) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }

    // Add event listeners to navigation buttons
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const contentId = button.getAttribute('data-content');
            showSection(contentId);

            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');
        });
    });

    // Initially show the first section
    if (buttons.length > 0) {
        buttons[0].click();
    }

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            // Move focus to the target element for accessibility
            targetElement.setAttribute('tabindex', '-1'); // Make element focusable
            targetElement.focus();
        });
    });

    // Back to top button functionality
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Back to top button visibility
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    });

    // Theme toggle functionality
    themeToggleButton.addEventListener('click', function() {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
        } else {
            body.setAttribute('data-theme', 'dark');
        }
    });

    // Portfolio "Read More" Toggle Functionality
    document.querySelectorAll(".toggle-details").forEach(button => {
        button.addEventListener("click", function() {
            const details = this.nextElementSibling;
            if (details.style.display === "block") {
                details.style.display = "none";
                this.textContent = "Read More";
            } else {
                details.style.display = "block";
                this.textContent = "Read Less";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".portfolio-images img");
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.classList.add("hidden"); 
    lightbox.innerHTML = `
        <button id="lightbox-close" aria-label="Close">✕</button>
        <button id="lightbox-prev" aria-label="Previous image">❮</button>
        <img id="lightbox-image" src="" alt="">
        <button id="lightbox-next" aria-label="Next image">❯</button>
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = document.getElementById("lightbox-image");
    const closeButton = document.getElementById("lightbox-close");
    const nextButton = document.getElementById("lightbox-next");
    const prevButton = document.getElementById("lightbox-prev");

    let currentIndex = 0;
    let imageArray = [];

    function openLightbox(index) {
        lightboxImage.src = imageArray[index].src;
        lightboxImage.alt = imageArray[index].alt;
        lightbox.setAttribute("aria-hidden", "false");
        lightbox.classList.remove("hidden");
        closeButton.focus();
    }

    function closeLightbox() {
        lightbox.setAttribute("aria-hidden", "true");
        lightbox.classList.add("hidden");
    }

    function navigateLightbox(direction) {
        currentIndex = (currentIndex + direction + imageArray.length) % imageArray.length;
        openLightbox(currentIndex);
    }

    images.forEach((image, index) => {
        image.addEventListener("click", function(event) {
            event.preventDefault();
            imageArray = Array.from(this.closest(".portfolio-images").children);
            currentIndex = imageArray.indexOf(this);
            openLightbox(currentIndex);
        });
    });

    closeButton.addEventListener("click", closeLightbox);
    nextButton.addEventListener("click", () => navigateLightbox(1));
    prevButton.addEventListener("click", () => navigateLightbox(-1));

    document.addEventListener("keydown", function(event) {
        if (lightbox.getAttribute("aria-hidden") === "false") {
            if (event.key === "Escape") closeLightbox();
            if (event.key === "ArrowRight") navigateLightbox(1);
            if (event.key === "ArrowLeft") navigateLightbox(-1);
        }
    });
});

