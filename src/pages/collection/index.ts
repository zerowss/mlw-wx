import { createPage } from '@mpxjs/core'
import Collection from '@/service/collection'
createPage({
  onLoad () {
    //
    this.houseInfoList = new Array(3).fill(1)
    this.getList()
  },
  data:{
    houseInfoList:[] as number[]
  },
  methods:{
    getList(){
      Collection.getList().then(res=>{
        console.log('res',res);
        
      })
    }
  }
})
