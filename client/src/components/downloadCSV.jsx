import React from 'react';
import axios from 'axios';

function DownloadCSV(data) {
    const downloadData = () => {
        axios.post('http://localhost:5000/api/data/export', data)
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const a = document.createElement('a');
                a.href = url;
                a.download = 'users.csv';
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch(error => console.error('Error fetching CSV:', error));
    }
    return (
        <div>
            <button className='bg-gray-200 p-2 rounded hover:opacity-50' onClick={downloadData}>
                Export
            </button>
        </div>
    );
}

export default DownloadCSV;
