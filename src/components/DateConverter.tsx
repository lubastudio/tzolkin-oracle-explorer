
import React, { useState } from 'react';
import { calculateKin, yearValues } from '@/lib/tzolkinData';
import { Button } from '@/components/ui/button';

interface DateConverterProps {
  onKinSelect: (kin: number) => void;
}

const DateConverter: React.FC<DateConverterProps> = ({ onKinSelect }) => {
  const [day, setDay] = useState<number>(1);
  const [month, setMonth] = useState<number>(0); // January is 0
  const [year, setYear] = useState<string>("2024");
  const [directKin, setDirectKin] = useState<string>("");

  const handleDateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedKin = calculateKin(year, month, day);
    onKinSelect(calculatedKin);
  };

  const handleDirectKinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const kin = parseInt(directKin);
    if (kin >= 1 && kin <= 260) {
      onKinSelect(kin);
    }
  };

  const currentYear = new Date().getFullYear();
  const availableYears = Object.keys(yearValues);

  return (
    <div className="bg-tzolkin-lightBg rounded-lg p-4 shadow-lg">
      <h2 className="section-title">Conversão de Data</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg mb-2">Data Gregoriana</h3>
          <form onSubmit={handleDateSubmit} className="space-y-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Dia</label>
              <input
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-tzolkin-cosmic text-white rounded border border-gray-700"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-1">Mês</label>
              <select
                value={month}
                onChange={(e) => setMonth(parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-tzolkin-cosmic text-white rounded border border-gray-700"
                required
              >
                <option value="0">Janeiro</option>
                <option value="1">Fevereiro</option>
                <option value="2">Março</option>
                <option value="3">Abril</option>
                <option value="4">Maio</option>
                <option value="5">Junho</option>
                <option value="6">Julho</option>
                <option value="7">Agosto</option>
                <option value="8">Setembro</option>
                <option value="9">Outubro</option>
                <option value="10">Novembro</option>
                <option value="11">Dezembro</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-1">Ano</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2 bg-tzolkin-cosmic text-white rounded border border-gray-700"
                required
              >
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/80"
            >
              Calcular Kin
            </Button>
          </form>
        </div>
        
        <div>
          <h3 className="text-lg mb-2">Número do Kin</h3>
          <form onSubmit={handleDirectKinSubmit} className="space-y-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Informe o Kin (1-260)</label>
              <input
                type="number"
                min="1"
                max="260"
                value={directKin}
                onChange={(e) => setDirectKin(e.target.value)}
                className="w-full px-3 py-2 bg-tzolkin-cosmic text-white rounded border border-gray-700"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/80 mt-9"
            >
              Buscar Kin
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DateConverter;
