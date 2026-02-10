/** Eingabe TT.MM.JJJJ → DB-Format YYYY-MM-DD */
export function parseBirthDate(input: string): string | null {
  const trimmed = input.trim();
  const match = trimmed.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (!match) return null;
  const [, day, month, year] = match;
  const d = parseInt(day, 10);
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);
  if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > new Date().getFullYear())
    return null;
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

/** DB-Format YYYY-MM-DD → Anzeige TT.MM.JJJJ */
export function formatBirthDateForInput(birthDate: string | null): string {
  if (!birthDate) return "";
  const [y, m, d] = birthDate.split("-");
  if (!y || !m || !d) return "";
  return `${d.padStart(2, "0")}.${m.padStart(2, "0")}.${y}`;
}
