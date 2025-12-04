import Modal from '~/components/Modal'
import Button from '~/components/Button'

import { useDeleteBookingMutation } from '~/store/api/bookingsApi'
import type { DeleteModalProps } from '~/types'


const DeleteModal = ({ open, onOpenChange, booking }: DeleteModalProps) => {
  const [deleteBooking, { isLoading: isDeleting, reset }] =
    useDeleteBookingMutation()

  const handleDelete = async () => {
    if (booking?.id) {
      try {
        await deleteBooking(booking.id).unwrap()
        onOpenChange(false)
      } catch (err) {
        console.error('Failed to delete booking:', err)
      }
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
      title="Delete Booking"
      description="Are you sure you want to delete this booking? This action cannot be undone."
      footer={
        <>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </>
      }
    >
    </Modal>
  )
}

export default DeleteModal

