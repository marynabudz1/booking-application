import { useCreateBookingMutation } from '~/store/api/bookingsApi'
import type { AddModalProps, BookingFormData } from '~/types'

import Modal from '~/components/Modal'
import Error from '~/components/Error'
import BookingForm from '~/pages/Bookings/Form'

const AddModal = ({ open, onOpenChange }: AddModalProps) => {
  const [createBooking, { isLoading: isSubmitting, error, reset }] =
    useCreateBookingMutation()

  const handleSubmit = async (data: BookingFormData) => {
    try {
      await createBooking({
        ...data,
      }).unwrap()
      onOpenChange(false)
    } catch (err) {
      console.error('Failed to create booking:', err)
    }
  }

  const handleCancel = () => {
    reset()
    onOpenChange(false)
  }

  return (
    <Modal
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleCancel()
        }
        onOpenChange(isOpen)
      }}
      title="Add New Booking"
      description="Create a new booking appointment. Fill in the details below."
    >
      <BookingForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Create Booking"
        isSubmitting={isSubmitting}
      />
      {error ? (
        <Error
          title="Failed to create booking"
          message={
            error && 'data' in error
              ? String(error.data)
              : 'Unable to create booking. Please try again.'
          }
          className="mt-4"
        />
      ) : null}
    </Modal>
  )
}

export default AddModal

