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
      { text: 'Contribuição', link: '/contributing' }
    ],

    sidebar: [
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
        text: 'Contribuição',
        items: [
          { text: 'Como Contribuir', link: '/contributing' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
