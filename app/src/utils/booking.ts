import type { Booking } from '~/types'

export const dateRangesOverlap = (
  currentStartDate: string,
  currentEndDate: string,
  futureStartDate: string,
  futureEndDate: string
): boolean => {
  const currentStart = new Date(currentStartDate).getTime()
  const currentEnd = new Date(currentEndDate).getTime()
  const futureStart = new Date(futureStartDate).getTime()
  const futureEnd = new Date(futureEndDate).getTime()

  return currentStart <= futureEnd && futureStart <= currentEnd
}

export const hasOverlappingBooking = (
  newBooking: Booking,
  existingBookings: Booking[],
  excludeId?: string
): boolean => {
  return existingBookings.some((existing) => {
    if (excludeId && existing.id === excludeId) return false
    
    const datesOverlap = dateRangesOverlap(
      existing.dateFrom,
      existing.dateTo,
      newBooking.dateFrom,
      newBooking.dateTo
    )

    return datesOverlap
  })
}

