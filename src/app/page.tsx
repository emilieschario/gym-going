import { getGymDataMap } from "@/lib/gym-data";
import Calendar from "@/components/Calendar";

// Demo data for January 2026 - shows sample gym attendance
// This will be replaced by Google Sheet data when available
const DEMO_DATA: Map<string, "YES" | "NO"> = new Map([
  ["2026-01-02", "YES"],
  ["2026-01-03", "NO"],
  ["2026-01-04", "YES"],
  ["2026-01-06", "YES"],
  ["2026-01-08", "NO"],
  ["2026-01-09", "YES"],
  ["2026-01-11", "YES"],
  ["2026-01-13", "NO"],
  ["2026-01-14", "YES"],
  ["2026-01-16", "YES"],
  ["2026-01-18", "NO"],
  ["2026-01-20", "YES"],
  ["2026-01-21", "YES"],
  ["2026-01-23", "NO"],
  ["2026-01-25", "YES"],
  ["2026-01-27", "YES"],
  ["2026-01-30", "NO"],
]);

export default async function Home() {
  const gymDataMap = await getGymDataMap();
  
  // If no data from Google Sheet, use demo data
  const displayData = gymDataMap.size > 0 ? gymDataMap : DEMO_DATA;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Emilie went to the gym today
        </h1>
        <p className="text-center text-gray-600 mb-8">
          January 2026
        </p>
        
        <Calendar
          year={2026}
          month={1}
          gymDataMap={displayData}
        />
        
        <p className="text-center text-sm text-gray-500 mt-8">
          Data sourced from Google Sheets
        </p>
      </div>
    </main>
  );
}
