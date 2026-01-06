import { getGymDataMap } from "@/lib/gym-data";
import Calendar from "@/components/Calendar";

export default async function Home() {
  const gymDataMap = await getGymDataMap();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-3">
            Emilie went to the gym today
          </h1>
          <p className="text-lg text-gray-500">
            Tracking gym attendance for January 2026
          </p>
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
