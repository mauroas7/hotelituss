document.addEventListener('DOMContentLoaded', () => {
    initAOS();
    initMap();
    setupDarkMode();
    setupBackToTop();
    setupSmoothScrolling();
    setupModals();
    setupFormValidation();
    initTooltips();
    setupCounterAnimation();
    handleResponsiveNav();
    handleNavbarScroll();
});

function initAOS() {
    AOS.init({ duration: 1000, once: true, offset: 100 });
}

function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    const coords = [-32.88789, -68.855];
    try {
        const map = L.map('map').setView(coords, 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        const hotelIcon = L.icon({
            iconUrl: 'https://cdn.mapmarker.io/api/v1/pin?size=50&background=%23c8a97e&icon=fa-hotel&color=%23FFFFFF',
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [0, -50]
        });

        L.marker(coords, { icon: hotelIcon }).addTo(map)
            .bindPopup('<strong>Hotelituss</strong><br>Avenida Emilio Civit 367<br>Mendoza, Argentina')
            .openPopup();

        setTimeout(() => map.invalidateSize(), 500);
    } catch (e) {
        console.error('Error al inicializar el mapa:', e);
    }
}

function setupDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    if (!toggle) return;

    const icon = toggle.querySelector('i');
    const applyMode = (enabled) => {
        document.body.classList.toggle('dark-mode', enabled);
        if (icon) {
            icon.classList.toggle('fa-moon', !enabled);
            icon.classList.toggle('fa-sun', enabled);
        }
    };

    toggle.addEventListener('click', () => {
        const enabled = !document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
        applyMode(enabled);
    });

    applyMode(localStorage.getItem('darkMode') === 'enabled');
}

function setupBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('show', window.scrollY > 300);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function setupModals() {
    const modalPairs = [
        { linkId: 'createUserLink', modalId: 'createUserModal' },
        { linkId: 'loginLink', modalId: 'loginModal' }
    ];

    modalPairs.forEach(({ linkId, modalId }) => {
        const link = document.getElementById(linkId);
        const modalEl = document.getElementById(modalId);
        if (link && modalEl) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                new bootstrap.Modal(modalEl).show();
            });
        }
    });

    const switchModal = (fromId, toId) => {
        const fromModal = document.getElementById(fromId);
        const toModal = document.getElementById(toId);
        if (!fromModal || !toModal) return;

        const switchBtn = document.getElementById(`switchTo${toId.replace('Modal', '')}`);
        if (switchBtn) {
            switchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const fromInstance = bootstrap.Modal.getInstance(fromModal);
                if (fromInstance) {
                    fromInstance.hide();
                    setTimeout(() => new bootstrap.Modal(toModal).show(), 500);
                }
            });
        }
    };

    switchModal('loginModal', 'createUserModal');
    switchModal('createUserModal', 'loginModal');
}

function setupFormValidation() {
    document.querySelectorAll('.needs-validation').forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
}

function initTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    try {
        [...tooltipTriggerList].forEach(el => new bootstrap.Tooltip(el));
    } catch (e) {
        console.error('Error al inicializar tooltips:', e);
    }
}

function setupCounterAnimation() {
    const animateCounter = (el, target) => {
        let count = 0;
        const step = 2000 / target;
        const interval = setInterval(() => {
            el.textContent = ++count;
            if (count >= target) clearInterval(interval);
        }, step);
    };

    const animateIfVisible = (el) => {
        const target = parseInt(el.textContent) || 0;
        if (target > 0) animateCounter(el, target);
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.classList.contains('years')) {
                    animateIfVisible(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        document.querySelectorAll('.years').forEach(el => observer.observe(el));
    } else {
        document.querySelectorAll('.years').forEach(animateIfVisible);
    }
}

function handleResponsiveNav() {
    const toggler = document.querySelector('.navbar-toggler');
    const collapse = document.querySelector('.navbar-collapse');

    if (toggler && collapse) {
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    try {
                        const bsCollapse = bootstrap.Collapse.getInstance(collapse);
                        bsCollapse ? bsCollapse.hide() : collapse.classList.remove('show');
                    } catch (e) {
                        collapse.classList.remove('show');
                    }
                }
            });
        });
    }
}

function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const updateNavbar = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };

    window.addEventListener('scroll', updateNavbar);
    updateNavbar();
}

// ========== API Backend ==========

const backendBaseUrl = 'https://hotelitus.onrender.com';

function createReserva(data) {
    fetch(`${backendBaseUrl}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        console.log('✅ Reserva creada:', result);
        alert('Reserva creada con éxito.');
    })
    .catch(error => {
        console.error('❌ Error al crear la reserva:', error);
        alert('Error al crear la reserva.');
    });
}

function getReservas() {
    fetch(`${backendBaseUrl}/select`)
    .then(res => res.json())
    .then(data => {
        console.log('📋 Reservas obtenidas:', data);
        // TODO: mostrar los datos en la UI
    })
    .catch(error => {
        console.error('❌ Error al obtener reservas:', error);
        alert('Error al obtener reservas.');
    });
}

function updateReserva(id, nuevoNombre) {
    fetch(`${backendBaseUrl}/update?id=${id}&nombre=${encodeURIComponent(nuevoNombre)}`)
    .then(res => res.json())
    .then(result => {
        console.log('🔄 Reserva actualizada:', result);
        alert('Reserva actualizada con éxito.');
    })
    .catch(error => {
        console.error('❌ Error al actualizar la reserva:', error);
        alert('Error al actualizar la reserva.');
    });
}

<script>
document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    const loginLink = document.getElementById("loginLink");
    const createUserLink = document.getElementById("createUserLink");
    const logoutLink = document.getElementById("logoutLink");

    if (isLoggedIn) {
        loginLink.style.display = "none";
        createUserLink.style.display = "none";
        logoutLink.style.display = "inline-block";
    } else {
        loginLink.style.display = "inline-block";
        createUserLink.style.display = "inline-block";
        logoutLink.style.display = "none";
    }

    logoutLink.addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        window.location.reload(); // refresca la página para reflejar el cambio
    });
});
</script>
