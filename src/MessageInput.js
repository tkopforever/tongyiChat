import { SendMessage } from './MessageService';
import './css/MessageInput.css'; 
//输入框组件
import React, { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {setInputValue, setComNowDataUser,setComHistoryData,delComNowData} from './store/modules/comDataStore'
import { Input  } from 'antd';

function MessageInput() {
  const {inputValue, comHistoryData, comNowData} = useSelector(state => state.comData)
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const {Search } = Input;

  const handleSubmit = async () => {
    if (inputValue.trim() === ''){return}
    //更新当前列表到历史消息
    if(comNowData.AI !== ''){
      dispatch(setComHistoryData(comNowData))
      dispatch(delComNowData())
    }
    setLoading(true);
    try {
      dispatch(setComNowDataUser(inputValue)) 
      await SendMessage(inputValue,dispatch,comHistoryData,comNowData)
    } finally {
      dispatch(setInputValue('')) //清空输入框
      setLoading(false);
    }
  };

  return (
    <div className = "Search">
      <Search
      placeholder="请输入您的问题..."
      allowClear
      size="large"
      value={inputValue}
      onChange={(e)=>dispatch(setInputValue(e.target.value))}
      loading = {loading}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault(); // 阻止默认行为，如表单提交
          handleSubmit();
        }
      }}
    />
    </div>
  );
}

export default MessageInput;
