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
    <main className="min-h-screen bg-stone-50 pb-24 flex flex-col items-center">
      <div className="w-full max-w-md px-4 py-10 sm:px-6 sm:py-14">
        {/* Header Section */}
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-xl sm:text-2xl font-semibold text-stone-900 tracking-tight mb-5">
            Did Emilie go to the{" "}
            <span className="gradient-text">gym</span> today?
          </h1>
          
          {/* Status Card */}
          <div className={`
            inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm sm:text-base font-medium
            transition-colors
            ${didGoToday
              ? "bg-emerald-100 text-emerald-800"
              : "bg-stone-100 text-stone-600"
            }
          `}>
            <span className="text-lg sm:text-xl">
              {didGoToday ? "✓" : "—"}
            </span>
            <span>
              {didGoToday
                ? "Yes! She went to the gym."
                : "Not today — rest day."
              }
            </span>
          </div>
        </header>
        
        {/* Calendar */}
        <div className="animate-fade-in-delay-1">
          <Calendar
            year={2026}
            month={1}
            gymDataMap={gymDataMap}
          />
        </div>
        
        {/* Footer info */}
        <footer className="mt-6 text-center animate-fade-in-delay-2">
          <p className="text-xs text-stone-400">
            Last updated {lastUpdated}
          </p>
        </footer>
      </div>
    </main>
  );
}
