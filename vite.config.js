import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, 'src')
const outDir = path.resolve(__dirname, 'docs')

const pages = {
  main: {
    file: 'index.html',
    chunks: ['/javascripts/index.js', '/javascripts/allStyles.js']
  },
  aloe: {
    file: 'pages/articles/aloe.html',
    chunks: ['/javascripts/allStyles.js']
  },
  styleguide: {
    file: 'styleguide.html',
    chunks: ['/javascripts/allStyles.js']
  },
  search: {
    file: 'search.html',
    chunks: ['/javascripts/allStyles.js']
  },
  articles: {
    file: 'pages/articles.html',
    chunks: ['/javascripts/allStyles.js']
  },
  dictionary: {
    file: 'pages/dictionary.html',
    chunks: ['/javascripts/allStyles.js']
  },
  tests: {
    file: 'pages/tests.html',
    chunks: ['/javascripts/allStyles.js']
  },
  theory: {
    file: 'pages/theory.html',
    chunks: ['/javascripts/allStyles.js']
  },
  reactBasics: {
    file: 'pages/reactBasics.html',
    chunks: ['/javascripts/allStyles.js']
  },
  article1: {
    file: 'pages/articles/article1.html',
    chunks: ['/javascripts/allStyles.js']
  },
  cactus: {
    file: 'pages/articles/cactus.html',
    chunks: ['/javascripts/allStyles.js']
  },
  monstera: {
    file: 'pages/articles/monstera.html',
    chunks: ['/javascripts/allStyles.js']
  },
  orchidea: {
    file: 'pages/articles/orchidea.html',
    chunks: ['/javascripts/allStyles.js']
  },
  sansevieria: {
    file: 'pages/articles/sansevieria.html',
    chunks: ['/javascripts/allStyles.js']
  },
  test1: {
    file: 'pages/tests/test1.html',
    chunks: ['/javascripts/allStyles.js']
  }
}

const chunksByFile = Object.fromEntries(
  Object.values(pages).map(({ file, chunks }) => [file, chunks])
)

function pageChunksPlugin() {
  return {
    name: 'page-chunks',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const relFile = path
          .relative(root, ctx.filename)
          .split(path.sep)
          .join('/')
        const chunks = chunksByFile[relFile]
        if (!chunks) return html

        return {
          html,
          tags: chunks.map((src) => ({
            tag: 'script',
            attrs: { type: 'module', src },
            injectTo: 'body'
          }))
        }
      }
    }
  }
}

export default defineConfig(({ command }) => ({
  root,
  base: command === 'build' ? '/static-site-boilerplate-vite/' : '/',
  plugins: [pageChunksPlugin()],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(
        Object.entries(pages).map(([name, { file }]) => [
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
