import { createPage } from '@mpxjs/core'

createPage({
  data:{
    option1: [
      { text: '北京', value: 12 },
      { text: '天津', value: 13 },
    ],
    value1: 12,
    background: ['red','green','blue', 'yellow']
  },
  onLoad () {
    //
  }
})
