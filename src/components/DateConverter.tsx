
import React, { useState, useEffect } from 'react';
import { calculateKinAccurate } from '@/lib/tzolkinData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CalendarDays } from 'lucide-react';

interface DateConverterProps {
  onKinSelect: (kin: number) => void;
}

const DateConverter: React.FC<DateConverterProps> = ({ onKinSelect }) => {
  const today = new Date();
  const [day, setDay] = useState<number>(today.getDate());
  const [month, setMonth] = useState<number>(today.getMonth()); // January is 0
  const [year, setYear] = useState<number>(today.getFullYear());
  const [isTodayActive, setIsTodayActive] = useState<boolean>(true);
  
  // Check if current selection is today's date
  const checkIfToday = (d: number, m: number, y: number) => {
    const currentDate = new Date();
    return (
      d === currentDate.getDate() &&
      m === currentDate.getMonth() &&
      y === currentDate.getFullYear()
    );
  };
  
  // Update isTodayActive whenever date changes
  useEffect(() => {
    setIsTodayActive(checkIfToday(day, month, year));
  }, [day, month, year]);
  
  useEffect(() => {
    // Calculate the kin for today when component mounts
    const calculatedKin = calculateKinAccurate(year, month + 1, day);
    onKinSelect(calculatedKin);
  }, [onKinSelect]);

  const handleDateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedKin = calculateKinAccurate(year, month + 1, day);
    onKinSelect(calculatedKin);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setYear(value === '' ? new Date().getFullYear() : parseInt(value));
    }
  };

  const incrementYear = () => {
    setYear(year + 1);
  };

  const decrementYear = () => {
    setYear(year - 1);
  };

  const incrementDay = () => {
    // Get days in current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const newDay = day + 1 > daysInMonth ? 1 : day + 1;
    setDay(newDay);
  };

  const decrementDay = () => {
    // Get days in current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const newDay = day - 1 < 1 ? daysInMonth : day - 1;
    setDay(newDay);
  };
  
  const setToday = () => {
    const currentDate = new Date();
    setDay(currentDate.getDate());
    setMonth(currentDate.getMonth());
    setYear(currentDate.getFullYear());
    
    // Calculate and update the kin for today
    const calculatedKin = calculateKinAccurate(
      currentDate.getFullYear(), 
      currentDate.getMonth() + 1, 
      currentDate.getDate()
    );
    onKinSelect(calculatedKin);
  };

  return (
    <div className="bg-tzolkin-lightBg p-4">
      <h2 className="text-xl font-bold text-black mb-4 text-center">Calculadora de Kin</h2>
      <form onSubmit={handleDateSubmit} className="flex flex-col gap-3">
        
        {/* Day input */}
        <div>
          <label className="block text-sm text-black mb-1">Dia</label>
          <div className="group relative">
            <Input
              type="number"
              min="1"
              max="31"
              value={day}
              onChange={(e) => setDay(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-white text-black rounded border border-gray-300"
              required
            />
            <div className="absolute right-1 top-0 bottom-0 opacity-0 group-hover:opacity-100 flex flex-col justify-center">
              <button 
                type="button" 
                onClick={incrementDay}
                className="text-xs text-black hover:bg-gray-100 px-1 font-bold"
              >▲</button>
              <button 
                type="button" 
                onClick={decrementDay}
                className="text-xs text-black hover:bg-gray-100 px-1 font-bold"
              >▼</button>
            </div>
          </div>
        </div>
        
        {/* Month input */}
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
        
        {/* Year input */}
        <div>
          <label className="block text-sm text-black mb-1">Ano</label>
          <div className="group relative">
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={4}
              value={year}
              onChange={(e) => {
                const value = e.target.value.replace(/\D+/g, '');
                setYear(value === '' ? new Date().getFullYear() : parseInt(value));
              }}
              onKeyDown={(e) => {
                // permite backspace, delete, setas, tab
                const ok = ['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'].includes(e.key);
                if (ok) return;
                // bloqueia letras / símbolos
                if (!/^\d$/.test(e.key)) e.preventDefault();
              }}
              className="w-full px-3 py-2 bg-white text-black rounded border border-gray-300"
              required
            />
            <div className="absolute right-1 top-0 bottom-0 opacity-0 group-hover:opacity-100 flex flex-col justify-center">
              <button 
                type="button" 
                onClick={incrementYear}
                className="text-xs text-black hover:bg-gray-100 px-1 font-bold"
              >▲</button>
              <button 
                type="button" 
                onClick={decrementYear}
                className="text-xs text-black hover:bg-gray-100 px-1 font-bold"
              >▼</button>
            </div>
          </div>
        </div>
        
        {/* Calculate Kin button - now at the bottom */}
        <Button 
          type="submit" 
          className="w-full bg-black text-white hover:bg-gray-800 mt-2"
        >
          Calcular Kin
        </Button>
      </form>
    </div>
  );
};

export default DateConverter;
