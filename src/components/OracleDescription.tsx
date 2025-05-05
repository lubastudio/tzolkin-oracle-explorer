
import React from 'react';
import { getKinComponents, calculateOracle } from '@/lib/tzolkinData';

interface OracleDescriptionProps {
  kin: number;
}

const OracleDescription: React.FC<OracleDescriptionProps> = ({ kin }) => {
  const oracle = calculateOracle(kin);
  const { tone, seal } = getKinComponents(kin);
  const guideKin = getKinComponents(oracle.guide);
  const analogKin = getKinComponents(oracle.analog);
  const antipodeKin = getKinComponents(oracle.antipode);
  const hiddenKin = getKinComponents(oracle.hidden);
  
  return (
    <div className="bg-tzolkin-lightBg rounded-lg p-4 shadow-lg">
      <h2 className="section-title">Significado do Oráculo</h2>
      <div className="text-black text-sm space-y-3">
        <p>
          <span className="font-semibold">Guia ({oracle.guide}):</span> {guideKin.tone.name} {guideKin.seal.name} - 
          Representa a energia que o guia no caminho, oferecendo direção e propósito.
        </p>
        
        <p>
          <span className="font-semibold">Análogo ({oracle.analog}):</span> {analogKin.tone.name} {analogKin.seal.name} - 
          Energia de apoio e suporte que reforça as qualidades do seu Kin.
        </p>
        
        <p>
          <span className="font-semibold">Antípoda ({oracle.antipode}):</span> {antipodeKin.tone.name} {antipodeKin.seal.name} - 
          Energia de desafio e equilíbrio que oferece oportunidade de integração.
        </p>
        
        <p>
          <span className="font-semibold">Oculto ({oracle.hidden}):</span> {hiddenKin.tone.name} {hiddenKin.seal.name} - 
          Representa o potencial inconsciente e poder oculto dentro de você.
        </p>
      </div>
    </div>
  );
};

export default OracleDescription;
