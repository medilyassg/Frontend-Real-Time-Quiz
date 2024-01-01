import React, { useEffect } from 'react';
import { IoIosCheckmark, IoIosClose, IoIosDownload } from 'react-icons/io';
import * as XLSX from 'xlsx';
import echo from '../../../config/echo';
import DotLoading from '../JoinGameComponents/DotLoading';

const QuizResults = ({ participants }) => {
  const roomCode = new URLSearchParams(location.search).get('roomId');

  useEffect(() => {
    echo.leave(`quiz-session-${roomCode}`);
    echo.leave(`next-question-${roomCode}`);
    document.cookie = "nickname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "Resultat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }, []);

  const exportToExcel = () => {
    if (!participants || participants.length === 0) {
      console.error("No participants or results available.");
      return;
    }
  
    // Get all unique question numbers from the participants
    const uniqueQuestions = [...new Set(participants.flatMap(participant => Object.keys(participant.score)))];
  
    // Create a custom worksheet for export
    const worksheet = XLSX.utils.json_to_sheet(
      participants.map((participant, index) => {
        const rowData = {
          id: index + 1,
          name: participant.name,
        };
  
        // Add columns dynamically based on available questions
        uniqueQuestions.forEach((question, indx) => {
          rowData[`Q${indx + 1}`] = participant.score[question] ? 'Correct' : 'Incorrect';
        });
  
        // Calculate total score
        rowData['Total Score'] = Object.values(participant.score).reduce((acc, score) => {
          if (typeof score === 'number') {
            return acc + score;
          } else if (score === 'Correct') {
            return acc + 1;
          }
          return acc;
        }, 0);
  
        return rowData;
      })
    );
  
    // Add headers
    const headers = ['ID', 'Name', ...uniqueQuestions.map((question, index) => `Q${index + 1}`), 'Total Score'];
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
  
    // Create workbook and download
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'QuizResults');
  
    // Additional styling and formatting (feel free to adjust as needed)
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell = worksheet[XLSX.utils.encode_cell({ r: 0, c: C })];
      cell.s = { ...cell.s, font: { bold: true } };
    }
  
    XLSX.writeFile(workbook, 'quiz_results.xlsx');
  };

  // Check if participants is empty
  if (!participants || participants.length === 0) {
    return (
      <DotLoading/>
    );
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b bg-gradient-to-tr from-blue-400 to-cyan-200">
      <div className="relative w-full p-8 mx-3 bg-white border border-blue-900 rounded-md shadow-md max-w-xxl">
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
          <h2 className="font-bold text-blue-500 text-1xl">Quiz Results</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">#</th>
                <th className="p-2 border">Name</th>
                {participants[0]?.score?.map((result, index) => (
                  <th key={index} className="p-2 border">
                    Q{index + 1}
                  </th>
                ))}
                <th className="p-2 border">
                Total Score
                  </th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{participant.name}</td>
                  {participant.score.map((item, indx) => (
                    <td key={indx} className={`border p-2 ${item ? 'bg-green-100' : 'bg-red-100'}`}>
                      {item ? <IoIosCheckmark className="text-2xl text-center text-green-500" /> : <IoIosClose className="text-lg text-red-500" />}
                    </td>
                  ))}
                  <td  className="p-2 border">
                      {participant.score.reduce(
                              (accumulator, currentValue) => accumulator + currentValue
                            )}
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

export default QuizResults;
