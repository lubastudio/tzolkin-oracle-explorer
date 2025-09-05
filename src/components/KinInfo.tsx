
import React from 'react';
import { getKinComponents, getKinColorClass } from '@/lib/tzolkinData';
import { solarSeals } from '@/lib/tzolkinData/data';

interface KinInfoProps {
  kin: number;
}

const KinInfo: React.FC<KinInfoProps> = ({ kin }) => {
  const { tone, seal } = getKinComponents(kin);
  const colorClass = getKinColorClass(kin);
  
  // número legível em fundo claro (amarelo/branco) vs escuro (vermelho/azul)
  const sealTextColorClass =
    seal.color === 'yellow' || seal.color === 'white' ? 'text-black' : 'text-white';
  
  // Calculate seal number
  const sealNumber = solarSeals.findIndex(s => s.name === seal.name) + 1;
  
  // Helper function to get simplified seal name (remove "do céu", "de mundos" etc.)
  const getSimplifiedSealName = () => {
    return seal.name.split(' ')[0];
  };
  
  // Helper function for gender agreement
  const getGenderInfo = () => {
    const baseSealName = getSimplifiedSealName();
    const feminineSeals = ["Noite", "Semente", "Serpente", "Mão", "Estrela", "Lua", "Águia", "Terra", "Tormenta"];
    const isFeminine = feminineSeals.includes(baseSealName);
    
    // Adjust tone for gender
    let adjustedToneName = tone.name;
    if (isFeminine && tone.name.endsWith('o')) {
      adjustedToneName = tone.name.slice(0, -1) + 'a';
    }
    
    // Color with gender agreement
    const colorTranslation: Record<string, [string, string]> = {
      'red': ['Vermelho', 'Vermelha'],
      'white': ['Branco', 'Branca'],
      'blue': ['Azul', 'Azul'],
      'yellow': ['Amarelo', 'Amarela']
    };
    
    const colorAdjective = isFeminine ? 
      colorTranslation[seal.color as keyof typeof colorTranslation][1] : 
      colorTranslation[seal.color as keyof typeof colorTranslation][0];
    
    return { baseSealName, adjustedToneName, colorAdjective };
  };
  
  const { baseSealName, adjustedToneName, colorAdjective } = getGenderInfo();
  
  return (
    <div className="bg-tzolkin-lightBg p-4">
      {/* Kin number and name at top */}
      <div className="text-center mb-4">
        <h3 className="text-3xl md:text-4xl font-extrabold mb-2 kin-heading">Kin {kin}</h3>
        <div className="text-xl md:text-2xl font-semibold kin-subtitle leading-tight">
          <div>{baseSealName}</div>
          <div>{adjustedToneName}</div>
          <div>{colorAdjective}</div>
        </div>
      </div>
      
      {/* Seal and Tone side by side */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-4">
        <div className="flex flex-col items-center w-64">
          <span className="font-medium text-black mb-3 h-5">Selo</span>

          {/* FORMA FIXA (quadrado) - tamanho menor */}
          <div className={`w-24 h-24 ${colorClass} rounded-lg flex items-center justify-center mb-3 cursor-pointer hover:scale-105 transition shrink-0`}>
            <span className={`text-3xl font-bold ${sealTextColorClass} selo-num`}>{sealNumber}</span>
          </div>

          {/* TÍTULO ABAIXO - 2 linhas: Selo + Cor */}
          <div className="text-lg font-semibold text-center max-w-64 mb-2 h-14 flex flex-col justify-center leading-tight">
            <div>{baseSealName}</div>
            <div>{colorAdjective}</div>
          </div>

          {/* ASPECTOS - 2 linhas: Atributo / Atributo */}
          <div className="text-sm text-black text-center leading-tight max-w-64 h-10 flex flex-col justify-center">
            <div>{seal.description}</div>
          </div>
        </div>
        
        <div className="flex flex-col items-center w-64">
          <span className="font-medium text-black mb-3 h-5">Tom</span>

          {/* FORMA FIXA (círculo) - tamanho menor */}
          <div className="w-24 h-24 rounded-full flex items-center justify-center mb-3 bg-white border-4 border-black cursor-pointer hover:scale-105 transition shrink-0">
            <span className="text-3xl font-bold text-black tom-num">{tone.number}</span>
          </div>

          {/* TÍTULO ABAIXO - altura fixa */}
          <div className="text-lg font-semibold text-center max-w-64 mb-2 h-14 flex items-center justify-center">
            {adjustedToneName}
          </div>

          {/* ASPECTOS - altura fixa */}
          <div className="text-sm text-black text-center leading-tight max-w-64 h-10 flex flex-col justify-center">
            <div>{tone.description}</div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default KinInfo;
