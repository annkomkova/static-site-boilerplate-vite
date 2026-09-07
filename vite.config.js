import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, 'src')
const outDir = path.resolve(__dirname, 'docs')

const pages = {
  main: {
    file: 'index.html',
    chunks: [
      '/javascripts/index.js',
      '/javascripts/basic.js',
      '/javascripts/searchVanilla.js'
    ]
  },
  styleguide: {
    file: 'styleguide.html',
    chunks: ['/javascripts/styleguide.js', '/javascripts/basic.js']
  },
  search: {
    file: 'search.html',
    chunks: ['/javascripts/searchModule.js', '/javascripts/basic.js']
  },
  articles: {
    file: 'pages/articles.html',
    chunks: [
      '/javascripts/menubar.jsx',
      '/javascripts/articles.js',
      '/javascripts/basic.js',
      '/javascripts/searchReact.jsx'
    ]
  },
  dictionary: {
    file: 'pages/dictionary.html',
    chunks: [
      '/javascripts/menubar.jsx',
      '/javascripts/index.js',
      '/javascripts/basic.js',
      '/javascripts/searchVanilla.js'
    ]
  },
  tests: {
    file: 'pages/tests.html',
    chunks: [
      '/javascripts/menubar.jsx',
      '/javascripts/filterTags.js',
      '/javascripts/basic.js',
      '/javascripts/searchVanilla.js'
    ]
  },
  theory: {
    file: 'pages/theory.html',
    chunks: ['/javascripts/theory.js', '/javascripts/basic.js']
  },
  reactBasics: {
    file: 'pages/reactBasics.html',
    chunks: ['/javascripts/basic.js', '/javascripts/reactBasics.jsx']
  },
  article1: {
    file: 'pages/articles/article1.html',
    chunks: ['/javascripts/index.js', '/javascripts/basic.js']
  },
  aloe: {
    file: 'pages/articles/aloe.html',
    chunks: ['/javascripts/searchVanilla.js', '/javascripts/basic.js']
  },
  cactus: {
    file: 'pages/articles/cactus.html',
    chunks: ['/javascripts/searchVanilla.js', '/javascripts/basic.js']
  },
  monstera: {
    file: 'pages/articles/monstera.html',
    chunks: ['/javascripts/searchVanilla.js', '/javascripts/basic.js']
  },
  orchidea: {
    file: 'pages/articles/orchidea.html',
    chunks: ['/javascripts/searchVanilla.js', '/javascripts/basic.js']
  },
  sansevieria: {
    file: 'pages/articles/sansevieria.html',
    chunks: ['/javascripts/searchVanilla.js', '/javascripts/basic.js']
  },
  test1: {
    file: 'pages/tests/test1.html',
    chunks: [
      '/pages/tests/test1.js',
      '/javascripts/basic.js',
      '/javascripts/searchVanilla.js'
    ]
  }
}

// путь файла (относительно root) -> список чанков, для быстрого поиска в плагине
const chunksByFile = Object.fromEntries(
  Object.values(pages).map(({ file, chunks }) => [file, chunks])
)

// --- плагин: подставляет <script type="module"> по карте chunksByFile ---
// (замена автоинжекта чанков из HtmlWebpackPlugin по chunks: [...])
function pageChunksPlugin() {
  return {
    name: 'page-chunks',
    transformIndexHtml(html, ctx) {
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

export default defineConfig(({ command }) => ({
  root,
  base: command === 'build' ? '/static-site-09-25/' : '/',
  plugins: [
    // react(),
    pageChunksPlugin()
    // htmlPartialsPlugin(),
    // sitemapPlugin({ base: 'https://annkomkova.github.io' })
  ],
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
