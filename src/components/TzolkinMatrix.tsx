
import React from 'react';
import { getKinColorClass } from '@/lib/tzolkinData';

interface TzolkinMatrixProps {
  selectedKin: number;
  onKinSelect: (kin: number) => void;
}

const TzolkinMatrix: React.FC<TzolkinMatrixProps> = ({ selectedKin, onKinSelect }) => {
  // Generate the 13x20 Tzolkin matrix
  const renderMatrix = () => {
    const rows = [];
    
    // Rows (13 galactic tones)
    for (let tone = 1; tone <= 13; tone++) {
      const cells = [];
      
      // Columns (20 solar seals)
      for (let seal = 1; seal <= 20; seal++) {
        const kin = (tone - 1) * 20 + seal;
        const isSelected = kin === selectedKin;
        
        cells.push(
          <div 
            key={`kin-${kin}`}
            className={`tzolkin-cell w-10 h-10 m-1 rounded-full ${getKinColorClass(kin)} ${
              isSelected ? 'ring-4 ring-primary scale-110' : ''
            }`}
            onClick={() => onKinSelect(kin)}
          >
            {kin}
          </div>
        );
      }
      
      rows.push(
        <div key={`tone-${tone}`} className="flex flex-row">
          {cells}
        </div>
      );
    }
    
    return rows;
  };

  return (
    <div className="bg-tzolkin-lightBg rounded-lg p-4 shadow-lg overflow-x-auto">
      <h2 className="section-title">Matriz Tzolkin</h2>
      <div className="flex flex-col items-center">
        {renderMatrix()}
      </div>
    </div>
  );
};

export default TzolkinMatrix;
