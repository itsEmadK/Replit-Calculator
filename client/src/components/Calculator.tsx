import Display from "./Display";
import Keypad from "./Keypad";
import { useCalculator } from "@/hooks/useCalculator";

const Calculator = () => {
  const {
    currentValue,
    previousOperation,
    handleDigit,
    handleOperation,
    handleEquals,
    handleClear,
    handleToggleSign,
    handlePercentage,
    handleDecimal,
    handleBackspace
  } = useCalculator();

  return (
    <div className="calculator max-w-xs w-full sm:w-96 mx-auto rounded-xl overflow-hidden shadow-2xl bg-black">
      <Display 
        currentValue={currentValue} 
        previousOperation={previousOperation} 
      />
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
    </div>
  );
};

export default Calculator;
