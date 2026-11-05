document.addEventListener("DOMContentLoaded", function() {
    const navHTML = `
        <header class="site-header" style="font-family: var(--fuente-cuerpo);">
            <nav class="main-nav" style="display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; padding: 12px 20px;">
                <div class="logo-container">
                    <a href="index.html" aria-label="KFL Inicio">
                        <img src="assets/img/KFL-logo.svg" alt="KFL Logo" class="kfl-nav-logo" style="height: 48px; width: auto; display: block;">
                    </a>
                </div>
                <button class="menu-toggle" aria-label="Abrir menú" aria-expanded="false" style="display: none; background: none; border: none; color: #005EAA; font-size: 28px; cursor: pointer;">
                    <span></span><span></span><span></span>
                </button>
                <ul class="nav-links" style="display: flex; list-style: none; gap: 6px; align-items: center;">
                    <li><a href="index.html" style="color: #005EAA; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; padding: 8px 14px; border-radius: 6px; text-transform: uppercase; display: inline-block;">Inicio</a></li>
                    <li><a href="conocenos.html" style="color: #005EAA; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; padding: 8px 14px; border-radius: 6px; text-transform: uppercase; display: inline-block;">Conocenos</a></li>
                    <li><a href="ligas.html" style="color: #005EAA; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; padding: 8px 14px; border-radius: 6px; text-transform: uppercase; display: inline-block;">Ligas</a></li>
                    <li><a href="reglamento.html" style="color: #005EAA; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; padding: 8px 14px; border-radius: 6px; text-transform: uppercase; display: inline-block;">Reglamento</a></li>
                    <li><a href="campeones.html" style="color: #005EAA; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; padding: 8px 14px; border-radius: 6px; text-transform: uppercase; display: inline-block;">Campeones</a></li>
                    <li><a href="mvp.html" style="color: #005EAA; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; padding: 8px 14px; border-radius: 6px; text-transform: uppercase; display: inline-block;">MVP</a></li>
                    <li><a href="registro.html" style="color: #005EAA; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; padding: 8px 14px; border-radius: 6px; text-transform: uppercase; display: inline-block;">Registro</a></li>
                    <li><a href="coaches.html" style="color: #005EAA; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; padding: 8px 14px; border-radius: 6px; text-transform: uppercase; display: inline-block;">Portal de Coaches</a></li>
                    <li><a href="total-access.html" style="color: #005EAA; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; padding: 8px 14px; border-radius: 6px; text-transform: uppercase; display: inline-block;">KFL Total Access</a></li>
                    <li><a href="fotos.html" style="color: #005EAA; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; padding: 8px 14px; border-radius: 6px; text-transform: uppercase; display: inline-block;">Fotos</a></li>
                    <li><a href="informacion.html" style="color: #005EAA; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; padding: 8px 14px; border-radius: 6px; text-transform: uppercase; display: inline-block;">Información</a></li>
                </ul>
            </nav>
        </header>
    `;

    const footerHTML = `
        <footer class="site-footer" style="font-family: var(--fuente-cuerpo); background-color: #0a0a0a; color: #ffffff; padding: 45px 20px 30px 20px; text-align: center;">
            <div class="footer-content" style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 16px;">
                <p style="font-size: 15px; color: #94a3b8; line-height: 1.7;">&copy; 2027 Kiwanis Football League. Todos los derechos reservados.</p>
                <div class="social-links">
                    <a href="https://youtube.com/@kiwanisfootball" target="_blank" rel="noopener" style="color: #005EAA; text-decoration: none; font-weight: 700;">YouTube</a>
                </div>
            </div>
        </footer>
    `;

    // Soporte para ambos nombres de contenedor
    const headerPlaceholder = document.getElementById('nav-placeholder') || 
                              document.getElementById('globalNav') || 
                              document.body.insertBefore(document.createElement('div'), document.body.firstChild);
    headerPlaceholder.innerHTML = navHTML;

    const footerPlaceholder = document.getElementById('footer-placeholder') || 
                              document.getElementById('globalFooter') || 
                              document.body.appendChild(document.createElement('div'));
    footerPlaceholder.innerHTML = footerHTML;

    // Resaltar la página activa automáticamente aplicando el fondo y color oficial
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.backgroundColor = "#005EAA";
            link.style.color = "#ffffff";
            link.style.fontWeight = "800";
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
