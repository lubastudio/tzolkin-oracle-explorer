
// Create a new utility file for date operations
import { months, yearValues } from "./tzolkinData";

export const getValidYear = (year: string): number => {
  const parsedYear = parseInt(year);
  const minYear = Math.min(...Object.keys(yearValues).map(Number));
  const maxYear = Math.max(...Object.keys(yearValues).map(Number));
  
  if (isNaN(parsedYear)) return new Date().getFullYear();
  if (parsedYear < minYear) return minYear;
  if (parsedYear > maxYear) return maxYear;
  
  return parsedYear;
};

export const getValidMonth = (month: string): number => {
  const parsedMonth = parseInt(month);
  
  if (isNaN(parsedMonth)) return new Date().getMonth() + 1;
  if (parsedMonth < 1) return 1;
  if (parsedMonth > 12) return 12;
  
  return parsedMonth;
};

export const getValidDay = (day: string, month: number, year: number): number => {
  const parsedDay = parseInt(day);
  
  if (isNaN(parsedDay)) return 1;
  
  // Get the last day of the month
  const lastDay = new Date(year, month, 0).getDate();
  
  if (parsedDay < 1) return 1;
  if (parsedDay > lastDay) return lastDay;
  
  return parsedDay;
};

export const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate();
};

export const incrementMonth = (month: number, year: number): { month: number, year: number } => {
  if (month === 12) {
    return { month: 1, year: year + 1 };
  } else {
    return { month: month + 1, year };
  }
};

export const decrementMonth = (month: number, year: number): { month: number, year: number } => {
  if (month === 1) {
    return { month: 12, year: year - 1 };
  } else {
    return { month: month - 1, year };
  }
};

export const incrementDay = (day: number, month: number, year: number): { day: number, month: number, year: number } => {
  const daysInMonth = getDaysInMonth(month, year);
  
  if (day === daysInMonth) {
    const { month: newMonth, year: newYear } = incrementMonth(month, year);
    return { day: 1, month: newMonth, year: newYear };
  } else {
    return { day: day + 1, month, year };
  }
};

export const decrementDay = (day: number, month: number, year: number): { day: number, month: number, year: number } => {
  if (day === 1) {
    const { month: newMonth, year: newYear } = decrementMonth(month, year);
    const daysInPrevMonth = getDaysInMonth(newMonth, newYear);
    return { day: daysInPrevMonth, month: newMonth, year: newYear };
  } else {
    return { day: day - 1, month, year };
  }
};

export const incrementYear = (year: number): number => {
  const maxYear = Math.max(...Object.keys(yearValues).map(Number));
  return year < maxYear ? year + 1 : year;
};

export const decrementYear = (year: number): number => {
  const minYear = Math.min(...Object.keys(yearValues).map(Number));
  return year > minYear ? year - 1 : year;
};

export const formatDate = (day: number, month: number, year: number): string => {
  const monthName = months[month - 1]?.name || '';
  return `${day} de ${monthName} de ${year}`;
};
