// Kaaba coordinates (Mecca, Saudi Arabia)
const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;

/**
 * Calculate the Qiblah direction (bearing to Kaaba) from a given location
 * Uses the spherical bearing formula for great-circle navigation
 * @param lat - Latitude of the observer's location in degrees
 * @param lon - Longitude of the observer's location in degrees
 * @returns Bearing in degrees from true north (0-360)
 */
export function calculateQiblahDirection(lat: number, lon: number): number {
  // Convert to radians
  const φ1 = (lat * Math.PI) / 180;
  const φ2 = (KAABA_LAT * Math.PI) / 180;
  const Δλ = ((KAABA_LON - lon) * Math.PI) / 180;

  // Calculate bearing using spherical trigonometry
  const x = Math.cos(φ2) * Math.sin(Δλ);
  const y = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

  // Convert to degrees and normalize to 0-360 range
  let bearing = (Math.atan2(x, y) * 180) / Math.PI;
  return (bearing + 360) % 360;
}

/**
 * Convert degrees to cardinal direction
 * @param degrees - Bearing in degrees (0-360)
 * @returns Cardinal direction (N, NE, E, SE, S, SW, W, NW)
 */
export function getCardinalDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

/**
 * Format Qiblah direction as a readable string
 * @param degrees - Bearing in degrees (0-360)
 * @returns Formatted string like "135° SE"
 */
export function formatQiblahDirection(degrees: number): string {
  return `${Math.round(degrees)}° ${getCardinalDirection(degrees)}`;
}
