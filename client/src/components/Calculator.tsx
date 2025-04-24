import { useState } from "react";
import Display from "./Display";
import Keypad from "./Keypad";
import ScientificKeypad from "./ScientificKeypad";
import History from "./History";
import { useCalculator } from "@/hooks/useCalculator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Calculator = () => {
  const {
    currentValue,
    previousOperation,
    scientificMode,
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
  } = useCalculator();

  const [showHistory, setShowHistory] = useState(false);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className={cn(
      "calculator mx-auto rounded-xl overflow-hidden shadow-2xl bg-black",
      scientificMode ? "max-w-lg w-full sm:w-[500px]" : "max-w-xs w-full sm:w-96"
    )}>
      <div className="flex items-center justify-between p-2 bg-gray-900">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={toggleScientificMode}
          className="text-white hover:text-white hover:bg-gray-800"
        >
          {scientificMode ? "Basic" : "Scientific"}
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={toggleHistory}
          className="text-white hover:text-white hover:bg-gray-800"
        >
          {showHistory ? "Hide History" : "Show History"}
        </Button>
      </div>
      
      {showHistory && (
        <div className="history-container max-h-64 overflow-y-auto bg-gray-900">
          <History 
            historyEntries={history} 
            onClearHistory={clearHistory}
          />
        </div>
      )}
      
      <Display 
        currentValue={currentValue} 
        previousOperation={previousOperation} 
      />
      
      {scientificMode ? (
        <ScientificKeypad 
          onDigitClick={handleDigit}
          onOperationClick={handleOperation}
          onEqualsClick={handleEquals}
          onClearClick={handleClear}
          onToggleSignClick={handleToggleSign}
          onPercentageClick={handlePercentage}
          onDecimalClick={handleDecimal}
          onBackspaceClick={handleBackspace}
          onSinClick={handleSin}
          onCosClick={handleCos}
          onTanClick={handleTan}
          onLogClick={handleLog}
          onLnClick={handleLn}
          onPiClick={handlePi}
          onEClick={handleE}
          onSquareClick={handleSquare}
          onCubeClick={handleCube}
          onSqrtClick={handleSqrt}
          onCbrtClick={handleCbrt}
          onPowerClick={handlePower}
          onRootClick={handleRoot}
          onFactorialClick={handleFactorial}
        />
      ) : (
        <Keypad 
          onDigitClick={handleDigit}
          onOperationClick={handleOperation}
          onEqualsClick={handleEquals}
          onClearClick={handleClear}
          onToggleSignClick={handleToggleSign}
          onPercentageClick={handlePercentage}
          onDecimalClick={handleDecimal}
          onBackspaceClick={handleBackspace}
        />
      )}
    </div>
  );
};

export default Calculator;
