import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { fetchData } from '../services/dataService';

const Chart = () => {
  const [data, setData] = useState([]);
  const [tradeCode, setTradeCode] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  const filteredData = data.filter(d => d.trade_code === tradeCode);
  const dates = filteredData.map(d => d.date);
  const close = filteredData.map(d => d.close);
  const volume = filteredData.map(d => d.volume);

  const lineData = {
    labels: dates,
    datasets: [
      {
        label: 'Close',
        data: close,
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  const barData = {
    labels: dates,
    datasets: [
      {
        label: 'Volume',
        data: volume,
        backgroundColor: 'rgba(75,192,192,0.4)',
      },
    ],
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="bg-zinc-200 p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="tradeCode" className="block text-gray-700 text-xl font-semibold mb-4">Trade Code:</label>
          <select
            id="tradeCode"
            value={tradeCode}
            onChange={e => setTradeCode(e.target.value)}
            className="mt-border border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent">
            <option value="">Select Trade Code</option>
            {data.map(d => (
              <option key={d.trade_code} value={d.trade_code}>
                {d.trade_code}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Line Chart</h3>
          <Line data={lineData} />
        </div>
      </div>
      <div className="bg-neutral-300 p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Bar Chart</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default Chart;

