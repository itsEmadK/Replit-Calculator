interface DisplayProps {
  currentValue: string;
  previousOperation: string;
}

const Display = ({ currentValue, previousOperation }: DisplayProps) => {
  return (
    <div className="display-area p-4 pt-12 pb-6 text-right">
      <div className="previous-operation text-gray-400 text-lg h-6 mb-1 font-mono overflow-x-auto">
        {previousOperation}
      </div>
      <div className="current-value text-white text-4xl sm:text-5xl font-bold tracking-wide font-mono overflow-x-auto">
        {currentValue}
      </div>
    </div>
  );
};

export default Display;
