import logo from './logo.svg';
import './App.css';
import InputForm from './inputform/InputForm';
import { useEffect } from 'react';

function App() {

  useEffect(()=>{
    console.log("inside useeffect of App");
  },[])
  const temp = 10;
  return (
    <div className="App">
      <InputForm />
      




      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

    </div>
  );
}

export default App;
