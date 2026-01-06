import { getGymDataMap } from "@/lib/gym-data";
import Calendar from "@/components/Calendar";

// Fetch timestamp from static file (updated by GitHub Action)
async function getTimestamp() {
  try {
    const response = await fetch("/data-timestamp.json", { cache: "no-store" });
    if (response.ok) {
      const data = await response.json();
      return data.lastUpdatedET;
    }
  } catch {
    // Fallback to current time if file not available
  }
  return new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  }) + " ET";
}

export default async function Home() {
  const gymDataMap = await getGymDataMap();
  const lastUpdated = await getTimestamp();
  
  const today = "2026-01-06";
  const todayAnswer = gymDataMap.get(today);
  const didGoToday = todayAnswer === "YES";

  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-10">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-stone-800 tracking-tight">
            Did Emilie go to the gym today?
          </h1>
          
          {/* Status Badge */}
          <div className={`
            inline-flex items-center gap-3 px-8 py-5 rounded-full font-semibold text-lg shadow-sm
            ${didGoToday 
              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" 
              : "bg-stone-100 text-stone-600 ring-1 ring-stone-200"
            }
          `}>
            <span className="text-2xl">{didGoToday ? "✓" : "✗"}</span>
            <span>
              {didGoToday 
                ? "Emilie went to the gym today" 
                : "Emilie did not go to the gym today"
              }
            </span>
          </div>
        </div>
        
        {/* Calendar */}
        <Calendar
          year={2026}
          month={1}
          gymDataMap={gymDataMap}
        />
        
        {/* Footer */}
        <p className="text-center text-sm text-stone-400">
          Data last updated: {lastUpdated}
        </p>
      </div>
    </main>
  );
}
