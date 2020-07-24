import { createPage } from '@mpxjs/core'
import { menuList } from './data'
createPage({
  onLoad() {
    this.userInfo = wx.getStorageSync('userInfo')
  },
  data: {
    menuList,
    userInfo: '' as any
  },
  computed: {
    isLogin() {
      return this.userInfo ? true : false
    },
    avatarUrl() {
      return this.userInfo ? this.userInfo.avatarUrl : 'http://xeme.oss-cn-shanghai.aliyuncs.com/wechat/img_touxiang.png'
    }
  },
  methods: {
    login() {
      if (this.isLogin) {
        return;
      }
      wx.navigateTo({
        url: '/pages/login/index'
      })
    }
  }
})
