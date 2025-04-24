import { useState, useEffect, useCallback } from "react";

interface CalculatorState {
  currentValue: string;
  previousValue: string | null;
  operation: string | null;
  resetOnNextDigit: boolean;
}

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>({
    currentValue: "0",
    previousValue: null,
    operation: null,
    resetOnNextDigit: false
  });

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
    }
    
    setPreviousOperation(`${state.previousValue} ${operationSymbol}`);
  }, [state.previousValue, state.operation]);

  useEffect(() => {
    updatePreviousOperationDisplay();
  }, [state.previousValue, state.operation, updatePreviousOperationDisplay]);

  // Perform the actual calculation based on current state
  const performCalculation = useCallback(() => {
    if (!state.previousValue || !state.operation) return;
    
    const prev = parseFloat(state.previousValue);
    const current = parseFloat(state.currentValue);
    let result: string | number;
    
    switch (state.operation) {
      case "add":
        result = prev + current;
        break;
      case "subtract":
        result = prev - current;
        break;
      case "multiply":
        result = prev * current;
        break;
      case "divide":
        if (current === 0) {
          result = "Error";
        } else {
          result = prev / current;
        }
        break;
      default:
        return;
    }
    
    // Format the result
    const formattedResult = result === "Error" ? 
      result : 
      formatNumber(result as number);
      
    setState(prev => ({
      ...prev,
      currentValue: formattedResult
    }));
  }, [state]);

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
      resetOnNextDigit: false
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
    
    setState(prev => ({
      ...prev,
      currentValue: formatNumber(value / 100)
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
    handleDigit,
    handleOperation,
    handleEquals,
    handleClear,
    handleToggleSign,
    handlePercentage,
    handleDecimal,
    handleBackspace
  };
};
