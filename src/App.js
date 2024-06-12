import React from 'react';
import DataTable from './components/DataTable';
import Chart from './components/Chart';
import LineBarChart from './components/LineBarChart';
import './App.css';

function App() {
  return (
  
      <div>
        <Chart/>
        <LineBarChart />
        <DataTable/>
      </div>
  );
}

export default App;

