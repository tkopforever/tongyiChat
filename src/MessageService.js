import {setComNowData} from './store/modules/comDataStore'
const url = '/api/v1/services/aigc/text-generation/generation';
const apiKey = 'sk-8cc8874d5a674b358c2ab63ace55ef96';
const historyContext = [];

export const SendMessage = async (userInput,dispatch,historyData,comNowData) => {
  // 将历史消息与当前用户输入合并 
  for(let i = 0;i<historyData.length;i++){
    historyContext.push({
      role: 'user',
      content: historyData[i].User
    })
    historyContext.push({
      role: 'assistant',
      content: historyData[i].AI
    })
  }
  if(comNowData.AI !== ''){
    historyContext.push({
      role: 'user',
      content: comNowData.User
    })
    historyContext.push({
      role: 'assistant',
      content: comNowData.AI
    })
  }
  const inputData = [...historyContext, { role: 'user', content: userInput }];
  
  const data = {
    model: 'qwen-turbo',
    input: {
      messages: inputData,
    },
    parameters: {
      incremental_output: true,
      result_format: 'message',
    },
  };

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    Accept: 'text/event-stream', // 启用SSE
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    const reader = response.body.getReader();
    // 处理 SSE 响应流
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const chunk = new TextDecoder().decode(value);
      const lines = chunk.split('\n'); // 按换行符分割处理每条消息
      lines.forEach((line) => {
        if (line.startsWith('data:')) {
          const jsonData = JSON.parse(line.slice(5)); // 去除 'data:' 前缀，然后解析 JSON 数据
          const assistantResponse = jsonData.output.choices[0]?.message.content.trim();
          dispatch(setComNowData(assistantResponse))
        }
      });
    }
  } catch (error) {
    console.error('Error sending message:', error);
    return '';
  }
};




// import { ChatAlibabaTongyi } from "@langchain/community/chat_models/alibaba_tongyi";

// const llm = new ChatAlibabaTongyi({
//   alibabaApiKey: "sk-8cc8874d5a674b358c2ab63ace55ef96",
//   temperature: 0.9,
//   stream: true, // 启用流式输出模式
// });
// const historyContext = [];
// let text = {}

// export const sendMessage = async (userInput) => {
//   text = {
//         role: 'user',
//         content : userInput
//         }
//   historyContext.push(text)
  
//   try {
//     const stream = await llm.invoke(userInput);
//       text = {
//       role: 'assistant',
//       content : stream.lc.kwargs.content
//     }
//     historyContext.push(text)
//     console.log(stream);
//   } catch (error) {
//     console.error("Error invoking model:", error);
//     // 处理模型调用错误
//   }
// };

