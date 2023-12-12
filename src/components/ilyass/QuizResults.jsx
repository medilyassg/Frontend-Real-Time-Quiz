import React from 'react';
import { IoIosCheckmark, IoIosClose, IoIosDownload } from 'react-icons/io';
import * as XLSX from 'xlsx';

const QuizResults = ({ participants }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(participants);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'QuizResults');
    XLSX.writeFile(workbook, 'quiz_results.xlsx');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b bg-gradient-to-tr from-blue-400 to-cyan-200 relative">


      <div className="bg-white p-8 border border-blue-900 rounded-md shadow-md w-full max-w-xxl mx-3 relative">
        <div className="absolute top-0 right-0 mt-4 mr-4">

          <button type="button"
            onClick={exportToExcel}
            className=" text-1xl font-bold text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full  p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
            <IoIosDownload />
            <span className="sr-only">Icon description</span>
          </button>
        </div>
        <div className="mb-4">
          <h2 className="text-1xl font-bold text-blue-500">Quiz Results</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">#</th>
                <th className="border p-2">Name</th>
                {participants[0].results.map((result, index) => (
                  <th key={index} className="border p-2">
                    Q{index + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {participants.map((participant, index) => (
                <tr key={index} className=" text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{participant.name}</td>
                  {participant.results.map((result, index) => (
                    <td key={index} className={`border p-2 ${result ? 'bg-green-100' : 'bg-red-100'} `}>
                      {result ? <IoIosCheckmark className="text-green-500 text-2xl text-center" /> : <IoIosClose className="text-red-500 text-lg" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
