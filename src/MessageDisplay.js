// 模型输出显示组件
import React from 'react';
import './css/MessageDisplay.css'; // 导入外部 CSS 文件
import {useSelector} from 'react-redux'

function MessageDisplay() {
  const {comNowData, comHistoryData} = useSelector(state => state.comData)
  //输出框数据 = 历史聊天数据 + 当前流式聊天数据
  function modelOutput(){
    let output = ``
    if (comHistoryData.length !== 0 ){
      for(let i=0;i<comHistoryData.length;i++){
        output += `User: `+ comHistoryData[i].User + `\n`
        output += `AI: ` + comHistoryData[i].AI+ `\n`
      }
    }
    if(comNowData.User !== ''){
      output += `User: `+ comNowData.User + `\n`
      output += `AI: ` + comNowData.AI+ `\n`
    }
    return output
  }
  return (
    <div className="output-box">
      {modelOutput()}
    </div>
  );
}

export default MessageDisplay;

