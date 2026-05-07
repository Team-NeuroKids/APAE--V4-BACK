import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "APAE V4 WIKI",
  description: "API Documentation & Rules",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Arquitetura', link: '/architecture/database' },
      { text: 'Módulos', link: '/modules/users' },
      { text: 'Features', link: '/docs/features' },
      { text: 'Changelog', link: '/docs/changelog' },
      { text: 'Contribuição', link: '/docs/contributing' }
    ],

    sidebar: [
      {
        text: 'Planejamento',
        items: [
          { text: 'Features Ideias', link: '/docs/features' },
          { text: 'Changelog', link: '/docs/changelog' }
        ]
      },
      {
        text: 'Arquitetura',
        items: [
          { text: 'Banco de Dados', link: '/architecture/database' },
          { text: 'Autenticação', link: '/architecture/auth' }
        ]
      },
      {
        text: 'Módulos',
        items: [
          { text: 'Usuários', link: '/modules/users' },
          { text: 'Crianças (Pacientes)', link: '/modules/children' },
          { text: 'Gamificação (Estatísticas)', link: '/modules/games' }
        ]
      },
      {
        text: 'Features',
        items: [
          { text: "Adições Futuras", link: '/docs/features' }
        ]
      },
      {
        text: 'Changelog',
        items: [
          { text: "Atualizaçoes", link: '/docs/changelog' }
        ]
      },
      {
        text: 'Contribuição',
        items: [
          { text: 'Como Contribuir', link: '/docs/contributing' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
