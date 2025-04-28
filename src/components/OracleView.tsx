
import React from 'react';
import { calculateOracle, getKinComponents, getKinColorClass } from '@/lib/tzolkinData';

interface OracleViewProps {
  kin: number;
  onKinSelect: (kin: number) => void;
  view: 'oracle' | 'wave';
  onViewChange: (view: 'oracle' | 'wave') => void;
}

const OracleView: React.FC<OracleViewProps> = ({ 
  kin,
  onKinSelect, 
  view, 
  onViewChange 
}) => {
  const oracle = calculateOracle(kin);
  
  const renderOracleItem = (title: string, kinNumber: number) => {
    const { tone, seal } = getKinComponents(kinNumber);
    const colorClass = getKinColorClass(kinNumber);
    
    return (
      <div 
        className={`oracle-item ${colorClass}`}
        onClick={() => onKinSelect(kinNumber)}
      >
        <div className="text-lg font-semibold">{title}</div>
        <div className="font-bold text-xl">Kin {kinNumber}</div>
        <div>{tone.name} {seal.name}</div>
      </div>
    );
  };
  
  return (
    <div className="bg-tzolkin-lightBg rounded-lg p-4 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">
          {view === 'oracle' ? 'Oráculo do Kin' : 'Onda Encantada'}
        </h2>
        
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded ${view === 'oracle' ? 'bg-primary text-white' : 'bg-secondary text-gray-300'}`}
            onClick={() => onViewChange('oracle')}
          >
            Oráculo
          </button>
          <button
            className={`px-3 py-1 rounded ${view === 'wave' ? 'bg-primary text-white' : 'bg-secondary text-gray-300'}`}
            onClick={() => onViewChange('wave')}
          >
            Onda
          </button>
        </div>
      </div>
      
      {view === 'oracle' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {renderOracleItem('Guia', oracle.guide)}
          {renderOracleItem('Análogo', oracle.analog)}
          {renderOracleItem('Antípoda', oracle.antipode)}
          {renderOracleItem('Oculto', oracle.hidden)}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg">Funcionalidade de Onda Encantada em desenvolvimento</p>
        </div>
      )}
    </div>
  );
};

export default OracleView;
