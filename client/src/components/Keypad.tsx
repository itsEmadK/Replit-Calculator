import CalcButton from "./CalcButton";

interface KeypadProps {
  onDigitClick: (digit: string) => void;
  onOperationClick: (operation: string) => void;
  onEqualsClick: () => void;
  onClearClick: () => void;
  onToggleSignClick: () => void;
  onPercentageClick: () => void;
  onDecimalClick: () => void;
  onBackspaceClick: () => void;
}

const Keypad = ({
  onDigitClick,
  onOperationClick,
  onEqualsClick,
  onClearClick,
  onToggleSignClick,
  onPercentageClick,
  onDecimalClick,
  onBackspaceClick
}: KeypadProps) => {
  return (
    <div className="keypad grid grid-cols-4 gap-px">
      {/* Row 1 */}
      <CalcButton color="secondary" onClick={onClearClick}>
        AC
      </CalcButton>
      <CalcButton color="secondary" onClick={onToggleSignClick}>
        +/–
      </CalcButton>
      <CalcButton color="secondary" onClick={onPercentageClick}>
        %
      </CalcButton>
      <CalcButton color="primary" onClick={() => onOperationClick("divide")}>
        ÷
      </CalcButton>

      {/* Row 2 */}
      <CalcButton onClick={() => onDigitClick("7")}>7</CalcButton>
      <CalcButton onClick={() => onDigitClick("8")}>8</CalcButton>
      <CalcButton onClick={() => onDigitClick("9")}>9</CalcButton>
      <CalcButton color="primary" onClick={() => onOperationClick("multiply")}>
        ×
      </CalcButton>

      {/* Row 3 */}
      <CalcButton onClick={() => onDigitClick("4")}>4</CalcButton>
      <CalcButton onClick={() => onDigitClick("5")}>5</CalcButton>
      <CalcButton onClick={() => onDigitClick("6")}>6</CalcButton>
      <CalcButton color="primary" onClick={() => onOperationClick("subtract")}>
        –
      </CalcButton>

      {/* Row 4 */}
      <CalcButton onClick={() => onDigitClick("1")}>1</CalcButton>
      <CalcButton onClick={() => onDigitClick("2")}>2</CalcButton>
      <CalcButton onClick={() => onDigitClick("3")}>3</CalcButton>
      <CalcButton color="primary" onClick={() => onOperationClick("add")}>
        +
      </CalcButton>

      {/* Row 5 */}
      <CalcButton className="col-span-2" onClick={() => onDigitClick("0")}>
        0
      </CalcButton>
      <CalcButton onClick={onDecimalClick}>.</CalcButton>
      <CalcButton color="primary" onClick={onEqualsClick}>
        =
      </CalcButton>
    </div>
  );
};

export default Keypad;
