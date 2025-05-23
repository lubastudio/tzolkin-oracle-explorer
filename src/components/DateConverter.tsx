
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
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setYear(value);
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
    <div className="bg-tzolkin-lightBg rounded-lg p-4 shadow-lg">
      <form onSubmit={handleDateSubmit} className="flex flex-col gap-3">
        {/* Today button - now at the top */}
        <Button 
          type="button" 
          onClick={setToday}
          className={`w-full text-black ${isTodayActive ? 'bg-[#eee5d5]' : 'bg-[#f8f6f2]'} hover:bg-[#eee5d5] border-none`}
        >
          <CalendarDays className="w-4 h-4 mr-1" />
          Hoje
        </Button>
        
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
                className="text-xs text-black hover:bg-gray-100 px-1"
              >▲</button>
              <button 
                type="button" 
                onClick={decrementDay}
                className="text-xs text-black hover:bg-gray-100 px-1"
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
            <Input
              type="number"
              value={year}
              onChange={handleYearChange}
              className="w-full px-3 py-2 bg-white text-black rounded border border-gray-300"
              required
            />
            <div className="absolute right-1 top-0 bottom-0 opacity-0 group-hover:opacity-100 flex flex-col justify-center">
              <button 
                type="button" 
                onClick={incrementYear}
                className="text-xs text-black hover:bg-gray-100 px-1"
              >▲</button>
              <button 
                type="button" 
                onClick={decrementYear}
                className="text-xs text-black hover:bg-gray-100 px-1"
              >▼</button>
            </div>
          </div>
        </div>
        
        {/* Calculate Kin button - now at the bottom */}
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/80 mt-2"
          disabled={isTodayActive}
        >
          Calcular Kin
        </Button>
      </form>
    </div>
  );
};

export default DateConverter;
