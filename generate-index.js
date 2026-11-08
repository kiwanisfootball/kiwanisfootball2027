const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const outputFile = path.join(blogDir, 'index.json');

function getPosts() {
  // Garantiza que blog/ exista, incluso sin posts todavía
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

        posts.push({
          slug: folder,
          title: titleMatch ? titleMatch[1].trim() : folder,
          date: dateMatch ? dateMatch[1].trim() : '',
          category: catMatch ? catMatch[1].trim() : 'KFL',
          excerpt: excerptMatch ? excerptMatch[1].trim() : '',
          coverImage: imgMatch
            ? (imgMatch[1].trim().startsWith('assets/') ? '/' + imgMatch[1].trim() : imgMatch[1].trim())
            : ''
        });
      }
    }
  }

  // Más reciente primero según la fecha del frontmatter; el slug queda como desempate
  posts.sort((a, b) => (b.date || '').localeCompare(a.date || '') || b.slug.localeCompare(a.slug));

  fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
  console.log('Índice de blog generado con éxito:', posts.length, 'artículos encontrados.');
}

getPosts();
