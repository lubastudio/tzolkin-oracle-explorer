
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
  const [dayInput, setDayInput] = useState<string>(String(today.getDate()));
  const [month, setMonth] = useState<number>(today.getMonth()); // January is 0
  const [yearInput, setYearInput] = useState<string>(String(today.getFullYear()));
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
    const d = dayInput === '' ? today.getDate() : parseInt(dayInput, 10);
    const y = yearInput === '' ? today.getFullYear() : parseInt(yearInput, 10);
    setIsTodayActive(checkIfToday(d, month, y));
  }, [dayInput, month, yearInput]);
  
  useEffect(() => {
    // Calculate the kin for today when component mounts
    const calculatedKin = calculateKinAccurate(today.getFullYear(), month + 1, today.getDate());
    onKinSelect(calculatedKin);
  }, [onKinSelect]);

  const handleDateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const y = yearInput === '' ? today.getFullYear() : parseInt(yearInput, 10);
    const d = dayInput === '' ? today.getDate() : parseInt(dayInput, 10);
    const calculatedKin = calculateKinAccurate(y, month + 1, d);
    onKinSelect(calculatedKin);
  };

  const incrementYear = () => {
    const currentYear = yearInput === '' ? today.getFullYear() : parseInt(yearInput, 10);
    setYearInput(String(currentYear + 1));
  };

  const decrementYear = () => {
    const currentYear = yearInput === '' ? today.getFullYear() : parseInt(yearInput, 10);
    setYearInput(String(currentYear - 1));
  };

  const incrementDay = () => {
    const currentDay = dayInput === '' ? today.getDate() : parseInt(dayInput, 10);
    const currentYear = yearInput === '' ? today.getFullYear() : parseInt(yearInput, 10);
    const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
    const newDay = currentDay + 1 > daysInMonth ? 1 : currentDay + 1;
    setDayInput(String(newDay));
  };

  const decrementDay = () => {
    const currentDay = dayInput === '' ? today.getDate() : parseInt(dayInput, 10);
    const currentYear = yearInput === '' ? today.getFullYear() : parseInt(yearInput, 10);
    const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
    const newDay = currentDay - 1 < 1 ? daysInMonth : currentDay - 1;
    setDayInput(String(newDay));
  };
  
  const setToday = () => {
    const currentDate = new Date();
    setDayInput(String(currentDate.getDate()));
    setMonth(currentDate.getMonth());
    setYearInput(String(currentDate.getFullYear()));
    
    // Calculate and update the kin for today
    const calculatedKin = calculateKinAccurate(
      currentDate.getFullYear(), 
      currentDate.getMonth() + 1, 
      currentDate.getDate()
    );
    onKinSelect(calculatedKin);
  };

  return (
    <div className="p-4">
      <h2 className="text-base text-black mb-4 text-center">Calculadora de Kin</h2>
      <form onSubmit={handleDateSubmit} className="flex flex-col gap-4">
        
        {/* Day input */}
        <div className="flex items-center gap-4">
          <label className="text-sm text-black w-12 shrink-0">Dia</label>
          <div className="group relative flex-1">
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={2}
              value={dayInput}
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/\D+/g, '');
                setDayInput(onlyDigits);
              }}
              onBlur={() => {
                if (dayInput === '') return;
                const n = parseInt(dayInput, 10);
                const clamped = Math.max(1, Math.min(31, isNaN(n) ? 1 : n));
                setDayInput(String(clamped));
              }}
              onKeyDown={(e) => {
                // permite backspace, delete, setas, tab
                const ok = ['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'].includes(e.key);
                if (ok) return;
                // bloqueia letras / símbolos
                if (!/^\d$/.test(e.key)) e.preventDefault();
              }}
              className="w-full px-4 py-3 text-black rounded-lg border border-gray-300 text-sm"
              style={{ backgroundColor: '#f9f8f7' }}
              required
            />
            <div className="absolute right-2 top-0 bottom-0 opacity-0 group-hover:opacity-100 flex flex-col justify-center">
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
        <div className="flex items-center gap-4">
          <label className="text-sm text-black w-12 shrink-0">Mês</label>
          <select
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            className="flex-1 h-12 px-4 py-3 text-black rounded-lg border border-gray-300 text-sm"
            style={{ backgroundColor: '#f9f8f7' }}
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
        <div className="flex items-center gap-4">
          <label className="text-sm text-black w-12 shrink-0">Ano</label>
          <div className="group relative flex-1">
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={4}
              value={yearInput}
              onChange={(e) => {
                // permite vazio; só remove não-dígitos
                const next = e.target.value.replace(/\D+/g, '');
                setYearInput(next);
              }}
              onKeyDown={(e) => {
                const ok = ['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'].includes(e.key);
                if (!ok && !/^\d$/.test(e.key)) e.preventDefault();
              }}
              className="w-full px-4 py-3 text-black rounded-lg border border-gray-300 text-sm"
              style={{ backgroundColor: '#f9f8f7' }}
              required
            />
            <div className="absolute right-2 top-0 bottom-0 opacity-0 group-hover:opacity-100 flex flex-col justify-center">
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
          className="w-full text-white hover:opacity-90 mt-2 text-sm font-bold"
          style={{ backgroundColor: '#333333' }}
        >
          Calcular Kin
        </Button>
      </form>
    </div>
  );
};

export default DateConverter;
