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

  // Calculate days up to and including today
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // JS months are 0-indexed
  const currentDay = today.getDate();
  
  // If viewing current month/year, count up to today; otherwise count all days in the month
  const isCurrentMonth = year === currentYear && month === currentMonth;
  const daysInMonth = new Date(year, month, 0).getDate();
  const totalDays = isCurrentMonth ? currentDay : daysInMonth;
  
  // Count gym days only up to totalDays
  const yesCount = [...gymDataMap.entries()]
    .filter(([dateStr, answer]) => {
      const dayNum = parseInt(dateStr.split("-")[2], 10);
      return dayNum <= totalDays && answer === "YES";
    }).length;
  
  const percentage = totalDays > 0 ? Math.round((yesCount / totalDays) * 100) : 0;

  return (
    <div className="rounded-3xl overflow-hidden shadow-xl shadow-emerald-900/10 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500">
      {/* Header */}
      <div className="px-5 pt-6 pb-5 sm:px-7 sm:pt-7 sm:pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-white">
            {monthName}
          </h2>
          <div className="flex items-center gap-1.5 text-sm text-white/90">
            <span className="font-bold">{yesCount}</span>
            <span className="text-white/60">/</span>
            <span>{totalDays}</span>
            <span className="text-white/60 ml-0.5">days</span>
          </div>
        </div>
        
        {/* Progress bar */}
        {totalDays > 0 && (
          <div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-white rounded-full transition-all duration-700 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-xs text-white/70 mt-2 text-right">{percentage}% attendance rate</p>
          </div>
        )}
      </div>
      
      {/* Calendar Grid */}
      <div className="bg-white rounded-t-3xl pt-10 pb-8 sm:pt-14 sm:pb-10">
        {/* Inner container with side margins */}
        <div className="mx-8 sm:mx-14 lg:mx-16">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <div
                key={i}
                className="text-center text-[11px] sm:text-xs font-semibold text-stone-400 py-2"
              >
                {day}
              </div>
            ))}
          </div>
          
          {/* Spacer between weekday headers and date grid */}
          <div className="h-6 sm:h-8"></div>
          
          {/* Days grid */}
          <div className="grid grid-cols-7 gap-2 sm:gap-3">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`
                  aspect-square flex items-center justify-center rounded-xl text-xs sm:text-sm font-medium
                  transition-all duration-200 ease-out
                  ${day.date === null
                    ? ""
                    : day.answer === "YES"
                      ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-md shadow-emerald-400/30 hover:scale-105 hover:shadow-lg"
                      : day.answer === "NO"
                        ? "bg-stone-100 text-stone-400 hover:bg-stone-200"
                        : "bg-stone-50 text-stone-300 border border-dashed border-stone-200"
                  }
                `}
              >
                {day.date !== null && (
                  <span>{day.date}</span>
                )}
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6 pt-5 border-t border-stone-100">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-md shadow-sm" />
              <span className="text-xs text-stone-500">Gym day</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-stone-100 rounded-md border border-stone-200" />
              <span className="text-xs text-stone-500">Rest day</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
