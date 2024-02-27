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
    title: '方浩铭的个人网站',
    description: "FangHaoming's Personal Website",
    base: '/web-blog/',
    port: '5000',
    themeConfig: {
        repo: 'Fanghaoming/web-blog',
        docsDir: 'docs',
        docsBranch: 'master',
        editLinks: true,
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        nav: [
            { text: 'share', link: '/share/' },
            {
                text: 'hybrid', items: [
                    { text: '小程序', link: '/hybrid/小程序.md' }
                ]
            },
            {
                text: 'algorithm', items: [
                    { text: '数据结构', link: '/algorithm/data-structure/' },
                    { text: '算法', link: '/algorithm/algorithm/' },
                    { text: '思维', link: '/algorithm/logic/' },
                ]
            },
            { text: 'vue', link: '/vue/' },
            { text: 'react', link: '/react/' },
            {
                text: 'promotion', items: [
                    { text: '系统设计', link: '/promotion/system-design.md' }
                ]
            },
        ],
        sidebar: [
            {
                title: '算法',   // 必要的
                path: '/algorithm/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    {
                        title: '算法思维',
                        path: '/algorithm/logic/',
                        children: [
                            {
                                title: '动态规划',
                                path: '/algorithm/logic/动态规划',
                            },
                            {
                                title: '双指针',
                                path: '/algorithm/logic/双指针',
                            },
                            {
                                title: '回溯法',
                                path: '/algorithm/logic/回溯法',
                            },
                            {
                                title: '数学',
                                path: '/algorithm/logic/数学',
                            },
                            {
                                title: '滑动窗口',
                                path: '/algorithm/logic/滑动窗口',
                            },
                        ]
                    }
                ]
            }
        ]
        // sidebar: {
        //     '/share/': [
        //         'CI_CD',
        //         '客户端缓存',
        //         'JS异步机制',
        //     ],
        //     '/vue/': [
        //         '响应式原理',
        //     ],
        //     '/react/': [
        //         'React Hooks',
        //         'React的基本思想',
        //     ],
        //     '/algorithm/': [
        //         '动态规划',
        //         '双指针',
        //         '回溯法',
        //     ]
        // },
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
