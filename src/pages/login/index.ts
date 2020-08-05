import { createPage } from '@mpxjs/core'
createPage({
  onLoad() {
    //
  },
  data: {
    is_bind_tel: true, //默认用户绑定过
    login_data: {},
    wxCode: '',
    session_info: {
      openid: '',
      session_key: ''
    },
    wx_info: {} as any
  },
  methods: {
    handleGetUserInfo(e: any) {
      console.log('e-uer', e)
      const _this = this
      if (e.detail.errMsg === "getUserInfo:ok") {
        const { encryptedData, iv } = e.detail
        _this.isFirstLogin();
      }
    },
    handleGetPhone(e: any) {
      if (e.detail.errMsg === "getPhoneNumber:ok") {
        const { encryptedData, iv } = e.detail
        this.login(encryptedData, iv)
      }
    },
    // 是否首次登录
    isFirstLogin(phone?: number) {
      const _this = this
      wx.login({
        success(res: WechatMiniprogram.LoginSuccessCallbackResult) {
          if (res.errMsg === "login:ok") {
            _this.wxCode = res.code
            wx.getUserInfo({
              withCredentials: true,
              success(resUser: any) {
                _this.$get({
                  url: '/customer/checkUserHasRegister',
                  data: {
                    encryptedData: resUser.encryptedData,
                    iv: resUser.iv,
                    code: res.code
                  }
                }).then(result => {
                  if (result.data.code == 0) {
                    if (result.data.data.has_register == 1) { //绑定过
                      wx.setStorageSync('userInfo', result.data.data.wx_info)
                      wx.setStorageSync('token', result.data.data.token_info.token_seed)
                      wx.switchTab({
                        url: '/pages/mine/index'
                      })
                    } else {
                      _this.is_bind_tel = false
                      _this.session_info = result.data.data.session_info
                      _this.wx_info = result.data.data.wx_info
                    }
                  }
                })
              }
            })

          }
        }
      })
    },
    login(encryptedData: string, iv: string, phone?: number) {
      const _this = this
      this.$get({
        url: '/customer/operateMicroWxLogin',
        data: {
          encryptedData,
          iv,
          session_key: this.session_info.session_key,
          open_id: this.wx_info.openId,
          nickname: this.wx_info.nickName,
          sex: this.wx_info.gender,
          headimgurl: this.wx_info.avatarUrl
        }
      }).then(result => {
        if (result.data.code == 0) {
          const _data = result.data.data
          _this.wx_info.phone = _data.account_info.phone
          wx.setStorageSync('userInfo', _this.wx_info)
          wx.setStorageSync('token', _data.token_seed)
          wx.switchTab({
            url: '/pages/mine/index'
          })
        }
      })
    },
    // 跳转
    handleJump(e: any) {
      const url = e.target.dataset.path
      wx.navigateTo({
        url
      })
    }
  }
})
