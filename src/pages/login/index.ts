import { createPage } from '@mpxjs/core'

createPage({
  onLoad() {
    //
    console.log(this, '=====');

  },
  data: {
    is_bind_tel: true, //默认用户绑定过
    login_data: {},
    avatarUrl: 'http://xeme.oss-cn-shanghai.aliyuncs.com/wechat/img_touxiang.png', //默认头像
  },
  methods: {
    handleGetUserInfo(e: any) {
      console.log('e', e)
      const _this = this
      if (e.detail.errMsg === "getUserInfo:ok") {
        const { encryptedData, iv } = e.detail
        _this.login(encryptedData, iv);
      }
    },
    handleGetPhone(e: any) {
      const _this = this
      if (e.detail.errMsg === "getPhoneNumber:ok") {
        const { encryptedData, iv } = e.detail
        _this.login(encryptedData, iv);
      }
    },
    login(encryptedData: string, iv: string, phone?: number) {
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
              wx.navigateTo({
                url: '/pages/login/loninPhone/index'
              })
              if (result.code == 0) {
                if (result.data == 1) { //绑定过
                  wx.switchTab({
                    url: '/pages/mine/inidex'
                  })
                } else {
                  _this.is_bind_tel = false
                }
              }
            })

            // wx.request({
            //   url: 'https://thirdtest.mlwplus.com/customer/checkUserHasRegister',
            //   method:'GET',
            //   data:{
            //     code: res.code
            //   },
            //   dataType: 'json',
            //   success(res) {
            //     console.log(res);
            //   }
            // })
          }
        }
      })
    }
  }
})
