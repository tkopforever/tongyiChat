import MessageInput from './MessageInput';
import MessageDisplay from './MessageDisplay';
import ModelSelect from './ModelSelect';
import './css/App.css'; 

function App() {
  return (
    <div className="App" >
      <ModelSelect/>
      <MessageDisplay/>
      <MessageInput/>
    </div>
  );
}

export default App;
