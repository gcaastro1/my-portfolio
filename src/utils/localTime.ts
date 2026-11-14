export const LOCAL_TIMEZONE = 'America/Sao_Paulo'

export function formatLocalTime(
  date: Date,
  timeZone: string = LOCAL_TIMEZONE,
): string {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone,
  }).format(date)
}
