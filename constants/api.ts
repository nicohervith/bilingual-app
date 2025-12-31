// API endpoints configuration
const API_BASE_URL =
  process.env.EXPO_PUBLIC_BACKEND_URL ||
  "https://billingual-app-back.onrender.com";

export const API_ENDPOINTS = {
  CHECK_LEVEL_ACCESS: (userId: string) =>
    `${API_BASE_URL}/check-level-access/${userId}`,
  CHECK_LEVEL_ACCESS_SPECIFIC: (userId: string, levelId: string) =>
    `${API_BASE_URL}/check-level-access/${userId}/${levelId}`,
  WAKE_UP: `${API_BASE_URL}/wake-up`,
  TRANSCRIBE: `${API_BASE_URL}/transcribe`,
} as const;
