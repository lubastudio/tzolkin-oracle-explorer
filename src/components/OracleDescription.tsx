
import React from 'react';
import { getKinComponents, calculateOracle } from '@/lib/tzolkinData';
import { solarSeals } from '@/lib/tzolkinData/data';

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
    
    // Lista de selos femininos
    const feminineSeals = ["Noite", "Semente", "Serpente", "Mão", "Estrela", "Lua", "Águia", "Terra", "Tormenta"];
    const isFeminine = feminineSeals.includes(baseSealName);
    
    // Ajusta o adjetivo do tom para o gênero correto
    let adjustedToneName = toneName;
    if (isFeminine) {
      // Converte adjetivos masculinos para femininos
      if (toneName.endsWith('o')) {
        adjustedToneName = toneName.slice(0, -1) + 'a';
      }
    }
    
    // Cor em português com gênero correto
    const colorTranslation: Record<string, [string, string]> = {
      'red': ['Vermelho', 'Vermelha'],
      'white': ['Branco', 'Branca'],
      'blue': ['Azul', 'Azul'],  // Azul não muda no feminino
      'yellow': ['Amarelo', 'Amarela']
    };
    
    const colorAdjective = isFeminine ? colorTranslation[color as keyof typeof colorTranslation][1] : 
                                     colorTranslation[color as keyof typeof colorTranslation][0];
    
    return `${baseSealName} ${adjustedToneName} ${colorAdjective}`;
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
