import './App.css';
import React from 'react';
import Spreadsheet from './container/SpreadSheet';

function App() {
    return (
        <div className="App">
            <Spreadsheet row={5}
                         column={5} />
        </div>
    );
}

export default App;
