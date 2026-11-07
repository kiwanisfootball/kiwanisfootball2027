/* ==========================================================================
   KFL - COMPONENTES GLOBALES: MENÚ Y PIE DE PÁGINA
   Inyecta el menú en #globalNav y el pie en #globalFooter.
   Reemplaza a nav.html y footer.html (ya no se necesitan esos archivos).
   ========================================================================== */
(function () {
  /* Desregistra service workers viejos (causaban páginas con contenido antiguo, p. ej. en iPhone) */
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
      .then(function (regs) { regs.forEach(function (r) { r.unregister(); }); })
      .catch(function () {});
  }

  const NAV_HTML = `<nav class="navbar">
  <a href="index.html" class="nav-logo">
    <img src="assets/logos/KFL-Logo.svg" alt="Kiwanis Football League Panama">
  </a>

  <button class="hamburger-btn" id="hamburgerBtn" aria-label="Abrir Menú">&#9776;</button>

  <ul class="nav-menu" id="navMenu">
    <li><a href="index.html" data-page="index.html">HOME</a></li>
    <li><a href="conocenos.html" data-page="conocenos.html">CONÓCENOS</a></li>
    <li><a href="ligas.html" data-page="ligas.html">LIGAS</a></li>
    <li><a href="registro.html" data-page="registro.html">REGISTRO</a></li>
    <li><a href="fotos.html" data-page="fotos.html">FOTOS</a></li>
    <li><a href="mvp.html" data-page="mvp.html">MVP</a></li>
    <li><a href="campeones.html" data-page="campeones.html">CAMPEONES</a></li>
    <li><a href="total-access.html" data-page="total-access.html">TOTAL ACCESS</a></li>
    <li><a href="reglamento.html" data-page="reglamento.html">REGLAMENTO</a></li>
    <li><a href="coaches.html" data-page="coaches.html">PORTAL DE COACHES</a></li>
    <li><a href="informacion.html" data-page="informacion.html">INFORMACIÓN</a></li>
  </ul>
</nav>

<style>
  /* ESTILOS GLOBALES DEL NAV */
  .header-nav {
    width: 100%;
    background: #ffffff;
    box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .navbar {
    max-width: 1400px;
    margin: 0 auto;
    padding: 10px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
  }

  /* LOGO: Movido unos 20px a la izquierda de forma moderada y agrandado un 10% */
  .nav-logo {
    margin-left: -20px; 
    flex-shrink: 0;
  }

  .nav-logo img {
    height: 50px; 
    width: auto;
    object-fit: contain;
  }

  /* MENÚ: Centrado con distribución proporcional y flexible */
  .nav-menu {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    gap: 6px;
    margin: 0 15px;
    padding: 0;
  }

  .nav-menu li {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  /* BOTONES DEL MENÚ: Ancho relativo, centrados y con área de clic cómoda */
  .nav-menu li a {
    font-family: 'Avenir', sans-serif !important;
    font-size: 11.5px;
    font-weight: 800;
    color: #005EAA;
    text-decoration: none;
    text-transform: uppercase;
    white-space: nowrap;
    letter-spacing: 0.2px;
    padding: 8px 10px;
    text-align: center;
    width: 100%;
    border-radius: 6px;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .nav-menu li a:hover {
    background-color: #f1f5f9;
    color: #005EAA; 
  }

  /* ESTILO DE LA PÁGINA ACTIVA (Fondo azul institucional y texto blanco como indicabas) */
  .nav-menu li a.active {
    background-color: #005EAA !important;
    color: #ffffff !important;
  }

  .hamburger-btn {
    display: none;
    background: none;
    border: none;
    font-size: 24px;
    color: #005EAA;
    cursor: pointer;
  }

  /* RESPONSIVE MÓVILES */
  @media (max-width: 1250px) {
    .nav-logo {
      margin-left: 0;
    }

    .hamburger-btn {
      display: block;
    }

    .nav-menu {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background: #ffffff;
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
      padding: 15px 0;
      text-align: center;
      margin: 0;
    }

    .nav-menu.open {
      display: flex;
    }

    .nav-menu li {
      padding: 6px 15px;
      width: 100%;
    }

    .nav-menu li a {
      font-size: 14px;
      padding: 10px;
    }
  }
</style>
`;
  const FOOTER_HTML = `<footer class="site-footer">
  <div class="footer-container">
    
    <!-- Redes Sociales en Círculos -->
    <div class="footer-socials">
      <a href="https://www.instagram.com/kiwanisfootball" target="_blank" rel="noopener" aria-label="Instagram" class="social-circle-btn">
        <svg class="social-icon" viewBox="0 0 24 24" width="20" height="20"><path fill="#ffffff" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
      </a>

      <a href="https://www.youtube.com/@KFLTotalAccess/" target="_blank" rel="noopener" aria-label="YouTube" class="social-circle-btn">
        <svg class="social-icon" viewBox="0 0 24 24" width="20" height="20"><path fill="#ffffff" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      </a>
    </div>

    <!-- Títulos y Textos Institucionales -->
    <div class="footer-main-text">
      <p class="footer-title-copy">&copy; Kiwanis Football League 2026</p>
      <p class="footer-desc">
        Liga de Football Americano y Flag Football organizada por el <a href="https://www.instagram.com/kiwanispma" class="backlink-discreto" target="_blank" rel="noopener">Club Kiwanis de Panamá</a>.
      </p>
      <p class="footer-rights">TODOS LOS DERECHOS RESERVADOS.</p>
    </div>

    <!-- Logo inferior centrado -->
    <div class="footer-bottom-row">
      <div class="footer-logo-container">
        <img src="assets/logos/KFL-Logo.png" alt="KFL Logo" class="footer-brand-logo">
      </div>
    </div>

  </div>
</footer>

<style>
  .site-footer {
    background-color: #0b0f19;
    color: #94a3b8;
    padding: 25px 20px 20px 20px;
    font-family: 'Avenir', sans-serif !important;
    box-sizing: border-box;
    width: 100%;
  }

  .site-footer * {
    font-family: 'Avenir', sans-serif !important;
  }

  .footer-container {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 12px;
  }

  .footer-socials {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-bottom: 2px;
  }

  .social-circle-btn {
    width: 38px;
    height: 38px;
    background-color: #1e293b;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease, transform 0.2s ease;
    text-decoration: none;
  }

  .social-circle-btn:hover {
    background-color: #005EAA;
    transform: translateY(-2px);
  }

  .footer-main-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-width: 700px;
  }

  .footer-title-copy {
    color: #ffffff;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.5px;
    margin: 0;
  }

  .footer-desc {
    font-size: 14px;
    color: #94a3b8;
    line-height: 1.4;
    margin: 0;
  }

  .footer-rights {
    font-size: 14px;
    color:  #94a3b8;
    margin-top: 2px;
  }

  .footer-bottom-row {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    padding: 0 10px;
    box-sizing: border-box;
  }

  .footer-logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .footer-brand-logo {
    height: 30px;
    width: auto;
    object-fit: contain;
  }

  .backlink-discreto {
    color: inherit;
    text-decoration: none;
    cursor: text;
  }
</style>
`;

  function inicializar() {
    const navEl = document.getElementById('globalNav');
    if (navEl) {
      navEl.innerHTML = NAV_HTML;

      // Marcar la página activa (los <script> dentro de innerHTML no se ejecutan, por eso va aquí)
      const paginaActual = window.location.pathname.split('/').pop() || 'index.html';
      navEl.querySelectorAll('.nav-menu li a').forEach(function (link) {
        if (link.getAttribute('data-page') === paginaActual) link.classList.add('active');
      });

      // Botón de menú móvil
      const btn = navEl.querySelector('#hamburgerBtn');
      const menu = navEl.querySelector('#navMenu');
      if (btn && menu) {
        btn.addEventListener('click', function () { menu.classList.toggle('open'); });
      }
    }

    const footerEl = document.getElementById('globalFooter');
    if (footerEl) {
      footerEl.innerHTML = FOOTER_HTML;
    }

    inicializarVolverArriba();
  }


  /* ==========================================================================
     BOTÓN "VOLVER ARRIBA" (GLOBAL)
     Las reglas se inyectan aquí, así no dependen de css/styles.css publicado.
     Si la página ya trae #backToTopBtn, lo usa; si no, lo crea.
     ========================================================================== */
  const BACK_TO_TOP_CSS = `
    .back-to-top-btn {
      position: fixed;
      bottom: 25px;
      right: 25px;
      width: 48px;
      height: 48px;
      background-color: #005EAA;
      color: #ffffff;
      border: none;
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 999;
      padding: 0;
    }
    .back-to-top-btn.visible {
      opacity: 1;
      visibility: visible;
    }
    .back-to-top-btn:hover {
      background-color: #EB3D40;
      transform: translateY(-4px);
    }
    .back-to-top-btn svg {
      width: 22px;
      height: 22px;
      fill: currentColor;
      display: block;
    }
  `;

  const BACK_TO_TOP_SVG = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>';

  function inicializarVolverArriba() {
    // 1. Estilos (una sola vez)
    if (!document.getElementById('kfl-back-to-top-style')) {
      const style = document.createElement('style');
      style.id = 'kfl-back-to-top-style';
      style.textContent = BACK_TO_TOP_CSS;
      document.head.appendChild(style);
    }

    // 2. Botón (usa el de la página si existe; si no, lo crea)
    let btn = document.getElementById('backToTopBtn');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'backToTopBtn';
      btn.className = 'back-to-top-btn';
      btn.setAttribute('aria-label', 'Volver arriba');
      btn.innerHTML = BACK_TO_TOP_SVG;
      document.body.appendChild(btn);
    } else {
      btn.classList.add('back-to-top-btn');
      if (!btn.querySelector('svg')) btn.innerHTML = BACK_TO_TOP_SVG;
    }

    // 3. Comportamiento
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) btn.classList.add('visible');
      else btn.classList.remove('visible');
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializar);
  } else {
    inicializar();
  }
})();
