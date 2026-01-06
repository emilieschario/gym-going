import { getGymDataMap } from "@/lib/gym-data";
import Calendar from "@/components/Calendar";

export default async function Home() {
  const gymDataMap = await getGymDataMap();
  
  // Get today's date (January 6, 2026)
  const today = "2026-01-06";
  const todayAnswer = gymDataMap.get(today);
  const didGoToday = todayAnswer === "YES";

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Did Emilie go to the gym today?
          </h1>
          <div className={`
            inline-flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold text-xl
            ${didGoToday 
              ? "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-300" 
              : "bg-gray-100 text-gray-600 ring-2 ring-gray-200"
            }
          `}>
            {didGoToday ? (
              <>
                <span className="text-2xl">✓</span>
                <span>Emilie went to the gym today</span>
              </>
            ) : (
              <>
                <span className="text-2xl">✗</span>
                <span>Emilie did not go to the gym today</span>
              </>
            )}
          </div>
        </div>
        
        <Calendar
          year={2026}
          month={1}
          gymDataMap={gymDataMap}
        />
        
        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-8">
          Data sourced from Google Sheets • Updates hourly
        </p>
      </div>
    </main>
  );
}
