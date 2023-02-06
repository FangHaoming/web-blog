> "window" is not available during server side rendering.

You can also fix/ignore this error at the configuration level. This solution is more apt for the third-party modules/libraries/npms depending on the window object. You can customize your webpack configuration to replace these modules with a dummy module during server rendering.

To do that, open the gatsby-node.js file and add this at the end of the file,

```js
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /offending-module/,  // 安装的依赖node模块目录
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
```

The word offending-module has to be replaced with the actual module name. For example, if you are using auth0 with Gatsby, you can mention the module name as auth0-js in the above configuration. Using Webpack’s null loader, we will effectively ignore auth0-js during the build.

Reference: [Gatsby - the window is not defined error, what and how to fix it?](https://blog.greenroots.info/gatsby-the-window-is-not-defined-error-what-and-how-to-fix-it)