
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
        <h3 className="text-lg font-bold mb-2">Kin {kin}</h3>
        <div className="text-lg font-semibold">
          <div>{seal.name.split(" ")[0]} {tone.name}</div>
          <div>{seal.color === 'red' ? (seal.name.includes('Noite') || seal.name.includes('Semente') || seal.name.includes('Serpente') || seal.name.includes('Mão') || seal.name.includes('Estrela') || seal.name.includes('Lua') || seal.name.includes('Águia') || seal.name.includes('Terra') || seal.name.includes('Tormenta') ? 'Vermelha' : 'Vermelho') : 
                      seal.color === 'white' ? (seal.name.includes('Noite') || seal.name.includes('Semente') || seal.name.includes('Serpente') || seal.name.includes('Mão') || seal.name.includes('Estrela') || seal.name.includes('Lua') || seal.name.includes('Águia') || seal.name.includes('Terra') || seal.name.includes('Tormenta') ? 'Branca' : 'Branco') :
                      seal.color === 'blue' ? 'Azul' :
                      seal.color === 'yellow' ? (seal.name.includes('Noite') || seal.name.includes('Semente') || seal.name.includes('Serpente') || seal.name.includes('Mão') || seal.name.includes('Estrela') || seal.name.includes('Lua') || seal.name.includes('Águia') || seal.name.includes('Terra') || seal.name.includes('Tormenta') ? 'Amarela' : 'Amarelo') : ''}</div>
        </div>
      </div>
      
      {/* Seal and Tone side by side */}
      <div className="flex flex-col md:flex-row items-start justify-center gap-8 mb-4">
        <div className="flex flex-col items-center w-64">
          <span className="font-medium text-black mb-3">Selo</span>
          <div className={`w-40 h-40 ${colorClass} rounded-lg flex items-center justify-center mb-3 cursor-pointer hover:scale-105 transition`}>
            <span className="text-5xl font-bold text-white">{sealNumber}</span>
          </div>
          <h4 className="text-lg font-semibold text-center max-w-64 break-words mb-2">{seal.name}</h4>
          <p className="text-sm text-black text-center min-h-9 leading-tight max-w-64 break-words">{seal.description}</p>
        </div>
        
        <div className="flex flex-col items-center w-64">
          <span className="font-medium text-black mb-3">Tom</span>
          <div className="w-40 h-40 rounded-full flex items-center justify-center mb-3 bg-white border-4 border-black cursor-pointer hover:scale-105 transition">
            <span className="text-5xl font-bold text-black">{tone.number}</span>
          </div>
          <h4 className="text-lg font-semibold text-center max-w-64 break-words mb-2">{tone.name}</h4>
          <p className="text-sm text-black text-center min-h-9 leading-tight max-w-64 break-words">{tone.description}</p>
        </div>
      </div>
      
    </div>
  );
};

export default KinInfo;
