import './App.css';
import React from 'react';
import SpreadSheet from './container/SpreadSheet';

function App() {
  return (
    <div className="App">
      <SpreadSheet column={5} row={5} />
    </div>
  );
}

export default App;
