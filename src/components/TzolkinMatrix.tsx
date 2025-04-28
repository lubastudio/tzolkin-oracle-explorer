
import React from 'react';
import { getKinColorClass } from '@/lib/tzolkinData';

interface TzolkinMatrixProps {
  selectedKin: number;
  onKinSelect: (kin: number) => void;
}

const TzolkinMatrix: React.FC<TzolkinMatrixProps> = ({ selectedKin, onKinSelect }) => {
  const renderMatrix = () => {
    const columns = [];
    
    // Generate 13 columns
    for (let tone = 1; tone <= 13; tone++) {
      const cells = [];
      
      // Each column has 20 seals, going downward
      for (let seal = 0; seal < 20; seal++) {
        const kin = tone + (seal * 13);
        const isSelected = kin === selectedKin;
        
        cells.push(
          <div 
            key={`kin-${kin}`}
            className={`tzolkin-cell w-10 h-10 m-1 rounded-full ${getKinColorClass(kin)} ${
              isSelected ? 'ring-4 ring-black scale-110' : ''
            }`}
            onClick={() => onKinSelect(kin)}
          >
            {kin}
          </div>
        );
      }
      
      columns.push(
        <div key={`tone-${tone}`} className="flex flex-col">
          {cells}
        </div>
      );
    }
    
    return columns;
  };

  return (
    <div className="bg-tzolkin-bg rounded-lg p-4 shadow-lg overflow-x-auto">
      <h2 className="section-title">Matriz Tzolkin</h2>
      <div className="flex flex-row justify-center">
        {renderMatrix()}
      </div>
    </div>
  );
};

export default TzolkinMatrix;
