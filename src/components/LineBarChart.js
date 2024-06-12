import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const API_URL = 'http://localhost:5000/data';

const LineBarChart = () => {
    const [data, setData] = useState([]);
    const [tradeCodes, setTradeCodes] = useState([]);
    const [selectedTradeCode, setSelectedTradeCode] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const uniqueTradeCodes = [...new Set(data.map(item => item.trade_code))];
            setTradeCodes(uniqueTradeCodes);
            setSelectedTradeCode(uniqueTradeCodes[0]);
        }
    }, [data]);

    const fetchData = async () => {
        const response = await axios.get(API_URL);
        setData(response.data);
    };

    const handleTradeCodeChange = (e) => {
        setSelectedTradeCode(e.target.value);
    };

    const filteredData = data.filter(item => item.trade_code === selectedTradeCode);

    const chartData = {
        labels: filteredData.map(item => item.date),
        datasets: [
            {
                type: 'line',
                label: 'Close',
                data: filteredData.map(item => item.close),
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                fill: false,
                yAxisID: 'y-axis-1'
            },
            {
                type: 'bar',
                label: 'Volume',
                data: filteredData.map(item => item.volume),
                backgroundColor: 'rgba(153,102,255,0.2)',
                borderColor: 'rgba(153,102,255,1)',
                borderWidth: 1,
                yAxisID: 'y-axis-2'
            }
        ]
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                labels: filteredData.map(item => item.date),
            },
            'y-axis-1': {
                type: 'linear',
                position: 'left'
            },
            'y-axis-2': {
                type: 'linear',
                position: 'right',
                grid: {
                    drawOnChartArea: false
                }
            }
        }
    };

    return (
        <div className="grid grid-cols-2 gap-4 p-4">
            <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                <h1 className="text-xl font-semibold mb-4">Trade Data Chart</h1>
                <div className="mb-4">
                    <label htmlFor="tradeCode" className="block">Select Trade Code:</label>
                    <select id="tradeCode" value={selectedTradeCode} onChange={handleTradeCodeChange} className="border p-2 rounded-md bg-white">
                        {tradeCodes.map(code => (
                            <option key={code} value={code}>{code}</option>
                        ))}
                    </select>
                </div>
                <Line data={chartData} options={options} />
            </div>
            <div className="bg-amber-200 p-4 rounded-lg shadow-md">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default LineBarChart;
