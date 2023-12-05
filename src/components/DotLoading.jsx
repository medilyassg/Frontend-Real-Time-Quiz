
const DotLoading = () => {
  const animationStyle = `
    @keyframes dot-bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    .dot {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin: 0 5px;
      animation: dot-bounce 1s infinite ease-in-out;
    }

    .dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .dot:nth-child(3) {
      animation-delay: 0.4s;
    }
  `;

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <style>{animationStyle}</style>
      <div className="flex">
        <div className="dot bg-blue-500"></div>
        <div className="dot bg-blue-500"></div>
        <div className="dot bg-blue-500"></div>
        <div className="dot bg-blue-500"></div>
      </div>
    </div>
  );
};

export default DotLoading;
