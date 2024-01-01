import React, { useEffect } from 'react';
import { IoIosCheckmark, IoIosClose, IoIosDownload } from 'react-icons/io';
import * as XLSX from 'xlsx';
import echo from '../../../config/echo';
import { api } from '../../../config/axios';

const QuizResults = ({ participants }) => {
  const roomCode = new URLSearchParams(location.search).get('roomId');

  useEffect(() => {
    echo.leave(`quiz-session-${roomCode}`);
    echo.leave(`next-question-${roomCode}`);

    const deleteCache = async () => {
      try {
        let response = await api.delete("/api/v1/delete-cache");
      } catch (e) {
        console.log("Error: ", e.response ? e.response.data.message : e.message);
      }
    };

    deleteCache().then(() => {
      document.cookie = "nickname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "Resultat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }).catch((e) => {
      console.log("Error : ", e.response ? e.response.data.message : e.message);
    });
  }, [roomCode]);

  const exportToExcel = () => {
    if (!participants || participants.length === 0) {
      console.error("No participants or results available.");
      return;
    }
  
    // Get all unique question numbers from the participants
    const uniqueQuestions = [...new Set(participants.flatMap(participant => Object.keys(participant.results)))];
  
    // Create a custom worksheet for export
    const worksheet = XLSX.utils.json_to_sheet(
      participants.map((participant, index) => {
        const rowData = {
          id: index + 1,
          name: participant.name,
        };
  
        // Add columns dynamically based on available questions
        uniqueQuestions.forEach(question => {
          rowData[`Q${question}`] = participant.results[question] ? 'Correct' : 'Incorrect';
        });
  
        return rowData;
      })
    );
  
    // Add headers
    const headers = ['ID', 'Name', ...uniqueQuestions.map(question => `Q${question}`)];
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
  
    // Create workbook and download
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'QuizResults');
    XLSX.writeFile(workbook, 'quiz_results.xlsx');
  };  

  // Check if participants is empty
  if (!participants || participants.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b bg-gradient-to-tr from-blue-400 to-cyan-200 relative">
        <div className="bg-white p-8 border border-blue-900 rounded-md shadow-md w-full max-w-xxl mx-3 relative">
          <div className="mb-4">
            <h2 className="text-1xl font-bold text-blue-500">Quiz Results</h2>
          </div>
          <p>No participants or results available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b bg-gradient-to-tr from-blue-400 to-cyan-200 relative">
      <div className="bg-white p-8 border border-blue-900 rounded-md shadow-md w-full max-w-xxl mx-3 relative">
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <button
            type="button"
            onClick={exportToExcel}
            className="text-1xl font-bold text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
          >
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
                {participants[0]?.results?.map((result, index) => (
                  <th key={index} className="border p-2">
                    Q{index + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {participants.map((participant, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{participant.name}</td>
                  {participant.results.map((result, index) => (
                    <td key={index} className={`border p-2 ${result ? 'bg-green-100' : 'bg-red-100'}`}>
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
