
import React from 'react';
import { getKinComponents, getKinColorClass } from '@/lib/tzolkinData';
import { solarSeals } from '@/lib/tzolkinData/data';

interface KinInfoProps {
  kin: number;
}

const KinInfo: React.FC<KinInfoProps> = ({ kin }) => {
  const { tone, seal } = getKinComponents(kin);
  const colorClass = getKinColorClass(kin);
  
  // Calculate seal number
  const sealNumber = solarSeals.findIndex(s => s.name === seal.name) + 1;
  
  // Função para formatar o nome do Kin corretamente: [Selo] + [Tom] + [Cor]
  const formatKinName = () => {
    // Extrai apenas o nome base do selo (sem a cor)
    const baseSealName = seal.name.split(' ')[0];
    
    // Lista de selos femininos
    const feminineSeals = ["Noite", "Semente", "Serpente", "Mão", "Estrela", "Lua", "Águia", "Terra", "Tormenta"];
    const isFeminine = feminineSeals.includes(baseSealName);
    
    // Ajusta o adjetivo do tom para o gênero correto
    let adjustedToneName = tone.name;
    if (isFeminine) {
      // Converte adjetivos masculinos para femininos
      if (tone.name.endsWith('o')) {
        adjustedToneName = tone.name.slice(0, -1) + 'a';
      }
    }
    
    // Cor em português com gênero correto
    const colorTranslation: Record<string, [string, string]> = {
      'red': ['Vermelho', 'Vermelha'],
      'white': ['Branco', 'Branca'],
      'blue': ['Azul', 'Azul'],  // Azul não muda no feminino
      'yellow': ['Amarelo', 'Amarela']
    };
    
    const colorAdjective = isFeminine ? colorTranslation[seal.color as keyof typeof colorTranslation][1] : 
                                     colorTranslation[seal.color as keyof typeof colorTranslation][0];
    
    return `${baseSealName} ${adjustedToneName} ${colorAdjective}`;
  };
  
  return (
    <div className="bg-tzolkin-lightBg p-4">
      {/* Kin number and name at top */}
      <div className="text-center mb-4">
        <h3 className="text-3xl font-bold mb-2">Kin {kin}</h3>
        <h3 className="text-xs">{formatKinName()}</h3>
      </div>
      
      {/* Seal and Tone side by side */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-4">
        <div className="flex flex-col items-center">
          <span className="font-medium text-black mb-1">Selo</span>
          <div className={`w-24 h-24 ${colorClass} rounded-lg flex flex-col items-center justify-center mb-2 cursor-pointer hover:scale-105 transition`}>
            <span className="text-lg font-bold">{seal.name.split(" ")[0]}</span>
            <span className="text-sm font-bold">{sealNumber}</span>
          </div>
          <p className="font-semibold">{seal.name}</p>
          <p className="text-xs text-black text-center">{seal.description}</p>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="font-medium text-black mb-1">Tom</span>
          <div className="w-24 h-24 rounded-full flex items-center justify-center mb-2 bg-white border-2 border-black cursor-pointer hover:scale-105 transition">
            <span className="text-3xl font-bold text-black">{tone.number}</span>
          </div>
          <p className="font-semibold">{tone.name}</p>
          <p className="text-xs text-black text-center">{tone.description}</p>
        </div>
      </div>
      
    </div>
  );
};

export default KinInfo;
