import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Booking } from '~/types'
import { hasOverlappingBooking } from '~/utils/booking'
import { generateBookingReference } from '~/utils/bookingReference'

const STORAGE_KEY = 'bookings'

const getBookingsFromStorage = (): Booking[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    return JSON.parse(stored)
  } catch {
    return []
  }
}

const saveBookingsToStorage = (bookings: Booking[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
  } catch (error) {
    console.error('Failed to save bookings to localStorage:', error)
  }
}

export const bookingsApi = createApi({
  reducerPath: 'bookingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Booking'],
  endpoints: (builder) => ({
    getBookings: builder.query<Booking[], void>({
      queryFn: () => {
        const bookings = getBookingsFromStorage()
        return { data: bookings }
      },
      providesTags: ['Booking'],
    }),
    createBooking: builder.mutation<Booking, Omit<Booking, 'id'>>({
      queryFn: (newBooking) => {
        const bookings = getBookingsFromStorage()
  
        const hasOverlapBooking = hasOverlappingBooking(newBooking as Booking, bookings)
        if (hasOverlapBooking) {
          return {
            error: {
              status: 400,
              data: 'You already have a booking for these dates. Please choose a different date range.',
            },
          }
        }
        
        const booking: Booking = {
          ...newBooking,
          id: crypto.randomUUID(),
          bookingReference: generateBookingReference(),
        }
        bookings.push(booking)
        saveBookingsToStorage(bookings)
        return { data: booking }
      },
      invalidatesTags: ['Booking'],
    }),
    updateBooking: builder.mutation<Booking, Booking>({
      queryFn: (booking) => {
        const bookings = getBookingsFromStorage()
        const index = bookings.findIndex((b) => b.id === booking.id)
        if (index >= 0) {
          if (hasOverlappingBooking(booking, bookings, booking.id)) {
            return {
              error: {
                status: 400,
                data: 'You already have a booking for these dates. Please choose a different date range.',
              },
            }
          }
          
          bookings[index] = booking
          saveBookingsToStorage(bookings)
          return { data: booking }
        }
        return { error: { status: 404, data: 'Booking not found' } }
      },
      invalidatesTags: ['Booking'],
    }),
    deleteBooking: builder.mutation<void, string>({
      queryFn: (id) => {
        const bookings = getBookingsFromStorage()
        const index = bookings.findIndex((b) => b.id === id)
        if (index >= 0) {
          bookings.splice(index, 1)
          saveBookingsToStorage(bookings)
          return { data: undefined }
        }
        return { error: { status: 404, data: 'Booking not found' } }
      },
      invalidatesTags: ['Booking'],
    }),
  }),
})

export const {
  useGetBookingsQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingsApi

