import { useState } from 'react'
import Button from '~/components/Button'
import BookingCard from './Card'
import Loader from '~/components/Loader'
import EmptyBookings from './Empty'
import FailedBookings from './Failed'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import AddModal from '~/modals/AddModal'
import { useGetBookingsQuery } from '~/store/api/bookingsApi'

const BookingsPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const { data: bookings = [], isLoading, isError, error } = useGetBookingsQuery()

  if (isError) {
    return <FailedBookings error={error} />
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-3 tracking-tight">
            Bookings
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your appointments with ease
          </p>
        </div>
        
        {isLoading ? (
          <Loader size="lg" className="min-h-[400px]" />
        ) : (
          <>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              size="lg"
              className="mb-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full px-8 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2 h-5 w-5" />
              New Booking
            </Button>
            <AddModal
              open={isAddModalOpen}
              onOpenChange={setIsAddModalOpen}
            />
            {bookings.length === 0 ? (
              <EmptyBookings />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default BookingsPage