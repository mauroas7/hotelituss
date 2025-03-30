/**
 * Hotelituss - JavaScript Principal
 * Este archivo contiene todas las funcionalidades JavaScript del sitio web Hotelituss
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    initAOS();
    
    // Inicializar el mapa si existe el elemento
    initMap();
    
    // Configurar el modo oscuro
    setupDarkMode();
    
    // Configurar el botón de volver arriba
    setupBackToTop();
    
    // Configurar navegación suave
    setupSmoothScrolling();
    
    // Configurar modales
    setupModals();
    
    // Configurar validación de formularios
    setupFormValidation();
    
    // Inicializar tooltips de Bootstrap
    initTooltips();
    
    // Configurar animación de contadores
    setupCounterAnimation();
});

/**
 * Inicializa la biblioteca AOS para animaciones al hacer scroll
 */
function initAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

/**
 * Inicializa el mapa de Leaflet si existe el elemento en la página
 */
function initMap() {
    // Coordenadas de Avenida Emilio Civit 367, Mendoza, Argentina
    const hotelLatitude = -32.88789;
    const hotelLongitude = -68.855;

    if (document.getElementById('map')) {
        const map = L.map('map').setView([hotelLatitude, hotelLongitude], 15);

        // Agregar capa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Agregar un marcador para el hotel
        const hotelIcon = L.icon({
            iconUrl: 'https://cdn.mapmarker.io/api/v1/pin?size=50&background=%23c8a97e&icon=fa-hotel&color=%23FFFFFF',
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [0, -50]
        });

        L.marker([hotelLatitude, hotelLongitude], { icon: hotelIcon })
            .addTo(map)
            .bindPopup('<strong>Hotelituss</strong><br>Avenida Emilio Civit 367<br>Mendoza, Argentina')
            .openPopup();
    }
}

/**
 * Configura la funcionalidad del modo oscuro
 */
function setupDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const icon = this.querySelector('i');
            
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('darkMode', 'disabled');
            }
        });

        // Verificar preferencia de modo oscuro guardada
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeToggle.querySelector('i').classList.remove('fa-moon');
            darkModeToggle.querySelector('i').classList.add('fa-sun');
        }
    }
}

/**
 * Configura el botón de volver arriba
 */
function setupBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Mostrar/ocultar botón según la posición de scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        // Acción de volver arriba al hacer clic
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Configura la navegación suave para enlaces internos
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#' && document.querySelector(this.getAttribute('href'))) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Configura los modales de inicio de sesión y creación de usuario
 */
function setupModals() {
    // Manejar la apertura del modal de crear usuario
    const createUserLink = document.getElementById('createUserLink');
    if (createUserLink) {
        createUserLink.addEventListener('click', function(e) {
            e.preventDefault();
            var myModal = new bootstrap.Modal(document.getElementById('createUserModal'));
            myModal.show();
        });
    }

    // Manejar la apertura del modal de iniciar sesión
    const loginLink = document.getElementById('loginLink');
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            var loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
        });
    }

    // Cambiar de modal de inicio de sesión a crear usuario
    const switchToCreateUser = document.getElementById('switchToCreateUser');
    if (switchToCreateUser) {
        switchToCreateUser.addEventListener('click', function(e) {
            e.preventDefault();
            var loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            loginModal.hide();
            setTimeout(function() {
                var createUserModal = new bootstrap.Modal(document.getElementById('createUserModal'));
                createUserModal.show();
            }, 500);
        });
    }

    // Cambiar de modal de crear usuario a inicio de sesión
    const switchToLogin = document.getElementById('switchToLogin');
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            var createUserModal = bootstrap.Modal.getInstance(document.getElementById('createUserModal'));
            createUserModal.hide();
            setTimeout(function() {
                var loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
                loginModal.show();
            }, 500);
        });
    }
}

/**
 * Configura la validación de formularios
 */
function setupFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}

/**
 * Inicializa los tooltips de Bootstrap
 */
function initTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

/**
 * Configura la animación de contadores para números
 */
function setupCounterAnimation() {
    // Función para animar contadores
    function animateCounter(el, target) {
        let count = 0;
        const speed = 2000 / target; // 2 segundos para llegar al objetivo
        const counter = setInterval(() => {
            count++;
            el.textContent = count;
            if (count >= target) {
                clearInterval(counter);
            }
        }, speed);
    }
    
    // Iniciar animación cuando el elemento sea visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('years')) {
                animateCounter(entry.target, parseInt(entry.target.textContent));
                observer.unobserve(entry.target);
            }
        });
    });
    
    document.querySelectorAll('.years').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Maneja la navegación responsiva
 */
function handleResponsiveNav() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Cerrar menú al hacer clic en un enlace en móvil
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    bootstrap.Collapse.getInstance(navbarCollapse).hide();
                }
            });
        });
    }
}

/**
 * Detecta cuando la navbar debe cambiar de estilo al hacer scroll
 */
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Llamar a funciones adicionales
handleResponsiveNav();
handleNavbarScroll();
