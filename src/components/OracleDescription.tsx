
import React from 'react';
import { getKinComponents, calculateOracle } from '@/lib/tzolkinData';

interface OracleDescriptionProps {
  kin: number;
}

const OracleDescription: React.FC<OracleDescriptionProps> = ({ kin }) => {
  const oracle = calculateOracle(kin);
  const { tone, seal } = getKinComponents(kin);
  
  return (
    <div className="bg-tzolkin-lightBg rounded-lg p-4 shadow-lg h-auto">
      <h2 className="section-title">Significado do Oráculo</h2>
      <div className="text-black text-sm space-y-3">
        <p>
          <span className="font-semibold">Guia ({oracle.guide.kin}):</span> {oracle.guide.tone.name} {oracle.guide.seal.name} - 
          Representa a energia que o guia no caminho, oferecendo direção e propósito.
        </p>
        
        <p>
          <span className="font-semibold">Análogo ({oracle.analog.kin}):</span> {oracle.analog.tone.name} {oracle.analog.seal.name} - 
          Energia de apoio e suporte que reforça as qualidades do seu Kin.
        </p>
        
        <p>
          <span className="font-semibold">Antípoda ({oracle.antipode.kin}):</span> {oracle.antipode.tone.name} {oracle.antipode.seal.name} - 
          Energia de desafio e equilíbrio que oferece oportunidade de integração.
        </p>
        
        <p>
          <span className="font-semibold">Oculto ({oracle.hidden.kin}):</span> {oracle.hidden.tone.name} {oracle.hidden.seal.name} - 
          Representa o potencial inconsciente e poder oculto dentro de você.
        </p>
      </div>
    </div>
  );
};

export default OracleDescription;
