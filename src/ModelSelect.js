import { Select } from "antd";
import {useDispatch} from 'react-redux'
import {setModel} from './store/modules/comDataStore'
function ModelSelect(){
  
  const dispatch = useDispatch()
  const handleChange = (value) => {
    dispatch(setModel(value))
  }
  return(
    <div className="ModelSelect">
      <Select
      defaultValue="qwen-turbo"
      style={{
        width: 240,
      }}
      onChange={handleChange}
      options={[
        {
          value: 'qwen-turbo',
          label: 'qwen-turbo',
        },
        {
          value: 'qwen-plus',
          label: 'qwen-plus',
        },
        {
          value: 'qwen-max',
          label: 'qwen-max',
        },
      ]}
    />
    </div>
    
  )
}

export default ModelSelect