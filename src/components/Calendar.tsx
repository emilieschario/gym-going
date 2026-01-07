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
  const totalDays = [...gymDataMap.values()].length;
  const percentage = totalDays > 0 ? Math.round((yesCount / totalDays) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-4 sm:px-5 sm:py-5 border-b border-stone-100">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold text-stone-900">
            {monthName}
          </h2>
          <div className="flex items-center gap-1 text-xs sm:text-sm">
            <span className="font-medium text-emerald-600">{yesCount}</span>
            <span className="text-stone-400">/</span>
            <span className="text-stone-500">{totalDays}</span>
            <span className="text-stone-400 ml-1">days</span>
          </div>
        </div>
        
        {/* Progress bar */}
        {totalDays > 0 && (
          <div className="mt-3">
            <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Calendar Grid */}
      <div className="px-3 py-4 sm:px-5 sm:py-5">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <div
              key={i}
              className="text-center text-[10px] sm:text-xs font-medium text-stone-400 py-1.5"
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`
                aspect-square flex items-center justify-center rounded-md sm:rounded-lg text-xs sm:text-sm
                transition-colors
                ${day.date === null
                  ? ""
                  : day.answer === "YES"
                    ? "bg-emerald-500 text-white font-medium"
                    : day.answer === "NO"
                      ? "bg-stone-100 text-stone-400"
                      : "bg-stone-50 text-stone-300"
                }
              `}
            >
              {day.date !== null && (
                <span>{day.date}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="px-4 py-3 sm:py-4 bg-stone-50 border-t border-stone-100">
        <div className="flex items-center justify-center gap-5 sm:gap-6 text-[10px] sm:text-xs text-stone-500">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 rounded" />
            <span>Gym</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-stone-100 rounded border border-stone-200" />
            <span>Rest</span>
          </div>
        </div>
      </div>
    </div>
  );
}
