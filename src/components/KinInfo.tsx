import React from 'react';
import { getKinComponents, getKinColorClass } from '@/lib/tzolkinData';
import { solarSeals } from '@/lib/tzolkinData/data';

// Import seal SVGs
import seal1 from '@/assets/seals/1.svg';
import seal2 from '@/assets/seals/2.svg';
import seal3 from '@/assets/seals/3.svg';
import seal4 from '@/assets/seals/4.svg';
import seal5 from '@/assets/seals/5.svg';
import seal6 from '@/assets/seals/6.svg';
import seal7 from '@/assets/seals/7.svg';
import seal8 from '@/assets/seals/8.svg';
import seal9 from '@/assets/seals/9.svg';
import seal10 from '@/assets/seals/10.svg';

const sealImages: Record<number, string> = {
  1: seal1,
  2: seal2,
  3: seal3,
  4: seal4,
  5: seal5,
  6: seal6,
  7: seal7,
  8: seal8,
  9: seal9,
  10: seal10,
};
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
  
  // Função para formatar o nome do Kin corretamente: [Selo Completo] + [Tom] + [Cor]
  const formatKinName = () => {
    // Remove a cor do nome do selo (última palavra)
    const sealParts = seal.name.split(' ');
    const sealNameWithoutColor = sealParts.slice(0, -1).join(' ');
    
    // Extrai apenas o nome base do selo (primeira palavra para verificar gênero)
    const baseSealName = sealParts[0];
    
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
    
    return `${sealNameWithoutColor} ${adjustedToneName} ${colorAdjective}`;
  };
  
  // Função para extrair apenas o nome base do selo (primeira palavra)
  const getBaseSealName = () => {
    return seal.name.split(' ')[0];
  };
  
  return (
    <div className="p-4">
      {/* Kin number and name at top */}
      <div className="text-center mb-4">
        <h3 className="text-2xl md:text-3xl font-extrabold mb-2 kin-heading">Kin {kin}</h3>
        <div className="text-base font-bold kin-subtitle">
          <div>{formatKinName()}</div>
        </div>
      </div>
      
      {/* Seal and Tone side by side */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-4">
        <div className="flex flex-col items-center w-64">
          <span className="text-sm text-black mb-3 h-5">Selo</span>

          {/* Seal SVG Image */}
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-1 shrink-0">
            {sealImages[sealNumber] ? (
              <img 
                src={sealImages[sealNumber]} 
                alt={`Selo ${sealNumber}`}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className={`w-full h-full ${colorClass} rounded-lg flex items-center justify-center`}>
                <span className={`text-2xl md:text-3xl font-bold ${sealTextColorClass}`}>{sealNumber}</span>
              </div>
            )}
          </div>

          {/* TÍTULO ABAIXO, CENTRALIZADO, QUEBRANDO LINHA - altura fixa */}
          <h4 className="text-base font-bold text-center max-w-64 whitespace-normal break-words h-16 flex items-center">
            {getBaseSealName()}
          </h4>

          {/* ASPECTOS: 2 linhas máx. sem empurrar a forma - altura fixa */}
          <p className="text-xs text-black text-center leading-tight max-w-64 h-10 whitespace-normal break-words flex items-center">
            {seal.description}
          </p>
        </div>
        
        <div className="flex flex-col items-center w-64">
          <span className="text-sm text-black mb-3 h-5">Tom</span>

          {/* FORMA FIXA (círculo) - tamanho menor */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-1 border-4 border-black shrink-0">
            <span className="text-2xl md:text-3xl font-bold text-black tom-num">{tone.number}</span>
          </div>

          {/* TÍTULO ABAIXO - altura fixa */}
          <h4 className="text-base font-bold text-center max-w-64 whitespace-normal break-words h-16 flex items-center">
            {tone.name}
          </h4>

          {/* ASPECTOS - altura fixa */}
          <p className="text-xs text-black text-center leading-tight max-w-64 h-10 whitespace-normal break-words flex items-center">
            {tone.description}
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default KinInfo;
