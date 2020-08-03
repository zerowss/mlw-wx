import { createPage } from '@mpxjs/core'
createPage({
  onLoad() {
    //
  },
  data: {
    is_bind_tel: true, //默认用户绑定过
    login_data: {},
  },
  methods: {
    handleGetUserInfo(e: any) {
      console.log('e-uer', e)
      const _this = this
      if (e.detail.errMsg === "getUserInfo:ok") {
        const { encryptedData, iv } = e.detail
        _this.isFirstLogin(encryptedData, iv);
      }
    },
    handleGetPhone(e: any) {
      console.log('e-phone', e)
      const _this = this
      if (e.detail.errMsg === "getPhoneNumber:ok") {
        const { encryptedData, iv, phone } = e.detail
        const _this = this
        wx.login({
          success(res: WechatMiniprogram.LoginSuccessCallbackResult) {
            console.log(res);
            if (res.errMsg === "login:ok") {
              _this.$get({
                url: '/customer/getWechatCode',
                data: {
                  encryptedData,
                  iv,
                  code: res.code
                }
              }).then(result => {
                console.log(result, 'resiu')

                
              })
            }
          }
        })
      }
    },
    // 是否首次登录
    isFirstLogin(encryptedData: string, iv: string, phone?: number) {
      const _this = this
      wx.login({
        success(res: WechatMiniprogram.LoginSuccessCallbackResult) {
          console.log(res);
          if (res.errMsg === "login:ok") {
            _this.$get({
              url: '/customer/checkUserHasRegister',
              data: {
                encryptedData,
                iv,
                code: res.code
              }
            }).then(result => {
              console.log(result, 'resiu')

              if (result.data.code == 0) {
                if (result.data.data == 1) { //绑定过
                  wx.switchTab({
                    url: '/pages/mine/inidex'
                  })
                } else {
                  _this.is_bind_tel = false
                  console.log(_this, 'ddddd');

                }
              }
            })
          }
        }
      })
    },
    login(encryptedData: string, iv: string, phone?: number) {
      const _this = this
      wx.login({
        success(res: WechatMiniprogram.LoginSuccessCallbackResult) {
          console.log(res);
          if (res.errMsg === "login:ok") {
            _this.$get({
              url: '/customer/operateMicroWxLogin',
              data: {
                encryptedData,
                iv,
                code: res.code,
                phone
              }
            }).then(result => {
              console.log(result, 'resiu')

              // if (result.data.code == 0) {
              //   if (result.data.data == 1) { //绑定过
              //     wx.switchTab({
              //       url: '/pages/mine/inidex'
              //     })
              //   } else {
              //     _this.is_bind_tel = false
              //     console.log(_this,'ddddd');

              //   }
              // }
            })
          }
        }
      })
    }
  }
})
