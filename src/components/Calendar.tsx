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

  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold text-center mb-4">{monthName}</h2>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-600"
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`
              aspect-square flex items-center justify-center text-lg border rounded
              ${day.date === null ? "border-transparent" : "border-gray-300"}
              ${day.answer === "YES" ? "bg-green-100 text-green-800" : ""}
              ${day.answer === "NO" ? "bg-gray-50" : ""}
            `}
          >
            {day.date !== null && (
              <>
                <span className="mr-1 text-gray-400">{day.date}</span>
                {day.answer === "YES" && (
                  <span className="font-bold text-green-600">X</span>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-100 border border-green-600 flex items-center justify-center">
            <span className="font-bold text-green-600">X</span>
          </div>
          <span>YES (went to gym)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-50 border border-gray-300 flex items-center justify-center">
            <span className="text-gray-300"></span>
          </div>
          <span>NO (did not go)</span>
        </div>
      </div>
    </div>
  );
}
