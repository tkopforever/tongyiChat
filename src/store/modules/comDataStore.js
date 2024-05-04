import {createSlice} from "@reduxjs/toolkit"
const comDataStore =  createSlice({
  //模块名
  name: 'comData',
  initialState:{
    //数据名 及其 初始值
    comHistoryData: [],
    comNowData: {
      User:'',
      AI:''
    },
    inputValue:'',
    model:'qwen-turbo'
  },
  reducers:{
    //修改状态的方法
    setComHistoryData(state,data){ //修改对话历史数据
      state.comHistoryData = [...state.comHistoryData,data.payload]
    },
    setComNowData(state,data){ // 修改当前对话数据，流式输出
      //console.log(data);
      state.comNowData.AI += data.payload
    },
    setComNowDataUser(state,data){ // 修改当前对话数据，用户输出
      state.comNowData.User = data.payload 
    },
    delComNowData(state){ //删除当前对话数据
      state.comNowData.User = ''
      state.comNowData.AI = ''
    },
    setInputValue(state,value){ // 修改输入框的值
      state.inputValue = value.payload
      //console.log(state.inputValue)
    },
    setModel(state,value){ //修改模型
      state.model = value.payload
    }
  }
})

//解构出来actionCreater函数
const {setComHistoryData, setComNowData, setInputValue , setComNowDataUser ,delComNowData, setModel} = comDataStore.actions
//获取reducer
const comDataReducer = comDataStore.reducer

// 以按需导出的方式导出actionCreater
export {setComHistoryData, setComNowData, setInputValue, setComNowDataUser,delComNowData,setModel}

//以默认导出的方式导出reducer
export default comDataReducer