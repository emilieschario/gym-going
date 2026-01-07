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
  const totalDays = yesCount + noCount;
  const percentage = totalDays > 0 ? Math.round((yesCount / totalDays) * 100) : 0;

  return (
    <div className="glass rounded-3xl shadow-xl shadow-emerald-900/5 border border-white/50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800 px-7 py-6 sm:px-10 sm:py-7 relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }}>
          </div>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white text-center tracking-wide flex items-center justify-center gap-3">
            <span>📅</span>
            {monthName}
          </h2>
          
          {/* Stats bar */}
          <div className="flex justify-center gap-4 sm:gap-6 mt-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-xl px-3 py-2 sm:px-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div className="text-left">
                <span className="text-emerald-300 font-bold text-lg">{yesCount}</span>
                <span className="text-stone-400 text-xs block">gym days</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-xl px-3 py-2 sm:px-4">
              <div className="w-8 h-8 bg-stone-600 rounded-lg flex items-center justify-center">
                <span className="text-stone-400 text-sm">—</span>
              </div>
              <div className="text-left">
                <span className="text-stone-300 font-bold text-lg">{noCount}</span>
                <span className="text-stone-400 text-xs block">rest days</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          {totalDays > 0 && (
            <div className="mt-4 max-w-sm mx-auto px-3 sm:px-4">
              <div className="flex justify-between text-xs text-stone-400 mb-1">
                <span>Progress</span>
                <span className="text-emerald-400 font-semibold">{percentage}%</span>
              </div>
              <div className="h-2 bg-stone-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="p-6 sm:p-8 bg-white/50">
        <div className="grid grid-cols-7 gap-1 mb-3 sm:mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
            <div
              key={i}
              className="text-center text-xs font-semibold text-stone-500 uppercase tracking-wider py-1.5 sm:py-2"
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
                aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-medium
                transition-all duration-300 transform
                ${day.date === null ? "" : "hover:scale-105 cursor-default"}
                ${day.date === null
                  ? "bg-transparent"
                  : day.answer === "YES"
                    ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                    : day.answer === "NO"
                      ? "bg-stone-100 text-stone-500 hover:bg-stone-200"
                      : "bg-white/60 text-stone-400 border border-stone-200/50 border-dashed"
                }
              `}
            >
              {day.date !== null && (
                <>
                  <span className={`text-xs ${day.answer === "YES" ? "opacity-80" : ""}`}>
                    {day.date}
                  </span>
                  {day.answer === "YES" && (
                    <span className="text-base font-bold drop-shadow">✓</span>
                  )}
                  {day.answer === "NO" && (
                    <span className="text-xs text-stone-400">•</span>
                  )}
                  {day.answer === null && (
                    <span className="text-xs text-stone-300">—</span>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex justify-center gap-8 mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-stone-200/50">
          <div className="flex items-center gap-2 group">
            <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <span className="text-sm text-stone-600 font-medium">Gym day</span>
          </div>
          <div className="flex items-center gap-2 group">
            <div className="w-6 h-6 bg-stone-100 rounded-lg flex items-center justify-center border border-stone-200 group-hover:scale-110 transition-transform">
              <span className="text-stone-300 text-xs">•</span>
            </div>
            <span className="text-sm text-stone-600 font-medium">Rest day</span>
          </div>
        </div>
      </div>
    </div>
  );
}
