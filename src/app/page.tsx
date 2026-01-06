import { getGymDataMap } from "@/lib/gym-data";
import Calendar from "@/components/Calendar";

export default async function Home() {
  const gymDataMap = await getGymDataMap();

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
          gymDataMap={gymDataMap}
        />
        
        <p className="text-center text-sm text-gray-500 mt-8">
          Data sourced from Google Sheets
        </p>
      </div>
    </main>
  );
}
