import { NextRequest, NextResponse } from "next/server";

const BASE_RATES = {
  "Local Move": { twoMan: 130, threeMan: 175 },
  "Long Distance": { twoMan: 160, threeMan: 210 },
  "Apartment Move": { twoMan: 130, threeMan: 175 },
  "Office / Commercial Move": { twoMan: 150, threeMan: 200 },
  "Packing Services Only": { twoMan: 60, threeMan: 85 },
  "Furniture Assembly Only": { twoMan: 85, threeMan: 110 },
  "Storage Move": { twoMan: 140, threeMan: 185 },
};

const BEDROOM_HOURS = {
  studio: 2,
  "1br": 3,
  "2br": 4.5,
  "3br": 7,
  "4br+": 10,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { moveType, bedrooms, crewSize = "twoMan", hasElevator, distance } = body;

    const rates = BASE_RATES[moveType as keyof typeof BASE_RATES] || BASE_RATES["Local Move"];
    const hourlyRate = crewSize === "threeMan" ? rates.threeMan : rates.twoMan;
    const baseHours = BEDROOM_HOURS[bedrooms as keyof typeof BEDROOM_HOURS] || 4;

    let estimatedHours = baseHours;
    if (!hasElevator && bedrooms !== "studio") estimatedHours += 0.5;
    if (distance > 30) estimatedHours += (distance - 30) / 30;

    const low = Math.round(hourlyRate * estimatedHours * 0.85);
    const high = Math.round(hourlyRate * estimatedHours * 1.2);

    return NextResponse.json({
      hourlyRate,
      estimatedHours: Math.round(estimatedHours * 10) / 10,
      estimateLow: low,
      estimateHigh: high,
      note: "Final quote provided after review. No hidden fees.",
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
