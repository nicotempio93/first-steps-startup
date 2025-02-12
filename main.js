// Add JS here

document.getElementById('toggle').addEventListener('change', function() {
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    if (this.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

// Añadir clase para animaciones cuando la página carga
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('dark-mode');
    document.querySelectorAll('.section').forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
    handleTableOfContents();
});

// Función para manejar el índice
function handleTableOfContents() {
    const sections = document.querySelectorAll('.section');
    const tocLinks = document.querySelectorAll('.toc-link');
    
    // Agregar IDs a las secciones si no existen
    sections.forEach((section, index) => {
        if (!section.id) {
            section.id = `section-${index + 1}`;
        }
    });

    // Función para actualizar el enlace activo
    function updateActiveLink() {
        const scrollPosition = window.scrollY;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.id;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Scroll suave al hacer clic en los enlaces
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Actualizar enlace activo al hacer scroll
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Inicializar
}
