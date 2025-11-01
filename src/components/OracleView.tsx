
import React from 'react';
import { calculateOracle, getKinComponents, getKinColorClass, calculateWave } from '@/lib/tzolkinData';
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
import seal11 from '@/assets/seals/11.svg';
import seal12 from '@/assets/seals/12.svg';
import seal13 from '@/assets/seals/13.svg';
import seal14 from '@/assets/seals/14.svg';
import seal15 from '@/assets/seals/15.svg';
import seal16 from '@/assets/seals/16.svg';
import seal17 from '@/assets/seals/17.svg';
import seal18 from '@/assets/seals/18.svg';
import seal19 from '@/assets/seals/19.svg';
import seal20 from '@/assets/seals/20.svg';

// Import tone indicator SVGs
import toneIcon1 from '@/assets/tones/t1.svg';
import toneIcon2 from '@/assets/tones/t2.svg';
import toneIcon3 from '@/assets/tones/t3.svg';
import toneIcon4 from '@/assets/tones/t4.svg';
import toneIcon5 from '@/assets/tones/t5.svg';
import toneIcon6 from '@/assets/tones/t6.svg';
import toneIcon7 from '@/assets/tones/t7.svg';
import toneIcon8 from '@/assets/tones/t8.svg';
import toneIcon9 from '@/assets/tones/t9.svg';
import toneIcon10 from '@/assets/tones/t10.svg';
import toneIcon11 from '@/assets/tones/t11.svg';
import toneIcon12 from '@/assets/tones/t12.svg';
import toneIcon13 from '@/assets/tones/t13.svg';

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
  11: seal11,
  12: seal12,
  13: seal13,
  14: seal14,
  15: seal15,
  16: seal16,
  17: seal17,
  18: seal18,
  19: seal19,
  20: seal20,
};

const toneIconImages: Record<number, string> = {
  1: toneIcon1,
  2: toneIcon2,
  3: toneIcon3,
  4: toneIcon4,
  5: toneIcon5,
  6: toneIcon6,
  7: toneIcon7,
  8: toneIcon8,
  9: toneIcon9,
  10: toneIcon10,
  11: toneIcon11,
  12: toneIcon12,
  13: toneIcon13,
};
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
  // Calculate the oracle data directly - guaranteed to be fresh each render
  const { guide, analog, antipode, hidden } = calculateOracle(kin);
  const wave = calculateWave(kin);
  
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
  
  const renderOracleItem = (title: string, kinData: {
    kin: number, 
    seal: any, 
    tone: any, 
    toneNumber: number, 
    sealNumber: number
  }) => {
    // Use the kin directly from the calculation result
    const colorClass = getKinColorClass(kinData.kin);
    const kinName = formatKinName(kinData.seal.name, kinData.tone.name, kinData.seal.color);
    
    return (
      <div className="oracle-item flex flex-col items-center">
        <span className="text-sm font-bold mb-1">{title}</span>
        {/* Tone icon above seal */}
        {toneIconImages[kinData.toneNumber] && (
          <div className="h-4 w-auto mb-1 flex items-center justify-center">
            <img 
              src={toneIconImages[kinData.toneNumber]} 
              alt={`Tom ${kinData.toneNumber}`}
              className="h-full w-auto object-contain"
            />
          </div>
        )}
        <div 
          className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center cursor-pointer hover:scale-105 transition"
          onClick={() => onKinSelect(kinData.kin)}
        >
          {sealImages[kinData.sealNumber] ? (
            <img 
              src={sealImages[kinData.sealNumber]} 
              alt={`Selo ${kinData.sealNumber}`}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className={`${colorClass} w-full h-full rounded-md flex items-center justify-center`}>
              <div className="font-bold">Kin {kinData.kin}</div>
            </div>
          )}
        </div>
        <div className="text-xs mt-1 text-center">
          <div>{kinData.seal.name.split(' ')[0]}</div>
          <div>{
            (() => {
              // Apply gender agreement to tone name
              const baseSealName = kinData.seal.name.split(' ')[0];
              const feminineSeals = ["Noite", "Semente", "Serpente", "Mão", "Estrela", "Lua", "Águia", "Terra", "Tormenta"];
              const isFeminine = feminineSeals.includes(baseSealName);
              
              let adjustedToneName = kinData.tone.name;
              if (isFeminine && kinData.tone.name.endsWith('o')) {
                adjustedToneName = kinData.tone.name.slice(0, -1) + 'a';
              }
              
              return adjustedToneName;
            })()
          }</div>
          <div>{
            (() => {
              // Apply gender agreement to color
              const baseSealName = kinData.seal.name.split(' ')[0];
              const feminineSeals = ["Noite", "Semente", "Serpente", "Mão", "Estrela", "Lua", "Águia", "Terra", "Tormenta"];
              const isFeminine = feminineSeals.includes(baseSealName);
              
              const colorTranslation = {
                'red': isFeminine ? 'Vermelha' : 'Vermelho',
                'white': isFeminine ? 'Branca' : 'Branco',
                'blue': 'Azul',  // Azul não muda no feminino
                'yellow': isFeminine ? 'Amarela' : 'Amarelo'
              };
              
              return colorTranslation[kinData.seal.color as keyof typeof colorTranslation] || '';
            })()
          }</div>
        </div>
      </div>
    );
  };
  
  const renderWaveItem = (kinNumber: number, position: number) => {
    const { tone, seal } = getKinComponents(kinNumber);
    const colorClass = getKinColorClass(kinNumber);
    const isSelected = kinNumber === kin;
    const kinName = formatKinName(seal.name, tone.name, seal.color);
    
    return (
      <div 
        key={`wave-${kinNumber}`}
        className={`${colorClass} p-2 rounded-md text-center cursor-pointer ${
          isSelected ? 'ring-2 ring-black' : ''
        }`}
        onClick={() => onKinSelect(kinNumber)}
      >
        <div className="text-xs font-bold">Kin {kinNumber}</div>
        <div className="text-xs">{kinName}</div>
      </div>
    );
  };
  
  return (
    <div className="p-4">
      <h2 className="text-base text-black mb-4 text-center">
        {view === 'oracle' ? 'Oráculo Destino' : 'Onda Encantada'}
      </h2>
      
      {view === 'oracle' ? (
        <div className="flex justify-center">
          <div className="grid grid-cols-3 grid-rows-3 gap-2 p-4" style={{
            gridTemplateAreas: `
              ". guia ."
              "antipoda destino analogico"
              ". oculto ."
            `
          }}>
          <div style={{ gridArea: 'guia' }}>
            {renderOracleItem('Guia', guide)}
          </div>
          <div style={{ gridArea: 'antipoda' }}>
            {renderOracleItem('Antípoda', antipode)}
          </div>
          <div style={{ gridArea: 'destino' }}>
            {renderOracleItem('Principal', {
              kin: kin,
              tone: getKinComponents(kin).tone,
              seal: getKinComponents(kin).seal,
              toneNumber: getKinComponents(kin).tone.number,
              sealNumber: solarSeals.findIndex(s => s.name === getKinComponents(kin).seal.name) + 1
            })}
          </div>
          <div style={{ gridArea: 'analogico' }}>
            {renderOracleItem('Análogo', analog)}
          </div>
          <div style={{ gridArea: 'oculto' }}>
            {renderOracleItem('Oculto', hidden)}
          </div>
          </div>
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
