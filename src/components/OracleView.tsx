
import React from 'react';
import { calculateOracle, getKinComponents, getKinColorClass, calculateWave } from '@/lib/tzolkinData';
import { solarSeals } from '@/lib/tzolkinData/data';
import { typo } from '@/lib/typography';

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
        <span className={`${typo.title} mb-1`}>{title}</span>
        <div 
          className={`${colorClass} w-16 h-16 md:w-20 md:h-20 rounded-md flex items-center justify-center cursor-pointer hover:scale-105 transition`}
          onClick={() => onKinSelect(kinData.kin)}
        >
          <div className={`${typo.h3} font-bold`}>Kin {kinData.kin}</div>
        </div>
        <div className={`${typo.body} mt-1 text-center leading-tight`}>
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
        <div className={`${typo.body} font-bold`}>Kin {kinNumber}</div>
        <div className={`${typo.body} leading-tight`}>{kinName}</div>
      </div>
    );
  };
  
  return (
    <div className="bg-tzolkin-lightBg p-4">
      <h2 className={`${typo.h3} text-black mb-4 text-center`}>
        {view === 'oracle' ? 'Oráculo Destino' : 'Onda Encantada'}
      </h2>
      
      {view === 'oracle' ? (
        <div className="flex justify-center">
          <div className="grid grid-cols-3 grid-rows-3 gap-4 p-4" style={{
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
