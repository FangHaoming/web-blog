import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    router.afterEach(() => {
      console.log('afterEach')
    })
  },
  setup() { },
  rootComponents: [],
})