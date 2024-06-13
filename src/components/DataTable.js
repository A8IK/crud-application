import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/data';

const App = () => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        date: '',
        trade_code: '',
        high: '',
        low: '',
        open: '',
        close: '',
        volume: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 250;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(API_URL);
            setData(response.data);
        } 
        catch (error) {
            console.error('Error fetching data:', error);
        }
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
            const existingEntry = data.find(item => item.date === form.date && item.trade_code === form.trade_code);
            if (existingEntry) {
                await axios.put(API_URL, form);
            } 
            else {
                await axios.post(API_URL, form);
            }
            fetchData();
            alert("Submitted Successfully.");
        } 
        catch (error) {
            console.error('Error submitting data:', error);
        }
        setForm({
            date: '',
            trade_code: '',
            high: '',
            low: '',
            open: '',
            close: '',
            volume: ''
        });
    };

    const handleDelete = async (item) => {
        try {
            await axios.delete(API_URL, { data: item });
            fetchData();
            alert("Deleted Successfully.");
        } 
        catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleCellChange = (date, trade_code, name, value) => {
        const newData = data.map(item =>
            item.date === date && item.trade_code === trade_code
                ? { ...item, [name]: value }
                : item
        );
        setData(newData);
    };

    const handleSave = async (item) => {
        try {
            await axios.put(API_URL, item);
            fetchData();
            alert("Data saved.");
        } 
        catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    // Sorting data by year and month
    const sortData = (data) => {
        return data.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            const yearA = dateA.getFullYear();
            const yearB = dateB.getFullYear();

            const monthA = dateA.getMonth();
            const monthB = dateB.getMonth();

            if (yearA !== yearB) {
                return yearA - yearB;
            } else {
                return monthA - monthB;
            }
        });
    };

    const sortedData = useMemo(() => {
        return sortData(data);
    }, [data]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, sortedData]);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <div className="container mx-auto p-10 caret-red-500">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Data Table and Customization</h1>
            </div>
            <form onSubmit={handleSubmit} className="mb-8 border border-gray-300 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="date" placeholder="Date" value={form.date} onChange={handleChange} required className="input"/>
                    <input type="text" name="trade_code" placeholder="Trade Code" value={form.trade_code} onChange={handleChange} required className="input"/>
                    <input type="number" name="high" placeholder="High" value={form.high} onChange={handleChange} required className="input"/>
                    <input type="number" name="low" placeholder="Low" value={form.low} onChange={handleChange} required className="input"/>
                    <input type="number" name="open" placeholder="Open" value={form.open} onChange={handleChange} required className="input"/>
                    <input type="number" name="close" placeholder="Close" value={form.close} onChange={handleChange} required className="input"/>
                    <input type="number" name="volume" placeholder="Volume" value={form.volume} onChange={handleChange} required className="input"/>
                </div>
                <div className="flex justify-end mt-4">
                    <button type="submit" className="btn btn-primary hover:bg-gray-400 border-l-yellow-500">Submit</button>
                </div>
            </form>
            <div className="border border-gray-300 rounded-lg p-4">
                <div className="overflow-y-auto max-h-96">
                    <table className="table-auto w-full">
                        <thead className="sticky top-0 bg-white">
                            <tr>
                                {['Date', 'Trade Code', 'High', 'Low', 'Open', 'Close', 'Volume'].map((header, index) => (
                                    <th key={index} className="px-4 py-2">{header}</th>
                                ))}
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map(item => (
                                <tr key={`${item.date}-${item.trade_code}`}>
                                    {['date', 'trade_code', 'high', 'low', 'open', 'close', 'volume'].map(field => (
                                        <td key={field} className="border px-4 py-2">
                                            <input
                                                type={field === 'date' || field === 'trade_code' ? 'text' : 'number'}
                                                value={item[field]}
                                                onChange={(e) => handleCellChange(item.date, item.trade_code, field, e.target.value)}
                                                className="w-full"/>
                                        </td>
                                    ))}
                                    <td className="border px-4 py-2 flex items-center space-x-2">
                                        <button onClick={() => handleSave(item)} className="btn btn-secondary mr-2">Save</button>
                                        <button onClick={() => handleDelete(item)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'} mx-1`}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
