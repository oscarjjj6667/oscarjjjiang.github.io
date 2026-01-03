// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    contactForm.reset();
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .service-card, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const floatingCube = document.querySelector('.floating-cube');
    
    if (hero && floatingCube) {
        const rate = scrolled * -0.5;
        floatingCube.style.transform = `translateY(${rate}px)`;
    }
});

// Product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.01)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial body opacity for fade-in effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Add loading animation to floating octopus
    const floatingOctopus = document.querySelector('.floating-octopus');
    if (floatingOctopus) {
        // Octopus now only floats without rotation
        console.log('Floating octopus initialized');
    }
    
    // Add click effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add smooth reveal animation for sections
const revealElements = document.querySelectorAll('.section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Add CSS for reveal animation
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyle);

// Modal functionality for toy images
function openTelescopingModal() {
    const modal = document.getElementById('toyModal');
    const modalImage1 = document.getElementById('modalImage1');
    const modalImage2 = document.getElementById('modalImage2');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    modalImage1.src = 'toy1.jpg';
    modalImage1.alt = 'Telescoping Weapon 1';
    modalImage2.src = 'toy3.jpg';
    modalImage2.alt = 'Telescoping Weapon 2';
    modalTitle.textContent = 'Telescoping Weapons';
    modalDescription.textContent = 'Experience the magic of extendable toys with our custom 3D printed telescoping weapons collection. Perfect for cosplay, collectibles, or imaginative play, these toys feature smooth extension mechanisms that allow them to expand and retract seamlessly. Made with high-quality materials and precision engineering, each telescoping weapon is designed for durability and safe play. From lightsabers to medieval swords, we can create any design you envision with attention to detail and craftsmanship.';
    
    modal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function openFlexibleModal() {
    const modal = document.getElementById('toyModal');
    const modalImage1 = document.getElementById('modalImage1');
    const modalImage2 = document.getElementById('modalImage2');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    modalImage1.src = 'toy2.jpg';
    modalImage1.alt = 'Flexible Toy 1';
    modalImage2.src = 'toy4.png';
    modalImage2.alt = 'Flexible Toy 2';
    modalTitle.textContent = 'Flexible Toys';
    modalDescription.textContent = 'Bring your favorite characters to life with our flexible 3D printed action figures and toys. These bendable creations feature articulated joints and flexible materials that allow for dynamic posing and play. Whether you\'re looking for action figures, mythical creatures, or custom characters, our flexible toys combine creativity with functionality. Each piece is carefully designed to maintain its shape while providing endless possibilities for posing and imaginative storytelling. Perfect for collectors, children, or anyone who loves interactive toys.';
    
    modal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function openHalloweenModal() {
    const modal = document.getElementById('toyModal');
    const modalImage1 = document.getElementById('modalImage1');
    const modalImage2 = document.getElementById('modalImage2');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    modalImage1.src = 'fest.jpg';
    modalImage1.alt = 'Halloween Props - Fest';
    modalImage2.src = 'hal.jpg';
    modalImage2.alt = 'Halloween Props - Ghost Lamp';
    modalTitle.textContent = 'Halloween Props';
    modalDescription.textContent = 'Transform your Halloween celebration with our spooky 3D printed props and decorations. From eerie ghost lamps to festive decorative pieces, we create custom Halloween props that add the perfect touch of fright to your home or party. Our designs range from classic spooky elements to unique custom creations that reflect your personal style. Made with attention to detail and creative flair, these props are designed to impress guests and create memorable Halloween experiences. Whether you need a single prop or a complete themed collection, we can bring your spooky visions to life.';
    
    modal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function openRepairModal() {
    const modal = document.getElementById('repairModal');
    modal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function openCreationModal() {
    const modal = document.getElementById('creationModal');
    modal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

let currentPortraitSlide = 0;
const totalPortraitSlides = 7;

function openPortraitModal() {
    const modal = document.getElementById('portraitModal');
    modal.style.display = 'block';
    
    // Reset slider to first slide
    currentPortraitSlide = 0;
    
    // Initialize dots if not already done
    const portraitSliderDots = document.getElementById('portraitSliderDots');
    if (portraitSliderDots && portraitSliderDots.children.length === 0) {
        for (let i = 0; i < totalPortraitSlides; i++) {
            const dot = document.createElement('span');
            dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
            dot.onclick = () => {
                currentPortraitSlide = i;
                updatePortraitSlider();
            };
            portraitSliderDots.appendChild(dot);
        }
    }
    
    updatePortraitSlider();
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function changePortraitSlide(direction) {
    currentPortraitSlide += direction;
    
    if (currentPortraitSlide < 0) {
        currentPortraitSlide = totalPortraitSlides - 1;
    } else if (currentPortraitSlide >= totalPortraitSlides) {
        currentPortraitSlide = 0;
    }
    
    updatePortraitSlider();
}

function updatePortraitSlider() {
    const track = document.getElementById('portraitSliderTrack');
    if (!track) return;
    
    const slides = track.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('#portraitSliderDots .slider-dot');
    
    // Update slide active state
    slides.forEach((slide, index) => {
        if (slide) {
            slide.classList.remove('active');
            if (index === currentPortraitSlide) {
                slide.classList.add('active');
            }
        }
    });
    
    // Update dots
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            if (dot) {
                dot.classList.remove('active');
                if (index === currentPortraitSlide) {
                    dot.classList.add('active');
                }
            }
        });
    }
}

function openHomeSolutionsModal() {
    const modal = document.getElementById('homeSolutionsModal');
    modal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function openWorkshopToolsModal() {
    const modal = document.getElementById('workshopToolsModal');
    modal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function openPetEquipmentsModal() {
    const modal = document.getElementById('petEquipmentsModal');
    modal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function openMaglevModal() {
    const modal = document.getElementById('maglevModal');
    modal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function openChristmasModal() {
    const modal = document.getElementById('christmasModal');
    modal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const toyModal = document.getElementById('toyModal');
    const repairModal = document.getElementById('repairModal');
    const creationModal = document.getElementById('creationModal');
    const portraitModal = document.getElementById('portraitModal');
    const homeSolutionsModal = document.getElementById('homeSolutionsModal');
    const workshopToolsModal = document.getElementById('workshopToolsModal');
    const petEquipmentsModal = document.getElementById('petEquipmentsModal');
    const maglevModal = document.getElementById('maglevModal');
    const christmasModal = document.getElementById('christmasModal');
    
    if (toyModal) toyModal.style.display = 'none';
    if (repairModal) repairModal.style.display = 'none';
    if (creationModal) creationModal.style.display = 'none';
    if (portraitModal) portraitModal.style.display = 'none';
    if (homeSolutionsModal) homeSolutionsModal.style.display = 'none';
    if (workshopToolsModal) workshopToolsModal.style.display = 'none';
    if (petEquipmentsModal) petEquipmentsModal.style.display = 'none';
    if (maglevModal) maglevModal.style.display = 'none';
    if (christmasModal) christmasModal.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close modal when clicking the X button
document.addEventListener('DOMContentLoaded', () => {
    const closeBtns = document.querySelectorAll('.close');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
    });
    
    // Close modal when clicking outside of it
    const toyModal = document.getElementById('toyModal');
    const repairModal = document.getElementById('repairModal');
    const creationModal = document.getElementById('creationModal');
    const portraitModal = document.getElementById('portraitModal');
    const homeSolutionsModal = document.getElementById('homeSolutionsModal');
    const workshopToolsModal = document.getElementById('workshopToolsModal');
    const petEquipmentsModal = document.getElementById('petEquipmentsModal');
    const maglevModal = document.getElementById('maglevModal');
    
    if (toyModal) {
        toyModal.addEventListener('click', (e) => {
            if (e.target === toyModal) {
                closeModal();
            }
        });
        
        // Prevent modal-content clicks from closing the modal
        const toyModalContent = toyModal.querySelector('.modal-content');
        if (toyModalContent) {
            toyModalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }
    
    if (repairModal) {
        repairModal.addEventListener('click', (e) => {
            if (e.target === repairModal) {
                closeModal();
            }
        });
        
        // Prevent modal-content clicks from closing the modal
        const repairModalContent = repairModal.querySelector('.modal-content');
        if (repairModalContent) {
            repairModalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }
    
    if (creationModal) {
        creationModal.addEventListener('click', (e) => {
            if (e.target === creationModal) {
                closeModal();
            }
        });
        
        // Prevent modal-content clicks from closing the modal
        const creationModalContent = creationModal.querySelector('.modal-content');
        if (creationModalContent) {
            creationModalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }
    
    if (homeSolutionsModal) {
        homeSolutionsModal.addEventListener('click', (e) => {
            if (e.target === homeSolutionsModal) {
                closeModal();
            }
        });
        
        // Prevent modal-content clicks from closing the modal
        const homeSolutionsModalContent = homeSolutionsModal.querySelector('.modal-content');
        if (homeSolutionsModalContent) {
            homeSolutionsModalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }
    
    if (workshopToolsModal) {
        workshopToolsModal.addEventListener('click', (e) => {
            if (e.target === workshopToolsModal) {
                closeModal();
            }
        });
        
        // Prevent modal-content clicks from closing the modal
        const workshopToolsModalContent = workshopToolsModal.querySelector('.modal-content');
        if (workshopToolsModalContent) {
            workshopToolsModalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }
    
    if (petEquipmentsModal) {
        petEquipmentsModal.addEventListener('click', (e) => {
            if (e.target === petEquipmentsModal) {
                closeModal();
            }
        });
        
        // Prevent modal-content clicks from closing the modal
        const petEquipmentsModalContent = petEquipmentsModal.querySelector('.modal-content');
        if (petEquipmentsModalContent) {
            petEquipmentsModalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }
    
    if (maglevModal) {
        maglevModal.addEventListener('click', (e) => {
            if (e.target === maglevModal) {
                closeModal();
            }
        });
        
        // Prevent modal-content clicks from closing the modal
        const maglevModalContent = maglevModal.querySelector('.modal-content');
        if (maglevModalContent) {
            maglevModalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }
    
    if (christmasModal) {
        christmasModal.addEventListener('click', (e) => {
            if (e.target === christmasModal) {
                closeModal();
            }
        });
        
        // Prevent modal-content clicks from closing the modal
        const christmasModalContent = christmasModal.querySelector('.modal-content');
        if (christmasModalContent) {
            christmasModalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }
    
    if (portraitModal) {
        portraitModal.addEventListener('click', (e) => {
            if (e.target === portraitModal) {
                closeModal();
            }
        });
        
        // Prevent modal-content clicks from closing the modal
        const portraitModalContent = portraitModal.querySelector('.modal-content');
        if (portraitModalContent) {
            portraitModalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }
    
    // Initialize portrait slider dots
    const portraitSliderDots = document.getElementById('portraitSliderDots');
    if (portraitSliderDots) {
        for (let i = 0; i < totalPortraitSlides; i++) {
            const dot = document.createElement('span');
            dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
            dot.onclick = () => {
                currentPortraitSlide = i;
                updatePortraitSlider();
            };
            portraitSliderDots.appendChild(dot);
        }
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            const historyLightbox = document.getElementById('historyLightbox');
            if (historyLightbox && historyLightbox.classList.contains('active')) {
                toggleHistoryImage(null);
            }
        }
    });
});

// History Image Descriptions
const historyImageDescriptions = {
    'exp1.jpg': 'Flea market in Oakville',
    'exp2.jpg': 'Talking to Mayor Burton of Oakville at the flea market',
    'exp3.jpg': 'Flea market in Markham',
    'exp4.jpg': 'Flea market experience in Oakville',
    'exp5.jpg': 'Flea market in Milton',
    'exp6.jpg': 'Flea market in Milton',
    'exp7.jpg': 'Explaining our 3D printed creations to kids in Markham',
    'exp8.jpg': 'Explaining to curious customers in Oakville'
};

// History Image Lightbox Functionality
function toggleHistoryImage(imageSrc) {
    const lightbox = document.getElementById('historyLightbox');
    const expandedImage = document.getElementById('historyExpandedImage');
    const descriptionElement = document.getElementById('historyImageDescription');
    
    if (!lightbox) {
        console.error('Lightbox element not found');
        return;
    }
    
    if (!expandedImage) {
        console.error('Expanded image element not found');
        return;
    }
    
    if (imageSrc) {
        // Open lightbox or switch image
        expandedImage.src = imageSrc;
        // Set description
        if (descriptionElement) {
            descriptionElement.textContent = historyImageDescriptions[imageSrc] || '';
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        // Close lightbox
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            if (expandedImage) {
                expandedImage.src = '';
            }
            if (descriptionElement) {
                descriptionElement.textContent = '';
            }
        }, 300);
    }
}

// Make sure function is accessible globally
window.toggleHistoryImage = toggleHistoryImage;

