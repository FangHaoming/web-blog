const path = require('path')
const fs = require('fs')
const docsPath = path.join(__dirname, '..')
const moment = require('moment');
require('dotenv').config()
const { defaultTheme } = require('vuepress')

// const { webpackBundler } = require('@vuepress/bundler-webpack')

const vssue = require('@vssue/vuepress-plugin-vssue')
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
    theme: defaultTheme({
        repo: 'Fanghaoming/web-blog',
        docsDir: 'docs',
        docsBranch: 'develop',
        editLinks: true,
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        navbar: [
            { text: 'share', link: '/share/' },
            {
                text: 'algorithm', children: [
                    { text: '动态规划', link: '/share/' }
                ]
            },
            { text: 'vue', link: '/vue/' },
            { text: 'react', link: '/react/' },
        ],
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
    }),
    plugins: [
        vssue({
            platform: 'github',
            owner: 'FangHaoming',
            repo: 'web-blog',
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            autoCreateIssue: true,
        }),
    ]
    // bundler: webpackBundler({
    //     chainWebpack: (config) => {
    //         config.module.rule('pug')
    //             .test(/\.pug$/)
    //             .use('pug-html-loader')
    //             .loader('pug-html-loader')
    //             .end()
    //     }
    // }),
};
