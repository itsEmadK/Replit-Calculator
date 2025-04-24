import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HistoryEntry {
  calculation: string;
  result: string;
  timestamp: Date;
}

interface HistoryProps {
  historyEntries: HistoryEntry[];
  onClearHistory: () => void;
}

const History: React.FC<HistoryProps> = ({ historyEntries, onClearHistory }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white text-sm font-semibold">Calculation History</h3>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={onClearHistory}
          className="h-7 text-xs"
          disabled={historyEntries.length === 0}
        >
          Clear
        </Button>
      </div>
      
      <ScrollArea className="h-48">
        {historyEntries.length === 0 ? (
          <div className="text-gray-400 text-sm text-center py-4">
            No calculations yet
          </div>
        ) : (
          <ul className="space-y-2">
            {historyEntries.map((entry, index) => (
              <li key={index} className="text-white text-sm bg-gray-800 p-2 rounded">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-xs">{formatTime(entry.timestamp)}</span>
                </div>
                <div className="flex justify-between items-end mt-1">
                  <span className="text-gray-300">{entry.calculation}</span>
                  <span className="font-bold">{entry.result}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
    </div>
  );
};

export default History;