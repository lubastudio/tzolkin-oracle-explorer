
import React from 'react';
import { getKinComponents, calculateOracle } from '@/lib/tzolkinData';

interface OracleDescriptionProps {
  kin: number;
}

const OracleDescription: React.FC<OracleDescriptionProps> = ({ kin }) => {
  const oracle = calculateOracle(kin);
  const { tone, seal } = getKinComponents(kin);
  
  // Função para formatar o nome do Kin corretamente: [Selo] + [Tom] + [Cor]
  const formatKinName = (sealName: string, toneName: string, color: string) => {
    // Extrai apenas o nome base do selo (sem a cor)
    const baseSealName = sealName.split(' ')[0];
    
    // Cor em português
    const colorTranslation = {
      'red': 'Vermelho',
      'white': 'Branco',
      'blue': 'Azul',
      'yellow': 'Amarelo'
    };
    
    return `${baseSealName} ${toneName} ${colorTranslation[color as keyof typeof colorTranslation]}`;
  };
  
  return (
    <div className="bg-tzolkin-lightBg rounded-lg p-4 shadow-lg h-auto">
      <h2 className="section-title">Significado do Oráculo</h2>
      <div className="text-black text-sm space-y-3">
        <p>
          <span className="font-semibold">Guia (Kin {oracle.guide.kin}):</span> {formatKinName(oracle.guide.seal.name, oracle.guide.tone.name, oracle.guide.seal.color)} - 
          Representa a energia que o guia no caminho, oferecendo direção e propósito.
        </p>
        
        <p>
          <span className="font-semibold">Análogo (Kin {oracle.analog.kin}):</span> {formatKinName(oracle.analog.seal.name, oracle.analog.tone.name, oracle.analog.seal.color)} - 
          Energia de apoio e suporte que reforça as qualidades do seu Kin.
        </p>
        
        <p>
          <span className="font-semibold">Antípoda (Kin {oracle.antipode.kin}):</span> {formatKinName(oracle.antipode.seal.name, oracle.antipode.tone.name, oracle.antipode.seal.color)} - 
          Energia de desafio e equilíbrio que oferece oportunidade de integração.
        </p>
        
        <p>
          <span className="font-semibold">Oculto (Kin {oracle.hidden.kin}):</span> {formatKinName(oracle.hidden.seal.name, oracle.hidden.tone.name, oracle.hidden.seal.color)} - 
          Representa o potencial inconsciente e poder oculto dentro de você.
        </p>
      </div>
    </div>
  );
};

export default OracleDescription;
