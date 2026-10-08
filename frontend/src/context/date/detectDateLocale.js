// The United States is the only country that reads dates as MM/DD/YYYY, so the
// whole detection comes down to recognising its time zones. Everything else
// gets en-gb, which keeps English month names but DD/MM/YYYY and Monday first.

const US_TIME_ZONES = new Set([
  "America/Adak",
  "America/Anchorage",
  "America/Boise",
  "America/Chicago",
  "America/Denver",
  "America/Detroit",
  "America/Juneau",
  "America/Los_Angeles",
  "America/Menominee",
  "America/Metlakatla",
  "America/New_York",
  "America/Nome",
  "America/Phoenix",
  "America/Sitka",
  "America/Yakutat",
  "Pacific/Honolulu",
]);

const US_TIME_ZONE_PREFIXES = [
  "America/Indiana/",
  "America/Kentucky/",
  "America/North_Dakota/",
];

function detectDateLocale() {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  const isUnitedStates =
    US_TIME_ZONES.has(timeZone) ||
    US_TIME_ZONE_PREFIXES.some((prefix) => timeZone.startsWith(prefix));

  return isUnitedStates ? "en" : "en-gb";
}

export default detectDateLocale;
