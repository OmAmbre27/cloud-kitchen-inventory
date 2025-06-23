import axios from 'axios';

// Replace with your Sheet.best API endpoint
const SHEET_API_URL = 'https://sheet.best/api/sheets/your-sheet-id';

export async function fetchSOPsFromGoogleSheet() {
  try {
    const response = await axios.get(SHEET_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching SOPs from Google Sheet:', error);
    return [];
  }
} 