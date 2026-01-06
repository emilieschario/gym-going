// Google Sheets data fetching utility
// Fetches gym attendance data from public Google Sheet

const SPREADSHEET_ID = "1hjp8Ba90tuxwUuPHekV3xg2z1lX73gI0aZfwSIxSKJc";
const SHEET_GID = "0";
const GOOGLE_SHEETS_CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

export interface GymDay {
  date: string;
  answer: "YES" | "NO";
}

/**
 * Fetches gym attendance data from Google Sheets
 * Returns an array of GymDay objects with date and YES/NO answer
 */
export async function fetchGymData(): Promise<GymDay[]> {
  try {
    const response = await fetch(GOOGLE_SHEETS_CSV_URL, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const csvText = await response.text();
    const lines = csvText.trim().split("\n");
    
    // Skip header row and parse data
    // Expected format: Date, Boolean (TRUE means YES, empty means NO)
    const gymDays: GymDay[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Handle potential comma within quoted fields
      const parts = line.split(",");
      const date = parts[0].trim();
      const boolValue = parts[1]?.trim();
      
      if (date && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        gymDays.push({
          date,
          answer: boolValue === "TRUE" ? "YES" : "NO",
        });
      }
    }

    return gymDays;
  } catch (error) {
    console.error("Error fetching gym data:", error);
    return [];
  }
}

/**
 * Creates a map of date -> answer for quick lookups
 */
export async function getGymDataMap(): Promise<Map<string, "YES" | "NO">> {
  const gymDays = await fetchGymData();
  const dataMap = new Map<string, "YES" | "NO">();
  
  for (const day of gymDays) {
    dataMap.set(day.date, day.answer);
  }
  
  return dataMap;
}
