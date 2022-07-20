const path = require('path')
const fs = require('fs')
const docsPath = path.join(__dirname, '..')
const moment = require('moment');
require('dotenv').config()

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
            { text: 'TODO', link: '/todo/' },
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
    },
    plugins: {
        '@vssue/vuepress-plugin-vssue': {
            platform: 'github-v4',
            owner: process.env.OWNER,
            repo: process.env.REPO,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            autoCreateIssue: true,
        },
        '@vuepress/last-updated': {
            transformer: (timestamp, lang) => {
                const moment = require('moment')
                moment.locale(lang)
                return moment(timestamp).format('YYYY-MM-DD HH:mm')
            }
        },
    },
};
