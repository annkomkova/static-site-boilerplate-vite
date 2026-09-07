import { fileURLToPath } from 'node:url'
import path from 'node:path'
// import fs from 'node:fs'
import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, 'src')
const outDir = path.resolve(__dirname, 'docs')

// чанки
const pages = {
  main: 'index.html'
  // styleguide: 'styleguide.html',
  // search: 'search.html',
  // articles: 'pages/articles.html',
  // dictionary: 'pages/dictionary.html',
  // tests: 'pages/tests.html',
  // theory: 'pages/theory.html',
  // reactBasics: 'pages/reactBasics.html',
  // article1: 'pages/articles/article1.html',
  // aloe: 'pages/articles/aloe.html',
  // cactus: 'pages/articles/cactus.html',
  // monstera: 'pages/articles/monstera.html',
  // orchidea: 'pages/articles/orchidea.html',
  // sansevieria: 'pages/articles/sansevieria.html',
  // test1: 'pages/tests/test1.html'
}

// sitemap.xml
// const sitemapPaths = [
//   '/static-site-09-25/index.html',
//   '/static-site-09-25/styleguide.html',
//   '/static-site-09-25/search.html',
//   '/static-site-09-25/pages/articles.html',
//   '/static-site-09-25/pages/dictionary.html',
//   '/static-site-09-25/pages/tests.html',
//   '/static-site-09-25/pages/theory.html',
//   '/static-site-09-25/pages/tests/test1.html',
//   '/static-site-09-25/pages/articles/article1.html',
//   '/static-site-09-25/pages/articles/aloe.html',
//   '/static-site-09-25/pages/articles/cactus.html',
//   '/static-site-09-25/pages/articles/monstera.html',
//   '/static-site-09-25/pages/articles/orchidea.html',
//   '/static-site-09-25/pages/articles/sansevieria.html',
//   '/static-site-09-25/pages/reactBasics.html'
// ]

// partials
// function htmlPartialsPlugin() {
//   const partials = {
//     analytics: fs.readFileSync(
//       path.resolve(root, 'partials/analytics.html'),
//       'utf-8'
//     ),
//     footerPartial: fs.readFileSync(
//       path.resolve(root, 'partials/footer.html'),
//       'utf-8'
//     )
//   }

//   return {
//     name: 'html-partials',
//     transformIndexHtml(html) {
//       html = html
//         .replace(/<analytics\s*\/?>(<\/analytics>)?/g, partials.analytics)
//         .replace(
//           /<footerPartial\s*\/?>(<\/footerPartial>)?/g,
//           partials.footerPartial
//         )

//       // костыль для partials, чтобы кодировка не слетала
//       const charsetMatch = html.match(/<meta[^>]+charset[^>]*>\s*/i)
//       if (charsetMatch) {
//         html = html.replace(charsetMatch[0], '')
//         html = html.replace(
//           /<head(\s[^>]*)?>/i,
//           (tag) => `${tag}\n    ${charsetMatch[0].trim()}`
//         )
//       }

//       return html
//     }
//   }
// }

// плагин для sitemap
// function sitemapPlugin({ base }) {
//   return {
//     name: 'sitemap',
//     apply: 'build',
//     closeBundle() {
//       const urls = sitemapPaths
//         .map((p) => `  <url><loc>${base}${p}</loc></url>`)
//         .join('\n')
//       const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
//       fs.mkdirSync(outDir, { recursive: true })
//       fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml)
//     }
//   }
// }

export default defineConfig(({ command }) => ({
  root,
  base: command === 'build' ? '/static-site-09-25/' : '/',
  plugins: [
    // react(),
    // htmlPartialsPlugin(),
    // sitemapPlugin({ base: 'https://annkomkova.github.io' })
  ],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(
        Object.entries(pages).map(([name, file]) => [
          name,
          path.resolve(root, file)
        ])
      )
    }
  },
  server: {
    open: true
  }
}))
