document.addEventListener("DOMContentLoaded", function() {
    const navHTML = `
        <header class="site-header" style="font-family: var(--fuente-cuerpo);">
            <nav class="main-nav">
                <div class="logo-container">
                    <a href="index.html" aria-label="KFL Inicio">
                        <img src="assets/img/KFL-logo.svg" alt="KFL Logo" class="kfl-nav-logo">
                    </a>
                </div>
                <button class="menu-toggle" aria-label="Abrir menú" aria-expanded="false">
                    <span></span><span></span><span></span>
                </button>
                <ul class="nav-links">
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="conocenos.html">Conocenos</a></li>
                    <li><a href="ligas.html">Ligas</a></li>
                    <li><a href="reglamento.html">Reglamento</a></li>
                    <li><a href="campeones.html">Campeones</a></li>
                    <li><a href="mvp.html">MVP</a></li>
                    <li><a href="registro.html">Registro</a></li>
                    <li><a href="coaches.html">Portal de Coaches</a></li>
                    <li><a href="total-access.html">KFL Total Access</a></li>
                    <li><a href="fotos.html">Fotos</a></li>
                    <li><a href="informacion.html">Información</a></li>
                </ul>
            </nav>
        </header>
    `;

    const footerHTML = `
        <footer class="site-footer" style="font-family: var(--fuente-cuerpo);">
            <div class="footer-content">
                <p>&copy; 2027 Kiwanis Football League. Todos los derechos reservados.</p>
                <div class="social-links">
                    <a href="https://youtube.com/@kiwanisfootball" target="_blank" rel="noopener">YouTube</a>
                </div>
            </div>
        </footer>
    `;

    // Soporte para ambos nombres de contenedor (nav-placeholder o globalNav)
    const headerPlaceholder = document.getElementById('nav-placeholder') || 
                              document.getElementById('globalNav') || 
                              document.body.insertBefore(document.createElement('div'), document.body.firstChild);
    headerPlaceholder.innerHTML = navHTML;

    // Soporte para ambos nombres de contenedor (footer-placeholder o globalFooter)
    const footerPlaceholder = document.getElementById('footer-placeholder') || 
                              document.getElementById('globalFooter') || 
                              document.body.appendChild(document.createElement('div'));
    footerPlaceholder.innerHTML = footerHTML;

    // Resaltar la página activa automáticamente
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Toggle menú móvil con aria-expanded
    const toggleBtn = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener('click', () => {
            const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            toggleBtn.setAttribute('aria-expanded', !expanded);
            toggleBtn.classList.toggle('active');
            navLinks.classList.toggle('nav-active');
        });
    }
});
