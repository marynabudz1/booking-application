import { convert12hTo24h } from '~/utils/date'
import { useUpdateBookingMutation } from '~/store/api/bookingsApi'
import type { BookingFormData, EditModalProps } from '~/types'

import Modal from '~/components/Modal'
import BookingForm from '~/pages/Bookings/Form'
import Error from '~/components/Error'

const EditModal = ({ open, onOpenChange, booking }: EditModalProps) => {
  const [updateBooking, { isLoading: isSubmitting, error, reset }] =
    useUpdateBookingMutation()

  const handleSubmit = async (data: BookingFormData) => {
    if (!booking?.id) return

    try {
      await updateBooking({
        id: booking.id,
        bookingReference: booking.bookingReference,
        ...data,
      }).unwrap()
      onOpenChange(false)
    } catch (err) {
      console.error('Failed to update booking:', err)
    }
  }

  const handleCancel = () => {
    reset()
    onOpenChange(false)
  }

  const formDefaultValues = booking
    ? {
        hotel: booking.hotel,
        dateFrom: booking.dateFrom,
        dateTo: booking.dateTo,
        time: convert12hTo24h(booking.time),
        notes: booking.notes,
      }
    : undefined

  return (
    <Modal
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleCancel()
        }
        onOpenChange(isOpen)
      }}
      title="Edit Booking"
      description="Make changes to the booking details. Click save when you're done."
    >
      {booking ? (
        <>
          <BookingForm
            defaultValues={formDefaultValues}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Save Changes"
            isSubmitting={isSubmitting}
          />
          {error ? (
            <Error
              title="Failed to update booking"
              message={
                error && 'data' in error
                  ? String(error.data)
                  : 'Unable to update booking. Please try again.'
              }
              className="mt-4"
            />
          ) : null}
        </>
      ) : (
        <p className="text-sm text-muted-foreground">No booking selected.</p>
      )}
    </Modal>
  )
}

export default EditModal


