import Helpbox from './components/Helpbox/Helpbox'
import Navbar from './components/Navbar/Navbar'
import Report from './components/Report/Report'
import './App.css'
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Report/>
      <Helpbox/>
    </div>
  );
}

export default App;
