import { createPage } from '@mpxjs/core'
import MyAppointment from '@/service/myAppointment'
createPage({
  onLoad() {
    //
    this.houseInfoList = new Array(3).fill(1)
  },
  onShow(){
    this.getList()
  },
  data: {
    tabsList: ['未完成的约看', '已完成的约看'],
    currentTabIndex: 0,
    houseInfoList:[] as number[]
  },
  methods: {
    onTabsItemTap(e: any) {
      const index = e.currentTarget.dataset.index
      this.currentTabIndex = index
    },
    getList(){
      MyAppointment.getList({
        reserv_status: this.currentTabIndex,
        page: 1,
        page_size: 10
      }).then(res=>{
        console.log(res,'resmyapp');
      })
    },
    // 取消预约
    handleCancel(){
      // MyAppointment.reserveHouseCancel({id: 1}).then(res=>{
        
      // })
    }
  }
})
