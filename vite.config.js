import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, 'src')
const outDir = path.resolve(__dirname, 'docs')

const pages = {
  main: {
    file: 'index.html',
    chunks: ['/javascripts/index.js', '/javascripts/basic.js']
  },
  aloe: {
    file: 'pages/articles/aloe.html',
    chunks: ['/javascripts/basic.js']
  },
  styleguide: {
    file: 'styleguide.html',
    chunks: ['/javascripts/basic.js']
  },
  search: {
    file: 'search.html',
    chunks: ['/javascripts/basic.js']
  },
  articles: {
    file: 'pages/articles.html',
    chunks: ['/javascripts/basic.js']
  },
  dictionary: {
    file: 'pages/dictionary.html',
    chunks: ['/javascripts/basic.js']
  },
  tests: {
    file: 'pages/tests.html',
    chunks: ['/javascripts/basic.js']
  },
  theory: {
    file: 'pages/theory.html',
    chunks: ['/javascripts/basic.js']
  },
  reactBasics: {
    file: 'pages/reactBasics.html',
    chunks: ['/javascripts/basic.js']
  },
  article1: {
    file: 'pages/articles/article1.html',
    chunks: ['/javascripts/basic.js']
  },
  cactus: {
    file: 'pages/articles/cactus.html',
    chunks: ['/javascripts/basic.js']
  },
  monstera: {
    file: 'pages/articles/monstera.html',
    chunks: ['/javascripts/basic.js']
  },
  orchidea: {
    file: 'pages/articles/orchidea.html',
    chunks: ['/javascripts/basic.js']
  },
  sansevieria: {
    file: 'pages/articles/sansevieria.html',
    chunks: ['/javascripts/basic.js']
  },
  test1: {
    file: 'pages/tests/test1.html',
    chunks: ['/javascripts/basic.js']
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
