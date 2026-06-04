import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, phone } = await request.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:D",
      valueInputOption: "RAW",
      requestBody: {
        values: [[name, email, phone, new Date().toISOString()]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Sheets error:", err);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}