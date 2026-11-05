document.addEventListener("DOMContentLoaded", function() {
    const navHTML = `
        <header class="site-header">
            <nav class="main-nav">
                <div class="logo-container">
                    <a href="index.html"><img src="assets/logos/kfl-logo.png" alt="KFL Logo"></a>
                </div>
                <button class="menu-toggle" aria-label="Abrir menú" aria-expanded="false">
                    <span></span><span></span><span></span>
                </button>
                <ul class="nav-links">
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="ligas.html">Ligas</a></li>
                    <li><a href="campeones.html">Campeones</a></li>
                    <li><a href="mvp.html">MVP</a></li>
                    <li><a href="coaches.html">Coaches</a></li>
                    <li><a href="reglamento.html">Reglamento</a></li>
                    <li><a href="registro.html">Registro</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="contacto.html">Contacto</a></li>
                    <li><a href="faq.html">FAQ</a></li>
                </ul>
            </nav>
        </header>
    `;

    const footerHTML = `
        <footer class="site-footer">
            <div class="footer-content">
                <p>&copy; 2027 Kiwanis Football League. Todos los derechos reservados.</p>
                <div class="social-links">
                    <a href="https://youtube.com/@kiwanisfootball" target="_blank" rel="noopener">YouTube</a>
                </div>
            </div>
        </footer>
    `;

    // Inyectar componentes si existen los contenedores o al inicio/final del body
    const headerPlaceholder = document.getElementById('nav-placeholder') || document.body.insertBefore(document.createElement('div'), document.body.firstChild);
    headerPlaceholder.innerHTML = navHTML;

    const footerPlaceholder = document.getElementById('footer-placeholder') || document.body.appendChild(document.createElement('div'));
    footerPlaceholder.innerHTML = footerHTML;

    // Lógica para resaltar la página activa de forma automática
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
            const expanded = toggleBtn.getAttribute('aria-expanded') === 'true' || false;
            toggleBtn.setAttribute('aria-expanded', !expanded);
            navLinks.classList.toggle('nav-active');
        });
    }
});
