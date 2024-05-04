import {configureStore} from "@reduxjs/toolkit"

//导入 子模块 reducer
import comDataReducer from "./modules/comDataStore"

const store = configureStore({
  reducer:{
    comData : comDataReducer
  }
})

export default store