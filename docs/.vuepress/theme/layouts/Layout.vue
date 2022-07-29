<template>
  <div class="theme-container" :class="pageClasses" @touchstart="onTouchStart" @touchend="onTouchEnd" v-if="isShowPage">
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>

    <Home v-if="$page.frontmatter.home" />

    <Page v-else :sidebar-items="sidebarItems">
      <template #top>
        <slot name="page-top" />
      </template>
      <template #bottom>
        <slot name="page-bottom" />
        <div class="theme-default-content red_container" v-if="isShowCustomer">
          <a class="read_count" href="">👀浏览次数<span ref="lookCount"></span></a>
          <a class="read_count" href="">👣登录人数<span ref="loginCount"></span></a>
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
  import getAxios from '../../utils/getAxios.js'
  import {
    AUTHOR,
    TODO_READER,
    NOT_SHOW_PAGE,
    NOT_SHOW_CUSTOMER_PAGE,
    VUE_APP_AUTH
  } from '../../constants'

  export default {
    name: 'Layout',

    components: {
      Home,
      Page,
      Sidebar,
      Navbar
    },

    data() {
      return {
        isSidebarOpen: false,
        issueTitle: '',
        isShowCustomer: true,
        isShowPage: true,
        login: '',
      }
    },

    computed: {
      shouldShowNavbar() {
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

      shouldShowSidebar() {
        const { frontmatter } = this.$page
        return (
          !frontmatter.home
          && frontmatter.sidebar !== false
          && this.sidebarItems.length
        )
      },

      sidebarItems() {
        return resolveSidebarItems(
          this.$page,
          this.$page.regularPath,
          this.$site,
          this.$localePath
        )
      },

      pageClasses() {
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

    methods: {
      setIssueTitle() {
        const url = decodeURI(window.document.location.toString())
        if (!url.includes('html')) {
          this.issueTitle = url.split('/')[url.split('/').length - 2]
        } else {
          this.issueTitle = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.html'))
        }
      },
      toggleSidebar(to) {
        this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
        this.$emit('toggle-sidebar', this.isSidebarOpen)
      },

      // side swipe
      onTouchStart(e) {
        this.touchStart = {
          x: e.changedTouches[0].clientX,
          y: e.changedTouches[0].clientY
        }
      },
      onTouchEnd(e) {
        const dx = e.changedTouches[0].clientX - this.touchStart.x
        const dy = e.changedTouches[0].clientY - this.touchStart.y
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
          if (dx > 0 && this.touchStart.x <= 80) {
            this.toggleSidebar(true)
          } else {
            this.toggleSidebar(false)
          }
        }
      },
      getAuth() {
        return localStorage.getItem('Vssue.github.access_token')
      },
      async getLogin() {
        if (this.getAuth() && !this.login) {
          const res = await this.getGithubAxios().get('/user')
          const { data: { login } } = res
          this.login = login
        }
      },
      getGithubAxios(auth) {
        return getAxios(
          axios.create({
            baseURL: 'https://api.github.com/',
            headers: {
              authorization: auth ? 'token ' + auth : 'token ' + localStorage.getItem('Vssue.github.access_token')
            }
          })
        )
      },
      setIsShowPage(to) {
        if (NOT_SHOW_PAGE.includes(to.fullPath)) {
          this.isShowPage = false
        } else {
          this.isShowPage = true
        }
        if (TODO_READER.includes(this.login) && NOT_SHOW_PAGE.includes(to.fullPath)) {
          this.isShowPage = true
        }
      },
      setIsShowCustomer(to) {
        if (to && NOT_SHOW_CUSTOMER_PAGE.includes(to.fullPath) || !this.login) {
          this.isShowCustomer = false
        } else {
          this.isShowCustomer = true
        }
      },
      async getCount() {
        if (!this.getAuth()) return
        const res = await this.getGithubAxios().get('/repos/FangHaoming/web-blog/issues/comments/1190996607')
        const { data: { body } } = res
        if (!this.countObj) {
          this.countObj = JSON.parse(body)
          localStorage.setItem('countObj', body)
        }
        return body
      },
      setCount() {
        this.$nextTick(() => {
          if (this.$refs.lookCount) {
            this.$refs.lookCount.innerText = this.countObj.lookCount[this.issueTitle] || 0
            this.$refs.loginCount.innerText = this.countObj.loginMember.length
          }
        })
      },
      async updateCount() {
        this.countObj = JSON.parse(localStorage.getItem('countObj'))
        if (!this.login) return
        if (this.login === AUTHOR) return
        if (!this.countObj) return
        if (!this.countObj.lookCount[this.issueTitle]) {
          this.countObj.lookCount[this.issueTitle] = 1
        } else {
          this.countObj.lookCount[this.issueTitle]++
        }
        localStorage.setItem('countObj', JSON.stringify(this.countObj))
        this.setCount()
      },
      async updateRemoteCount() {
        if (!this.getAuth() || !this.countObj) return
        const res = await this.getCount()
        const oldObj = JSON.parse(res)
        const keys = new Set([...Reflect.ownKeys(oldObj.lookCount), ...Reflect.ownKeys(this.countObj.lookCount)]);
        [...keys].forEach((v) => {
          if (oldObj.lookCount[v]) {
            this.countObj.lookCount[v] = this.countObj.lookCount[v] ? Math.max(this.countObj.lookCount[v], oldObj.lookCount[v]) : oldObj.lookCount[v]
          } else {
            this.countObj.lookCount[v] = this.countObj.lookCount[v]
          }
        })
        this.countObj.loginMember = [...new Set([...oldObj.loginMember, this.login])]
        await this.getGithubAxios(VUE_APP_AUTH).patch('/repos/FangHaoming/web-blog/issues/comments/1190996607', { body: JSON.stringify(this.countObj) })
        localStorage.setItem('countObj', JSON.stringify(this.countObj))
        this.setCount()
      },
      async init() {
        this.setIssueTitle()
        await this.getLogin()
        await this.getCount()
        this.setCount()
      },
    },

    async mounted() {
      await this.init()
      this.setIsShowCustomer()
      this.$router.beforeEach(async (to, from, next) => {
        await this.getLogin()
        this.setIsShowPage(to)
        this.setIsShowCustomer(to)
        next()
      })
      this.$router.afterEach((to, from) => {
        this.isSidebarOpen = false
        this.setIssueTitle()
      })
    },

    watch: {
      issueTitle() {
        this.updateCount()
        this.updateRemoteCount()
      },
      login(val) {
        if(val && val !==  AUTHOR) {
          this.isShowCustomer = true
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
    justify-content: center;
  }

  .read_count {
    margin: 0 10px !important;
    display: inline-block;
    color: #3eaf7c;
    font-weight: 500;
  }

  .read_count>span {
    margin-left: 5px;
    color: #4e6e8e;
  }
</style>