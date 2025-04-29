
import React, { useState, useEffect } from 'react';
import { calculateKin, yearValues } from '@/lib/tzolkinData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DateConverterProps {
  onKinSelect: (kin: number) => void;
}

const DateConverter: React.FC<DateConverterProps> = ({ onKinSelect }) => {
  const today = new Date();
  const [day, setDay] = useState<number>(today.getDate());
  const [month, setMonth] = useState<number>(today.getMonth()); // January is 0
  const [year, setYear] = useState<number>(today.getFullYear());
  
  useEffect(() => {
    // Calculate the kin for today when component mounts
    const calculatedKin = calculateKin(year.toString(), month, day);
    onKinSelect(calculatedKin);
  }, []);

  const handleDateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedKin = calculateKin(year.toString(), month, day);
    onKinSelect(calculatedKin);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setYear(value);
    }
  };

  const incrementYear = () => {
    const newYear = year + 1;
    if (yearValues[newYear.toString() as keyof typeof yearValues]) {
      setYear(newYear);
    }
  };

  const decrementYear = () => {
    const newYear = year - 1;
    if (yearValues[newYear.toString() as keyof typeof yearValues]) {
      setYear(newYear);
    }
  };

  const currentYear = new Date().getFullYear();
  const availableYears = Object.keys(yearValues);

  return (
    <div className="bg-tzolkin-lightBg rounded-lg p-4 shadow-lg">
      <h2 className="section-title">Conversão de Data</h2>
      
      <form onSubmit={handleDateSubmit} className="mt-3">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm text-black mb-1">Dia</label>
            <Input
              type="number"
              min="1"
              max="31"
              value={day}
              onChange={(e) => setDay(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-white text-black rounded border border-gray-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm text-black mb-1">Mês</label>
            <select
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              className="w-full h-10 px-3 py-2 bg-white text-black rounded border border-gray-300"
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
            <label className="block text-sm text-black mb-1">Ano</label>
            <div className="flex items-center">
              <Input
                type="number"
                value={year}
                onChange={handleYearChange}
                className="w-full px-3 py-2 bg-white text-black rounded border border-gray-300"
                required
              />
              <div className="flex flex-col ml-1">
                <button 
                  type="button" 
                  onClick={incrementYear}
                  className="text-black bg-white border border-gray-300 px-1 rounded-t"
                >▲</button>
                <button 
                  type="button" 
                  onClick={decrementYear}
                  className="text-black bg-white border border-gray-300 px-1 rounded-b"
                >▼</button>
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/80 mt-3"
        >
          Calcular Kin
        </Button>
      </form>
    </div>
  );
};

export default DateConverter;
