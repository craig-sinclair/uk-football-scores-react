import './App.css';
import HomeScreen from './screens/home';
import ScottishPrem from './screens/scottishPrem';

function App() {
  return (
    <div className="App">
      <div className="home-div">
        <HomeScreen />
      </div>
      <div>
        <ScottishPrem />
      </div>
    </div>
  );
}

export default App;
