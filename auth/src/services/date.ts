export function getDateNDaysFromNow(days: number): Date {
  // Get the current date
  const currentDate = new Date();

  // Add the specified number of days to the current date
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + days);

  return futureDate;
}