import { defineClientConfig } from '@vuepress/client'
import {
  FloatTip
} from './FloatTip.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('float-tip', FloatTip)
    router.afterEach(() => {
      console.log('afterEach')
    })
  },
  setup() { },
  rootComponents: [],
})