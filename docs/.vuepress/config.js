const path = require('path')
const fs = require('fs')
const docsPath = path.join(__dirname, '..')

const nav = []
const sidebar = {}

// const getIndex = function () {
//     // fs.stat(base, (err, stats) => {
//     //     console.log(base)
//     //     if (err) {
//     //         console.error(err)
//     //         return
//     //     }
//     //     stats.isFile() //true
//     //     stats.isDirectory() //false
//     //     return {}
//     // })
//     let files = fs.readdirSync(docsPath)
//     console.log(files)
//     return {}
// }
// console.log(docsPath)
// getIndex()

module.exports = {
    title: 'awesome-web',
    description: '个人学习用途博客',
    base: '/',
    themeConfig: {
        repo: 'Fanghaoming/web-blog',
        docsDir: 'docs',
        docsBranch: 'develop',
        editLinks: true,
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        nav: [
            { text: 'share', link: '/share/' },
            {
                text: 'algorithm', items: [
                    { text: '动态规划', link: '/share/' }
                ]
            },
            { text: 'vue', link: '/vue/' },
            { text: 'react', link: '/react/' },
        ],
        // sidebar: [
        //     {
        //         title: 'Group 1',   // 必要的
        //         path: '/vue/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        //         collapsable: true, // 可选的, 默认值是 true,
        //         sidebarDepth: 2,    // 可选的, 默认值是 1
        //         children: [
        //             '/share/CI_CD',
        //             '/share/客户端缓存',
        //         ]
        //     }
        // ]
        sidebar: {
            '/share/': [
                'CI_CD',
                '客户端缓存',
                'JS异步机制',
            ],
            '/vue/': [
                '响应式原理',
            ],
            '/react/': [
                'React Hooks',
                'React的基本思想',
            ],
        },
        // vssueConfig: {
        //     platform: 'github',
        //     ower: 'Fanghaoming',
        //     repo: 'web-blog',
        //     clientId: 'd8808fb381f7e94ba7c5',
        //     clientSecret: '96657e87462d5286b26a80fb19617a0d5392aae6',
        // }
    },
    plugins: {
        '@vssue/vuepress-plugin-vssue': {
            platform: 'github',
            owner: 'Fanghaoming',
            repo: 'web-blog',
            clientId: 'd8808fb381f7e94ba7c5',
            clientSecret: '96657e87462d5286b26a80fb19617a0d5392aae6',
            autoCreateIssue: true,
        },
    },
};
