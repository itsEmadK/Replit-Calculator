import CalcButton from "./CalcButton";

interface ScientificKeypadProps {
  onDigitClick: (digit: string) => void;
  onOperationClick: (operation: string) => void;
  onEqualsClick: () => void;
  onClearClick: () => void;
  onToggleSignClick: () => void;
  onPercentageClick: () => void;
  onDecimalClick: () => void;
  onBackspaceClick: () => void;
  onSinClick: () => void;
  onCosClick: () => void;
  onTanClick: () => void;
  onLogClick: () => void;
  onLnClick: () => void;
  onPiClick: () => void;
  onEClick: () => void;
  onSquareClick: () => void;
  onCubeClick: () => void;
  onSqrtClick: () => void;
  onCbrtClick: () => void;
  onPowerClick: () => void;
  onRootClick: () => void;
  onFactorialClick: () => void;
}

const ScientificKeypad = ({
  onDigitClick,
  onOperationClick,
  onEqualsClick,
  onClearClick,
  onToggleSignClick,
  onPercentageClick,
  onDecimalClick,
  onBackspaceClick,
  onSinClick,
  onCosClick,
  onTanClick,
  onLogClick,
  onLnClick,
  onPiClick,
  onEClick,
  onSquareClick,
  onCubeClick,
  onSqrtClick,
  onCbrtClick,
  onPowerClick,
  onRootClick,
  onFactorialClick
}: ScientificKeypadProps) => {
  return (
    <div className="scientific-keypad grid grid-cols-5 gap-px">
      {/* Row 1 - Scientific Functions */}
      <CalcButton color="secondary" onClick={onSinClick} className="text-sm">
        sin
      </CalcButton>
      <CalcButton color="secondary" onClick={onCosClick} className="text-sm">
        cos
      </CalcButton>
      <CalcButton color="secondary" onClick={onTanClick} className="text-sm">
        tan
      </CalcButton>
      <CalcButton color="secondary" onClick={onLogClick} className="text-sm">
        log
      </CalcButton>
      <CalcButton color="secondary" onClick={onLnClick} className="text-sm">
        ln
      </CalcButton>

      {/* Row 2 */}
      <CalcButton color="secondary" onClick={onPiClick} className="text-sm">
        π
      </CalcButton>
      <CalcButton color="secondary" onClick={onEClick} className="text-sm">
        e
      </CalcButton>
      <CalcButton color="secondary" onClick={onFactorialClick} className="text-sm">
        x!
      </CalcButton>
      <CalcButton color="secondary" onClick={onSquareClick} className="text-sm">
        x²
      </CalcButton>
      <CalcButton color="secondary" onClick={onCubeClick} className="text-sm">
        x³
      </CalcButton>

      {/* Row 3 */}
      <CalcButton color="secondary" onClick={onSqrtClick} className="text-sm">
        √x
      </CalcButton>
      <CalcButton color="secondary" onClick={onCbrtClick} className="text-sm">
        ∛x
      </CalcButton>
      <CalcButton color="secondary" onClick={onPowerClick} className="text-sm">
        xʸ
      </CalcButton>
      <CalcButton color="secondary" onClick={onRootClick} className="text-sm">
        ʸ√x
      </CalcButton>
      <CalcButton color="secondary" onClick={onBackspaceClick}>
        ⌫
      </CalcButton>

      {/* Row 4 - Regular Calculator Functions */}
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
      <CalcButton color="primary" onClick={() => onOperationClick("multiply")}>
        ×
      </CalcButton>

      {/* Row 5 */}
      <CalcButton onClick={() => onDigitClick("7")}>7</CalcButton>
      <CalcButton onClick={() => onDigitClick("8")}>8</CalcButton>
      <CalcButton onClick={() => onDigitClick("9")}>9</CalcButton>
      <CalcButton color="primary" onClick={() => onOperationClick("subtract")}>
        –
      </CalcButton>
      <CalcButton
        color="primary"
        onClick={() => onOperationClick("add")}
        className="row-span-2"
      >
        +
      </CalcButton>

      {/* Row 6 */}
      <CalcButton onClick={() => onDigitClick("4")}>4</CalcButton>
      <CalcButton onClick={() => onDigitClick("5")}>5</CalcButton>
      <CalcButton onClick={() => onDigitClick("6")}>6</CalcButton>
      <CalcButton
        color="primary"
        onClick={onEqualsClick}
        className="row-span-2"
      >
        =
      </CalcButton>

      {/* Row 7 */}
      <CalcButton onClick={() => onDigitClick("1")}>1</CalcButton>
      <CalcButton onClick={() => onDigitClick("2")}>2</CalcButton>
      <CalcButton onClick={() => onDigitClick("3")}>3</CalcButton>

      {/* Row 8 */}
      <CalcButton onClick={() => onDigitClick("0")} className="col-span-2">
        0
      </CalcButton>
      <CalcButton onClick={onDecimalClick}>.</CalcButton>
    </div>
  );
};

export default ScientificKeypad;