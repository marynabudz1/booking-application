/**
 * Gets today's date in YYYY-MM-DD format for date input min attribute
 * @returns Today's date in YYYY-MM-DD format
 */
export const getTodayDateString = (): string => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

/**
 * Formats a date range (from-to) for display
 * @param dateFrom - Start date string
 * @param dateTo - End date string
 * @returns Formatted date range string
 */
export const formatDateRange = (dateFrom: string, dateTo: string): string => {
  if (!dateFrom || !dateTo) return ''
  
  const from = new Date(dateFrom)
  const to = new Date(dateTo)
  
  if (from.getTime() === to.getTime()) {
    return formatDate(dateFrom)
  }
  
  if (from.getMonth() === to.getMonth() && from.getFullYear() === to.getFullYear()) {
    const fromDay = from.getDate()
    const toDay = to.getDate()
    const month = from.toLocaleDateString('en-US', { month: 'short' })
    const year = from.getFullYear()
    return `${month} ${fromDay} - ${toDay}, ${year}`
  }

  if (from.getFullYear() === to.getFullYear()) {
    const fromFormatted = from.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const toFormatted = to.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const year = from.getFullYear()
    return `${fromFormatted} - ${toFormatted}, ${year}`
  }
  
  const fromFormatted = formatDate(dateFrom)
  const toFormatted = formatDate(dateTo)
  return `${fromFormatted} - ${toFormatted}`
}

/**
 * Formats time to European 24-hour format (HH:MM)
 * @param time - Time string (can be in 12h or 24h format)
 * @returns Time in 24-hour format (HH:MM)
 */
export const formatTime = (time: string): string => {
  if (!time) return ''
  
  // If already in 24-hour format, ensure proper formatting
  if (/^\d{1,2}:\d{2}$/.test(time) && !time.includes('AM') && !time.includes('PM')) {
    const [hours, minutes] = time.split(':')
    return `${hours.padStart(2, '0')}:${minutes}`
  }

  // If in 12-hour format, convert to 24-hour
  const [timePart, period] = time.split(' ')
  if (!timePart || !period) return time

  const [hours, minutes] = timePart.split(':')
  if (!hours || !minutes) return time

  let hour24 = parseInt(hours, 10)

  if (period.toUpperCase() === 'PM' && hour24 !== 12) {
    hour24 += 12
  } else if (period.toUpperCase() === 'AM' && hour24 === 12) {
    hour24 = 0
  }

  return `${hour24.toString().padStart(2, '0')}:${minutes}`
}

/**
 * Converts 12-hour time format (e.g., "10:00 AM") to 24-hour format (e.g., "10:00")
 * @param time12h - Time in 12-hour format with AM/PM (optional)
 * @returns Time in 24-hour format (HH:MM) or empty string if no value provided
 */
export const convert12hTo24h = (time12h?: string): string => {
  if (!time12h) return ''
  
  if (/^\d{2}:\d{2}$/.test(time12h)) {
    return time12h
  }

  const [time, period] = time12h.split(' ')
  if (!time || !period) return ''

  const [hours, minutes] = time.split(':')
  if (!hours || !minutes) return ''

  let hour24 = parseInt(hours, 10)

  if (period.toUpperCase() === 'PM' && hour24 !== 12) {
    hour24 += 12
  } else if (period.toUpperCase() === 'AM' && hour24 === 12) {
    hour24 = 0
  }

  return `${hour24.toString().padStart(2, '0')}:${minutes}`
}
