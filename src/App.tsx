import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [playSound] = useState(() => new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...'));

  const handleNumber = (num: string) => {
    playSound.play();
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    playSound.play();
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    playSound.play();
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    playSound.play();
    setDisplay('0');
    setEquation('');
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80")',
      }}
    >
      <div className="bg-pink-50/90 p-8 rounded-3xl shadow-2xl backdrop-blur-sm w-96">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-pink-600 flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            さとり電卓
          </h1>
        </div>
        
        <div className="bg-white rounded-xl p-4 mb-6 shadow-inner">
          <div className="text-gray-500 text-sm h-6">{equation}</div>
          <div className="text-3xl font-bold text-gray-800 text-right">{display}</div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
            <button
              key={btn}
              onClick={() => {
                if (btn === '=') calculate();
                else if (['+', '-', '×', '÷'].includes(btn)) {
                  const op = btn === '×' ? '*' : btn === '÷' ? '/' : btn;
                  handleOperator(op);
                }
                else handleNumber(btn);
              }}
              className={`
                ${btn === '=' ? 'bg-pink-500 hover:bg-pink-600 text-white' : 'bg-white hover:bg-pink-50 text-pink-600'}
                h-14 rounded-xl shadow-sm font-semibold text-xl
                transition-all duration-200 active:scale-95
              `}
            >
              {btn}
            </button>
          ))}
          <button
            onClick={clear}
            className="col-span-4 bg-pink-100 hover:bg-pink-200 text-pink-600 h-12 rounded-xl mt-2 font-semibold"
          >
            クリア
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;