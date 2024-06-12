import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/data';

const App = () => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        id: null,
        date: '',
        trade_code: '',
        high: '',
        low: '',
        open: '',
        close: '',
        volume: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axios.get(API_URL);
        setData(response.data);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (form.date && form.trade_code) {
                const existingEntry = data.find(item => item.date === form.date && item.trade_code === form.trade_code);
                if (existingEntry) {
                    await axios.put(API_URL, form);
                    alert("Submitted Successfully.");
                } 
                else {
                    await axios.post(API_URL, form);
                }
                fetchData();
                
            } 
            else {
                alert("Date and Trade Code are required.");
            }
        } 
        catch (error) {
            console.error('Error submitting data:', error);
        }
        setForm({
            id: null,
            date: '',
            trade_code: '',
            high: '',
            low: '',
            open: '',
            close: '',
            volume: ''
        });
        fetchData();
    };

    const handleEdit = (item) => {
        setForm(item);
    };

    const handleDelete = async (item) => {
        try {
            await axios.delete(API_URL, { data: item });
            fetchData();
            alert("Successfully Deleted Data.");
        }
        catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
    <div className="container mx-auto p-10">
            <h1 className="text-2xl font-bold mb-4">Data Customization & Table</h1>
            <div className="bg-gray-100 p-4 rounded shadow-md mb-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" name="date" placeholder="Date" value={form.date} onChange={handleChange} required className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        <input type="text" name="trade_code" placeholder="Trade Code" value={form.trade_code} onChange={handleChange} required className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        <input type="number" name="high" placeholder="High" value={form.high} onChange={handleChange} required className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        <input type="number" name="low" placeholder="Low" value={form.low} onChange={handleChange} required className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        <input type="number" name="open" placeholder="Open" value={form.open} onChange={handleChange} required className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        <input type="number" name="close" placeholder="Close" value={form.close} onChange={handleChange} required className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        <input type="number" name="volume" placeholder="Volume" value={form.volume} onChange={handleChange} required className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                </form>
            </div>
            <div className="bg-white p-4 rounded shadow-md">
                <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
                    <table className="table-auto w-full">
                        <thead className="sticky top-0 bg-white">
                            <tr>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Trade Code</th>
                                <th className="px-4 py-2">High</th>
                                <th className="px-4 py-2">Low</th>
                                <th className="px-4 py-2">Open</th>
                                <th className="px-4 py-2">Close</th>
                                <th className="px-4 py-2">Volume</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={`${item.date}-${item.trade_code}`}>
                                    <td className="border px-4 py-2">{item.date}</td>
                                    <td className="border px-4 py-2">{item.trade_code}</td>
                                    <td className="border px-4 py-2">{item.high}</td>
                                    <td className="border px-4 py-2">{item.low}</td>
                                    <td className="border px-4 py-2">{item.open}</td>
                                    <td className="border px-4 py-2">{item.close}</td>
                                    <td className="border px-4 py-2">{item.volume}</td>
                                    <td className="border px-4 py-2">
                                        <button onClick={() => handleEdit(item)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                                        <button onClick={() => handleDelete(item)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default App;

