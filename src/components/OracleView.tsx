
import React from 'react';
import { calculateOracle, getKinComponents, getKinColorClass, calculateWave } from '@/lib/tzolkinData';

interface OracleViewProps {
  kin: number;
  onKinSelect: (kin: number) => void;
  view: 'oracle' | 'wave';
  onViewChange: (view: 'oracle' | 'wave') => void;
}

const OracleView: React.FC<OracleViewProps> = ({ 
  kin,
  onKinSelect, 
  view
}) => {
  const oracle = calculateOracle(kin);
  const wave = calculateWave(kin);
  
  const renderOracleItem = (title: string, kinNumber: number, position: 'center' | 'top' | 'right' | 'bottom' | 'left') => {
    const { tone, seal } = getKinComponents(kinNumber);
    const colorClass = getKinColorClass(kinNumber);
    
    return (
      <div className={`oracle-item flex flex-col items-center ${position === 'center' ? 'col-start-2 col-end-3 row-start-2 row-end-3' : ''} ${position === 'top' ? 'col-start-2 col-end-3 row-start-1 row-end-2' : ''} ${position === 'right' ? 'col-start-3 col-end-4 row-start-2 row-end-3' : ''} ${position === 'bottom' ? 'col-start-2 col-end-3 row-start-3 row-end-4' : ''} ${position === 'left' ? 'col-start-1 col-end-2 row-start-2 row-end-3' : ''}`}>
        <span className="text-sm font-medium mb-1">{title}</span>
        <div 
          className={`${colorClass} w-16 h-16 md:w-20 md:h-20 rounded-md flex items-center justify-center cursor-pointer hover:scale-105 transition`}
          onClick={() => onKinSelect(kinNumber)}
        >
          <div className="font-bold">Kin {kinNumber}</div>
        </div>
        <span className="text-xs mt-1">{seal.name}</span>
      </div>
    );
  };
  
  const renderWaveItem = (kinNumber: number, position: number) => {
    const { tone, seal } = getKinComponents(kinNumber);
    const colorClass = getKinColorClass(kinNumber);
    const isSelected = kinNumber === kin;
    
    return (
      <div 
        key={`wave-${kinNumber}`}
        className={`${colorClass} p-2 rounded-md text-center cursor-pointer ${
          isSelected ? 'ring-2 ring-black' : ''
        }`}
        onClick={() => onKinSelect(kinNumber)}
      >
        <div className="text-sm font-bold">Kin {kinNumber}</div>
        <div className="text-xs">{tone.name}</div>
        <div className="text-xs">{seal.name}</div>
      </div>
    );
  };
  
  return (
    <div className="bg-tzolkin-lightBg rounded-lg p-4 shadow-lg">
      <h2 className="text-xl font-semibold text-black mb-4">
        {view === 'oracle' ? 'Oráculo do Kin' : 'Onda Encantada'}
      </h2>
      
      {view === 'oracle' ? (
        <div className="grid grid-cols-3 grid-rows-3 gap-3 place-items-center">
          {renderOracleItem('Guia', oracle.guide, 'top')}
          {renderOracleItem('Antipoda', oracle.antipode, 'left')}
          {renderOracleItem('Kin', kin, 'center')}
          {renderOracleItem('Análogo', oracle.analog, 'right')}
          {renderOracleItem('Oculto', oracle.hidden, 'bottom')}
        </div>
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-13 gap-1 p-2">
          {wave.map((kinNumber, index) => renderWaveItem(kinNumber, index + 1))}
        </div>
      )}
    </div>
  );
};

export default OracleView;
