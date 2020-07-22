import { createPage } from '@mpxjs/core'

createPage({
  onLoad () {
    //
  },
  methods:{
    handleSearch(e:any){
      console.log(e,'sss');
      
    },
    handleCancel(){
      wx.navigateBack();
    }
  }
})
