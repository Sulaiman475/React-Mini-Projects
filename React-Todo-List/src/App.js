import { TaskProvider } from './Contaxts/TaskContaxt';
import Main from './Main';
import './index.css';

function App() {
  return (
    <TaskProvider>
      <div className="container">
        <Main />
      </div>
    </TaskProvider>
  );
}

export default App;
