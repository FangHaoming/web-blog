<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    v-if="isShowPage"
  >
    <Navbar
      v-if="shouldShowNavbar"
      @toggle-sidebar="toggleSidebar"
    />

    <div
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    />

    <Sidebar
      :items="sidebarItems"
      @toggle-sidebar="toggleSidebar"
    >
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>

    <Home v-if="$page.frontmatter.home" />

    <Page
      v-else
      :sidebar-items="sidebarItems"
    >
      <template #top>
        <slot name="page-top" />
      </template>
      <template #bottom>
        <slot name="page-bottom" />
        <div class="theme-default-content red_container" v-if="isShowCustomer">
          <a class="read_count" href="https://www.baidu.com">👀浏览次数</a>
          <a class="read_count" href="https://www.baidu.com">👣登录人数</a>
          <!-- <float-tip/> -->
        </div>
        <Vssue :title="issueTitle" :key="issueTitle" class="theme-default-content content_default" />
      </template>
    </Page>
  </div>
</template>

<script>
import Home from '@theme/components/Home.vue'
import Navbar from '@theme/components/Navbar.vue'
import Page from '@theme/components/Page.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import { resolveSidebarItems } from './util'
import axios from 'axios'
import API from '../../api'

export default {
  name: 'Layout',

  components: {
    Home,
    Page,
    Sidebar,
    Navbar
  },

  data () {
    return {
      isSidebarOpen: false,
      issueTitle: '',
      isShowCustomer: true,
      isShowPage: true,
    }
  },

  computed: {
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false
        || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title
        || themeConfig.logo
        || themeConfig.repo
        || themeConfig.nav
        || this.$themeLocaleConfig.nav
      )
    },

    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home
        && frontmatter.sidebar !== false
        && this.sidebarItems.length
      )
    },

    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },

    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    }
  },

  mounted () {
    this.$router.beforeEach(() => {
      this.queryUser()
    })
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
      this.setIssueTitle()
      // axios.get('https://api.github.com/repos/FangHaoming/web-blog/issues/18/comments').then((res) => {
      //   // console.dir(res)
      // })
    })
  },

  methods: {
    setIssueTitle() {
      const url = decodeURI(window.document.location.toString())
      if(!url.includes('html')){
        this.issueTitle = url.split('/')[url.split('/').length-2]
      } else{
        this.issueTitle = url.substring(url.lastIndexOf('/')+1, url.lastIndexOf('.html'))
      }
    },
    setIsShowCustomerAndPage() {
      const url = decodeURI(window.document.location.toString())
      const notShowCustomer = [
        '/diary/',
      ]
      const notShowPage = [
        '/diary/',
      ]
      const authUser = [
        'FangHaoming',
      ]
      if (Array.prototype.some.call(notShowCustomer, (v) => url.includes(v))) {
        this.isShowCustomer = false
      } else {
        this.isShowCustomer = true
      }
      if (Array.prototype.some.call(notShowPage, (v) => url.includes(v)) && Array.prototype.some.call(authUser, (v) => this.userName === v)) {
        this.isShowPage = true
      } else {
        this.isShowPage = false
      }
    },
    async queryUser() {
      const { data: { login }} = await API.Github.queryUser()
      this.userName = login
      console.log(`userName:${login}`)
      this.setIsShowCustomerAndPage()
    },
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },

    // side swipe
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },

    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    }
  }
}
</script>

<style>
  .red_container {
    position: relative;
    padding: 50px 0 0 !important;
    display: flex;
    justify-content: space-between;
  }
  .read_count {
    margin: 0!important;
    display: inline-block;
    color: #3eaf7c;
  }
</style>