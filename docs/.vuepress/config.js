module.exports = {
    title: 'awesome-web',
    description: '个人学习用途的博客',
    base: '/docs/',
    themeConfig: {
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        nav: [
            { text: 'vue', link: '/vue/' },
            { text: 'react', link: '/react/' },
            { text: 'github', link: 'https://github.com/FangHaoming' },
        ],
        sidebar: {
            '/vue/': [
                '/vue/响应式原理',
            ],
            '/react/': [
                '/react/React Hooks',
                '/react/React的基本思想',
            ],
        }
    }
};
