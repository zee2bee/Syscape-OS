"use client";

import React, { useState } from "react";

export default function CalculatorApp() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [isReset, setIsReset] = useState(true);

  const appendNumber = (num) => {
    if (display === "0" || isReset) {
      setDisplay(num);
      setIsReset(false);
    } else {
      if (display.length < 12) {
        setDisplay(display + num);
      }
    }
  };

  const appendDecimal = () => {
    if (isReset) {
      setDisplay("0.");
      setIsReset(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperator = (op) => {
    setEquation(`${display} ${op} `);
    setIsReset(true);
  };

  const calculate = () => {
    if (!equation || isReset) return;

    const fullEquation = equation + display;
    const tokens = fullEquation.split(" ");

    if (tokens.length < 3) return;

    const num1 = parseFloat(tokens[0]);
    const operator = tokens[1];
    const num2 = parseFloat(tokens[2]);

    let result = 0;
    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "×":
        result = num1 * num2;
        break;
      case "÷":
        result = num2 === 0 ? "ERROR" : num1 / num2;
        break;
      default:
        return;
    }

    if (typeof result === "number") {
      // Round to prevent long floating decimals overflowing screen
      result = Math.round(result * 1000000) / 1000000;
      setDisplay(result.toString());
    } else {
      setDisplay(result);
    }

    setEquation(fullEquation + " =");
    setIsReset(true);
  };

  const clearAll = () => {
    setDisplay("0");
    setEquation("");
    setIsReset(true);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-black/40 font-mono p-4 text-white rounded">
      {/* Calculation Screen Stack Display */}
      <div className="w-full bg-black/50 border border-white/10 rounded p-3 mb-4 flex flex-col justify-end items-end h-20 overflow-hidden relative">
        <div className="text-[10px] text-white/40 tracking-wider font-semibold truncate max-w-full">
          {equation || "STANDBY MATRIX NODE"}
        </div>
        <div className="text-2xl font-bold tracking-tight text-cyber-primary drop-shadow-[0_0_8px_rgba(0,255,255,0.4)] truncate max-w-full mt-1">
          {display}
        </div>
        <div className="absolute top-1 left-2 text-[8px] text-white/20 tracking-widest uppercase">
          CALC_CORE_v1.0
        </div>
      </div>

      {/* Button Layout Control Pad */}
      <div className="grid grid-cols-4 gap-2 flex-1 items-stretch">
        <button
          onClick={clearAll}
          className="col-span-2 rounded bg-cyber-secondary/10 border border-cyber-secondary/30 text-cyber-secondary hover:bg-cyber-secondary/30 transition-all font-bold text-xs flex items-center justify-center active:scale-95"
        >
          CLEAR SYSTEM
        </button>
        <button
          onClick={() => handleOperator("÷")}
          className="rounded bg-white/5 border border-white/10 hover:border-cyber-primary/40 text-cyber-primary hover:bg-cyber-primary/10 transition-all font-bold text-sm flex items-center justify-center active:scale-95"
        >
          ÷
        </button>
        <button
          onClick={() => handleOperator("×")}
          className="rounded bg-white/5 border border-white/10 hover:border-cyber-primary/40 text-cyber-primary hover:bg-cyber-primary/10 transition-all font-bold text-sm flex items-center justify-center active:scale-95"
        >
          ×
        </button>

        {["7", "8", "9"].map((n) => (
          <button
            key={n}
            onClick={() => appendNumber(n)}
            className="rounded bg-white/5 border border-white/5 hover:bg-white/10 text-white/80 transition-all text-xs flex items-center justify-center active:scale-95"
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => handleOperator("-")}
          className="rounded bg-white/5 border border-white/10 hover:border-cyber-primary/40 text-cyber-primary hover:bg-cyber-primary/10 transition-all font-bold text-sm flex items-center justify-center active:scale-95"
        >
          -
        </button>

        {["4", "5", "6"].map((n) => (
          <button
            key={n}
            onClick={() => appendNumber(n)}
            className="rounded bg-white/5 border border-white/5 hover:bg-white/10 text-white/80 transition-all text-xs flex items-center justify-center active:scale-95"
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => handleOperator("+")}
          className="rounded bg-white/5 border border-white/10 hover:border-cyber-primary/40 text-cyber-primary hover:bg-cyber-primary/10 transition-all font-bold text-sm flex items-center justify-center active:scale-95"
        >
          +
        </button>

        {["1", "2", "3"].map((n) => (
          <button
            key={n}
            onClick={() => appendNumber(n)}
            className="rounded bg-white/5 border border-white/5 hover:bg-white/10 text-white/80 transition-all text-xs flex items-center justify-center active:scale-95"
          >
            {n}
          </button>
        ))}
        <button
          onClick={calculate}
          className="row-span-2 rounded bg-gradient-to-b from-cyber-primary/20 to-cyber-primary/40 border border-cyber-primary/50 text-cyber-primary shadow-[0_0_10px_rgba(0,255,255,0.1)] hover:brightness-120 transition-all font-bold text-lg flex items-center justify-center active:scale-95"
        >
          =
        </button>

        <button
          onClick={() => appendNumber("0")}
          className="col-span-2 rounded bg-white/5 border border-white/5 hover:bg-white/10 text-white/80 transition-all text-xs flex items-center justify-center active:scale-95"
        >
          0
        </button>
        <button
          onClick={appendDecimal}
          className="rounded bg-white/5 border border-white/5 hover:bg-white/10 text-white/80 transition-all text-xs flex items-center justify-center active:scale-95"
        >
          .
        </button>
      </div>
    </div>
  );
}
