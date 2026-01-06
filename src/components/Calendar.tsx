"use client";

import { useMemo } from "react";

interface CalendarProps {
  year: number;
  month: number;
  gymDataMap: Map<string, "YES" | "NO">;
}

export default function Calendar({ year, month, gymDataMap }: CalendarProps) {
  const monthName = useMemo(() => {
    return new Date(year, month - 1).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  }, [year, month]);

  const calendarDays = useMemo(() => {
    const days: { date: number | null; dateStr: string; answer: "YES" | "NO" | null }[] = [];
    
    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    
    for (let i = 0; i < firstDay; i++) {
      days.push({ date: null, dateStr: "", answer: null });
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const answer = gymDataMap.get(dateStr) || null;
      days.push({ date: day, dateStr, answer });
    }
    
    return days;
  }, [year, month, gymDataMap]);

  const yesCount = [...gymDataMap.values()].filter(v => v === "YES").length;
  const noCount = [...gymDataMap.values()].filter(v => v === "NO").length;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-stone-100 overflow-hidden">
      {/* Header */}
      <div className="bg-stone-800 px-6 py-6">
        <h2 className="text-2xl font-semibold text-white text-center tracking-wide">
          {monthName}
        </h2>
        <div className="flex justify-center gap-8 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-emerald-500/20 rounded flex items-center justify-center">
              <span className="text-emerald-400 font-bold text-sm">✓</span>
            </div>
            <span className="text-stone-300 text-sm font-medium">{yesCount} days</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-stone-600/50 rounded flex items-center justify-center">
              <span className="text-stone-400 text-sm">—</span>
            </div>
            <span className="text-stone-300 text-sm font-medium">{noCount} days</span>
          </div>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="p-6">
        <div className="grid grid-cols-7 gap-1 mb-3">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <div
              key={i}
              className="text-center text-xs font-medium text-stone-400 uppercase"
            >
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`
                aspect-square flex flex-col items-center justify-center rounded-lg text-sm font-medium
                ${day.date === null ? "" : ""}
                ${day.answer === "YES" 
                  ? "bg-emerald-500 text-white" 
                  : day.answer === "NO" 
                    ? "bg-stone-100 text-stone-400" 
                    : "bg-stone-50 text-stone-200"
                }
              `}
            >
              {day.date !== null && (
                <>
                  <span className="text-xs opacity-70">{day.date}</span>
                  {day.answer === "YES" && (
                    <span className="text-base font-bold">✓</span>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-emerald-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <span className="text-sm text-stone-600">Gym day</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-stone-100 rounded flex items-center justify-center">
              <span className="text-stone-300 text-xs"></span>
            </div>
            <span className="text-sm text-stone-600">Rest day</span>
          </div>
        </div>
      </div>
    </div>
  );
}
