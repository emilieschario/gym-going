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
    
    // Get first day of month (0 = Sunday, 1 = Monday, etc.)
    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({ date: null, dateStr: "", answer: null });
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const answer = gymDataMap.get(dateStr) || null;
      days.push({ date: day, dateStr, answer });
    }
    
    return days;
  }, [year, month, gymDataMap]);

  // Calculate stats
  const yesCount = [...gymDataMap.values()].filter(v => v === "YES").length;
  const noCount = [...gymDataMap.values()].filter(v => v === "NO").length;

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-8">
        <h2 className="text-3xl font-bold text-white text-center">{monthName}</h2>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="font-bold text-white">✓</span>
            </div>
            <span className="text-white/90 font-medium">{yesCount} days</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="text-white/50">—</span>
            </div>
            <span className="text-white/90 font-medium">{noCount} days</span>
          </div>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="p-6">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider"
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
                aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-medium transition-all duration-200
                ${day.date === null ? "" : ""}
                ${day.answer === "YES" 
                  ? "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-300 ring-inset" 
                  : day.answer === "NO" 
                    ? "bg-gray-50 text-gray-300" 
                    : "bg-gray-50 text-gray-200"
                }
                ${day.date !== null ? "hover:scale-105 cursor-default" : ""}
              `}
            >
              {day.date !== null && (
                <>
                  <span className="text-xs opacity-50">{day.date}</span>
                  {day.answer === "YES" && (
                    <span className="text-lg font-bold text-emerald-600">✓</span>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex justify-center gap-8 mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center ring-2 ring-emerald-300">
              <span className="text-emerald-600 font-bold text-xs">✓</span>
            </div>
            <span className="text-sm text-gray-600">Went to gym</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gray-50 rounded-lg flex items-center justify-center">
              <span className="text-gray-300 text-xs"></span>
            </div>
            <span className="text-sm text-gray-600">Did not go</span>
          </div>
        </div>
      </div>
    </div>
  );
}
