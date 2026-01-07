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
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-stone-50 to-teal-50 relative overflow-hidden pb-24">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-10 sm:px-10 sm:py-14">
        <div className="w-full max-w-lg space-y-6 sm:space-y-8">
          {/* Header Card */}
          <div className="glass rounded-3xl shadow-xl shadow-emerald-900/5 p-6 sm:p-8 border border-white/50 animate-bounce-in">
            <div className="text-center space-y-5 sm:space-y-6">
              <div className="text-5xl animate-float">🏋️‍♀️</div>

              <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 tracking-tight">
                Did Emilie go to the
                <span className="block gradient-text">gym today?</span>
              </h1>
              
              {/* Status Badge */}
              <div className={`
                inline-flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold text-lg
                transition-all duration-500 transform hover:scale-105
                ${didGoToday 
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30" 
                  : "bg-stone-100 text-stone-600 ring-1 ring-stone-200 shadow-lg shadow-stone-200/50"
                }
              `}>
                <span className={`text-2xl ${didGoToday ? 'animate-pulse-soft' : ''}`}>
                  {didGoToday ? "💪" : "😴"}
                </span>
                <span>
                  {didGoToday 
                    ? "Yes! Emilie crushed it!" 
                    : "Rest day for Emilie"
                  }
                </span>
              </div>

            </div>
          </div>
          
          {/* Calendar */}
          <div className="animate-bounce-in" style={{ animationDelay: '0.1s' }}>
            <Calendar
              year={2026}
              month={1}
              gymDataMap={gymDataMap}
            />
          </div>
          
          {/* Footer info */}
          <div className="text-center space-y-2 animate-bounce-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-sm text-stone-400 flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Data last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
