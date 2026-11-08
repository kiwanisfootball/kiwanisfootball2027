const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const outputFile = path.join(blogDir, 'index.json');

// Convierte DD/MM/AAAA (o AAAA-MM-DD) a AAAA-MM-DD para ordenar correctamente.
// Devuelve '' si el formato no se reconoce.
function toSortDate(raw) {
  if (!raw) return '';
  const s = String(raw).trim();

  let m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;

  m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;

  return '';
}

// Resuelve la ruta pública de la portada.
// - "/ruta" se deja igual
// - "assets/..." se convierte a "/assets/..."
// - solo nombre de archivo se busca dentro de la carpeta del post
function resolveCover(img, folder) {
  if (!img) return '';
  if (img.startsWith('/')) return img;
  if (img.startsWith('assets/')) return '/' + img;
  return `/blog/${folder}/${img}`;
}

function getPosts() {
  fs.mkdirSync(blogDir, { recursive: true });

  const folders = fs.readdirSync(blogDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  let posts = [];

  for (const folder of folders) {
    const indexPath = path.join(blogDir, folder, 'index.md');
    if (fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, 'utf8');

      const match = content.match(/^---[\s\S]*?---/);
      if (match) {
        const fm = match[0];
        const titleMatch = fm.match(/title:\s*["']?([^"'\n]+)["']?/);
        const dateMatch = fm.match(/date:\s*["']?([^"'\n]+)["']?/);
        const catMatch = fm.match(/category:\s*["']?([^"'\n]+)["']?/);
        const excerptMatch = fm.match(/excerpt:\s*["']?([^"'\n]+)["']?/);
        const imgMatch = fm.match(/coverImage:\s*["']?([^"'\n]+)["']?/);

        const date = dateMatch ? dateMatch[1].trim() : '';
        const coverRaw = imgMatch ? imgMatch[1].trim() : '';

        posts.push({
          slug: folder,
          title: titleMatch ? titleMatch[1].trim() : folder,
          date,                        // para mostrar: DD/MM/AAAA
          sortDate: toSortDate(date),  // para ordenar: AAAA-MM-DD
          category: catMatch ? catMatch[1].trim() : 'KFL',
          excerpt: excerptMatch ? excerptMatch[1].trim() : '',
          coverImage: resolveCover(coverRaw, folder)
        });
      }
    }
  }

  // Más reciente primero; el slug desempata
  posts.sort((a, b) => (b.sortDate || '').localeCompare(a.sortDate || '') || b.slug.localeCompare(a.slug));

  fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
  console.log('Índice de blog generado con éxito:', posts.length, 'artículos encontrados.');
}

getPosts();
