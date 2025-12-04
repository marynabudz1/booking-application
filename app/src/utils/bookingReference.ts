export const generateBookingReference = (): string => {
  const year = new Date().getFullYear()
  const randomChars = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()
  return `BK-${year}-${randomChars}`
}


