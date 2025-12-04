import Error from '~/components/Error'
import type { FailedBookingsProps } from '~/types'

const FailedBookings = ({ error }: FailedBookingsProps) => {
  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <Error
          title="Failed to load bookings"
          message={
            error && typeof error === 'object' && 'data' in error
              ? String(error.data)
              : 'Unable to load bookings. Please try again.'
          }
          className="min-h-[400px]"
        />
      </div>
    </div>
  )
}

export default FailedBookings

