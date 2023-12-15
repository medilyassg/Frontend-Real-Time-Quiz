import QuizResults from './QuizResults'; 

const ScoreTable = () => {
  const participants = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      results: [true, false, true],
    },
    {
      name: 'Jane Doe',
      email: 'jane@example.com',
      results: [true, true, false],
    },
    {
      name: 'Jane Doe',
      email: 'jane@example.com',
      results: [true, true, false],
    },
    {
      name: 'Jane Doe',
      email: 'jane@example.com',
      results: [true, true, false],
    },
    {
      name: 'Jane Doe',
      email: 'jane@example.com',
      results: [true, true, false],
    },
    {
      name: 'Jane Doe',
      email: 'jane@example.com',
      results: [true, true, false],
    },
    {
      name: 'Jane Doe',
      email: 'jane@example.com',
      results: [true, true, false],
    },
    {
      name: 'Jane Doe',
      email: 'jane@example.com',
      results: [true, true, false],
    },
   
   
  ];

  return (
    <div className="App">
      <QuizResults participants={participants} />
    </div>
  );
};

export default ScoreTable;
