const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const outputFile = path.join(blogDir, 'index.json');

function getPosts() {
  if (!fs.existsSync(blogDir)) {
    console.log('La carpeta blog/ no existe.');
    return;
  }
  
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
          title: titleMatch ? titleMatch[1] : folder,
          date: dateMatch ? dateMatch[1] : '',
          category: catMatch ? catMatch[1] : 'KFL',
          excerpt: excerptMatch ? excerptMatch[1] : '',
          coverImage: imgMatch ? (imgMatch[1].startsWith('assets/') ? '/' + imgMatch[1] : imgMatch[1]) : '/assets/img/KFL-logo.png'
        });
      }
    }
  }

  posts.sort((a, b) => b.slug.localeCompare(a.slug));
  
  // Asegura que la carpeta blog exista y escribe el JSON
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
  console.log('Índice de blog generado con éxito:', posts.length, 'artículos encontrados.');
}

getPosts();
