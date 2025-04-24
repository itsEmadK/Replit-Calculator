import { useState, useEffect, useCallback } from "react";
import { formatNumberForDisplay } from "@/lib/utils";

// Define a history entry type
interface HistoryEntry {
  calculation: string;
  result: string;
  timestamp: Date;
}

interface CalculatorState {
  currentValue: string;
  previousValue: string | null;
  operation: string | null;
  resetOnNextDigit: boolean;
  scientificMode: boolean;
}

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>({
    currentValue: "0",
    previousValue: null,
    operation: null,
    resetOnNextDigit: false,
    scientificMode: false
  });

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [previousOperation, setPreviousOperation] = useState("");

  // Format numbers to avoid excessive decimal places
  const formatNumber = (num: number): string => {
    if (Number.isInteger(num)) {
      return num.toString();
    }
    
    // Convert to string with up to 10 decimal places to avoid floating point issues
    const strNum = num.toFixed(10);
    // Remove trailing zeros
    return parseFloat(strNum).toString();
  };

  // Toggle scientific mode
  const toggleScientificMode = () => {
    setState(prev => ({
      ...prev,
      scientificMode: !prev.scientificMode
    }));
  };

  // Update the previous operation display
  const updatePreviousOperationDisplay = useCallback(() => {
    if (state.previousValue === null) {
      setPreviousOperation("");
      return;
    }
    
    let operationSymbol = "";
    switch (state.operation) {
      case "add":
        operationSymbol = "+";
        break;
      case "subtract":
        operationSymbol = "–";
        break;
      case "multiply":
        operationSymbol = "×";
        break;
      case "divide":
        operationSymbol = "÷";
        break;
      case "power":
        operationSymbol = "^";
        break;
      case "root":
        operationSymbol = "√";
        break;
    }
    
    setPreviousOperation(`${state.previousValue} ${operationSymbol}`);
  }, [state.previousValue, state.operation]);

  useEffect(() => {
    updatePreviousOperationDisplay();
  }, [state.previousValue, state.operation, updatePreviousOperationDisplay]);

  // Add to history
  const addToHistory = (calculation: string, result: string) => {
    setHistory(prev => [
      {
        calculation,
        result,
        timestamp: new Date()
      },
      ...prev
    ]);
  };

  // Clear history
  const clearHistory = () => {
    setHistory([]);
  };

  // Perform the actual calculation based on current state
  const performCalculation = useCallback(() => {
    if (!state.previousValue || !state.operation) return;
    
    const prev = parseFloat(state.previousValue);
    const current = parseFloat(state.currentValue);
    let result: string | number;
    let calculationText = "";
    let operationSymbol = "";
    
    switch (state.operation) {
      case "add":
        result = prev + current;
        operationSymbol = "+";
        break;
      case "subtract":
        result = prev - current;
        operationSymbol = "–";
        break;
      case "multiply":
        result = prev * current;
        operationSymbol = "×";
        break;
      case "divide":
        if (current === 0) {
          result = "Error";
        } else {
          result = prev / current;
        }
        operationSymbol = "÷";
        break;
      case "power":
        result = Math.pow(prev, current);
        operationSymbol = "^";
        break;
      case "root":
        if (current <= 0) {
          result = "Error";
        } else {
          result = Math.pow(prev, 1 / current);
        }
        operationSymbol = "^(1/";
        break;
      default:
        return;
    }
    
    // Format the result
    const formattedResult = result === "Error" ? 
      result : 
      formatNumber(result as number);
    
    // Create calculation text for history
    if (state.operation === "root") {
      calculationText = `${prev} ${operationSymbol}${current})`;
    } else {
      calculationText = `${prev} ${operationSymbol} ${current}`;
    }
    
    // Add to history if result is valid
    if (formattedResult !== "Error") {
      addToHistory(calculationText, formattedResult);
    }
      
    setState(prev => ({
      ...prev,
      currentValue: formattedResult
    }));
  }, [state]);

  // Scientific functions
  const handleSin = () => {
    const value = parseFloat(state.currentValue);
    const result = Math.sin(value);
    const formattedResult = formatNumber(result);
    
    addToHistory(`sin(${value})`, formattedResult);
    
    setState(prev => ({
      ...prev,
      currentValue: formattedResult,
      resetOnNextDigit: true
    }));
  };

  const handleCos = () => {
    const value = parseFloat(state.currentValue);
    const result = Math.cos(value);
    const formattedResult = formatNumber(result);
    
    addToHistory(`cos(${value})`, formattedResult);
    
    setState(prev => ({
      ...prev,
      currentValue: formattedResult,
      resetOnNextDigit: true
    }));
  };

  const handleTan = () => {
    const value = parseFloat(state.currentValue);
    const result = Math.tan(value);
    const formattedResult = formatNumber(result);
    
    addToHistory(`tan(${value})`, formattedResult);
    
    setState(prev => ({
      ...prev,
      currentValue: formattedResult,
      resetOnNextDigit: true
    }));
  };

  const handleLog = () => {
    const value = parseFloat(state.currentValue);
    if (value <= 0) {
      setState(prev => ({
        ...prev,
        currentValue: "Error",
        resetOnNextDigit: true
      }));
      return;
    }
    
    const result = Math.log10(value);
    const formattedResult = formatNumber(result);
    
    addToHistory(`log(${value})`, formattedResult);
    
    setState(prev => ({
      ...prev,
      currentValue: formattedResult,
      resetOnNextDigit: true
    }));
  };

  const handleLn = () => {
    const value = parseFloat(state.currentValue);
    if (value <= 0) {
      setState(prev => ({
        ...prev,
        currentValue: "Error",
        resetOnNextDigit: true
      }));
      return;
    }
    
    const result = Math.log(value);
    const formattedResult = formatNumber(result);
    
    addToHistory(`ln(${value})`, formattedResult);
    
    setState(prev => ({
      ...prev,
      currentValue: formattedResult,
      resetOnNextDigit: true
    }));
  };

  const handlePi = () => {
    const result = Math.PI;
    const formattedResult = formatNumber(result);
    
    setState(prev => ({
      ...prev,
      currentValue: formattedResult,
      resetOnNextDigit: true
    }));
  };

  const handleE = () => {
    const result = Math.E;
    const formattedResult = formatNumber(result);
    
    setState(prev => ({
      ...prev,
      currentValue: formattedResult,
      resetOnNextDigit: true
    }));
  };

  const handleSquare = () => {
    const value = parseFloat(state.currentValue);
    const result = value * value;
    const formattedResult = formatNumber(result);
    
    addToHistory(`${value}²`, formattedResult);
    
    setState(prev => ({
      ...prev,
      currentValue: formattedResult,
      resetOnNextDigit: true
    }));
  };

  const handleCube = () => {
    const value = parseFloat(state.currentValue);
    const result = value * value * value;
    const formattedResult = formatNumber(result);
    
    addToHistory(`${value}³`, formattedResult);
    
    setState(prev => ({
      ...prev,
      currentValue: formattedResult,
      resetOnNextDigit: true
    }));
  };

  const handleSqrt = () => {
    const value = parseFloat(state.currentValue);
    if (value < 0) {
      setState(prev => ({
        ...prev,
        currentValue: "Error",
        resetOnNextDigit: true
      }));
      return;
    }
    
    const result = Math.sqrt(value);
    const formattedResult = formatNumber(result);
    
    addToHistory(`√${value}`, formattedResult);
    
    setState(prev => ({
      ...prev,
      currentValue: formattedResult,
      resetOnNextDigit: true
    }));
  };

  const handleCbrt = () => {
    const value = parseFloat(state.currentValue);
    const result = Math.cbrt(value);
    const formattedResult = formatNumber(result);
    
    addToHistory(`∛${value}`, formattedResult);
    
    setState(prev => ({
      ...prev,
      currentValue: formattedResult,
      resetOnNextDigit: true
    }));
  };

  const handlePower = () => {
    setState(prev => ({
      ...prev,
      previousValue: prev.currentValue,
      operation: "power",
      resetOnNextDigit: true
    }));
  };

  const handleRoot = () => {
    setState(prev => ({
      ...prev,
      previousValue: prev.currentValue,
      operation: "root",
      resetOnNextDigit: true
    }));
  };

  const handleFactorial = () => {
    const value = parseFloat(state.currentValue);
    
    if (value < 0 || !Number.isInteger(value)) {
      setState(prev => ({
        ...prev,
        currentValue: "Error",
        resetOnNextDigit: true
      }));
      return;
    }
    
    // Calculate factorial
    let result = 1;
    for (let i = 2; i <= value; i++) {
      result *= i;
    }
    
    const formattedResult = formatNumber(result);
    
    addToHistory(`${value}!`, formattedResult);
    
    setState(prev => ({
      ...prev,
      currentValue: formattedResult,
      resetOnNextDigit: true
    }));
  };

  // Handle digit button clicks
  const handleDigit = (digit: string) => {
    setState(prev => {
      if (prev.resetOnNextDigit) {
        return {
          ...prev,
          currentValue: digit,
          resetOnNextDigit: false
        };
      } else {
        // Replace 0 with digit or append to current value
        return {
          ...prev,
          currentValue: prev.currentValue === "0" ? 
            digit : 
            prev.currentValue + digit
        };
      }
    });
  };
  
  // Handle operation button clicks (+, -, ×, ÷)
  const handleOperation = (newOperation: string) => {
    // If we have a previous operation and value, perform the calculation
    if (state.previousValue !== null && !state.resetOnNextDigit) {
      performCalculation();
    }
    
    setState(prev => ({
      ...prev,
      previousValue: prev.currentValue,
      operation: newOperation,
      resetOnNextDigit: true
    }));
  };
  
  // Handle equals button click
  const handleEquals = () => {
    if (state.operation === null || state.previousValue === null) {
      return;
    }
    
    performCalculation();
    
    setState(prev => ({
      ...prev,
      previousValue: null,
      operation: null,
      resetOnNextDigit: true
    }));
  };
  
  // Handle clear button click
  const handleClear = () => {
    setState({
      currentValue: "0",
      previousValue: null,
      operation: null,
      resetOnNextDigit: false,
      scientificMode: state.scientificMode
    });
  };
  
  // Handle toggle sign button click (+/-)
  const handleToggleSign = () => {
    if (state.currentValue === "0" || state.currentValue === "Error") {
      return;
    }
    
    setState(prev => ({
      ...prev,
      currentValue: prev.currentValue.startsWith("-") ? 
        prev.currentValue.substring(1) : 
        "-" + prev.currentValue
    }));
  };
  
  // Handle percentage button click
  const handlePercentage = () => {
    if (state.currentValue === "Error") return;
    
    const value = parseFloat(state.currentValue);
    const result = value / 100;
    const formattedResult = formatNumber(result);
    
    addToHistory(`${value}%`, formattedResult);
    
    setState(prev => ({
      ...prev,
      currentValue: formattedResult
    }));
  };
  
  // Handle decimal point button click
  const handleDecimal = () => {
    setState(prev => {
      if (prev.resetOnNextDigit) {
        return {
          ...prev,
          currentValue: "0.",
          resetOnNextDigit: false
        };
      } else if (!prev.currentValue.includes(".")) {
        return {
          ...prev,
          currentValue: prev.currentValue + "."
        };
      }
      return prev;
    });
  };
  
  // Handle backspace button press
  const handleBackspace = () => {
    setState(prev => {
      if (prev.currentValue.length === 1 || 
          (prev.currentValue.length === 2 && prev.currentValue.startsWith("-"))) {
        return {
          ...prev,
          currentValue: "0"
        };
      } else {
        return {
          ...prev,
          currentValue: prev.currentValue.slice(0, -1)
        };
      }
    });
  };

  // Add keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      
      if (/^[0-9]$/.test(key)) {
        // Number keys
        handleDigit(key);
      } else if (key === ".") {
        // Decimal point
        handleDecimal();
      } else if (key === "+") {
        handleOperation("add");
      } else if (key === "-") {
        handleOperation("subtract");
      } else if (key === "*") {
        handleOperation("multiply");
      } else if (key === "/") {
        event.preventDefault(); // Prevent browser search
        handleOperation("divide");
      } else if (key === "^") {
        handlePower();
      } else if (key === "=" || key === "Enter") {
        event.preventDefault(); // Prevent form submission
        handleEquals();
      } else if (key === "Escape") {
        handleClear();
      } else if (key === "Backspace") {
        handleBackspace();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    currentValue: state.currentValue,
    previousOperation,
    scientificMode: state.scientificMode,
    history,
    handleDigit,
    handleOperation,
    handleEquals,
    handleClear,
    handleToggleSign,
    handlePercentage,
    handleDecimal,
    handleBackspace,
    toggleScientificMode,
    clearHistory,
    // Scientific functions
    handleSin,
    handleCos,
    handleTan,
    handleLog,
    handleLn,
    handlePi,
    handleE,
    handleSquare,
    handleCube,
    handleSqrt,
    handleCbrt,
    handlePower,
    handleRoot,
    handleFactorial
  };
};
