import { useState } from 'react'
import { 
  faCalendar, faClock, faPencil, faTrash, faUser, faHotel, faHashtag,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { formatDateRange, formatTime } from '~/utils/date'
import type { BookingCardProps } from '~/types'

import Button from '~/components/Button'
import Card from '~/components/Card'
import EditModal from '~/modals/EditModal'
import DeleteModal from '~/modals/DeleteModal'

const BookingCard = ({ booking }: BookingCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  return (
    <Card className="group">
      <div className="space-y-4">
        <div className='flex justify-between'>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">
              {booking.guestName}
            </h3>
          </div>
          <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditModalOpen(true)}
              className="h-8 w-8 hover:bg-secondary/50 hover:text-secondary-foreground"
            >
              <FontAwesomeIcon icon={faPencil} className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDeleteModalOpen(true)}
              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
            >
              <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      {booking.bookingReference && (
        <div className="flex items-center gap-2 text-muted-foreground text-sm mt-2">
          <FontAwesomeIcon icon={faHashtag} className="h-3 w-3" />
          <span className="font-mono">{booking.bookingReference}</span>
        </div>
      )}
      <div className="flex items-center gap-2 text-secondary-foreground mt-4">
        <FontAwesomeIcon
          icon={faHotel}
          className="h-4 w-4 text-primary"
        />
        <span className="font-medium">{booking.hotel?.name}</span>
      </div>

      <div className="space-y-3 mt-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <FontAwesomeIcon icon={faCalendar} className="h-4 w-4" />
          <span className="text-sm">{formatDateRange(booking.dateFrom, booking.dateTo)}</span>
        </div>
        {booking.time && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <FontAwesomeIcon icon={faClock} className="h-4 w-4" />
            <span className="text-sm">{formatTime(booking.time)}</span>
          </div>
        )}
      </div>

      {booking.notes && (
        <div className="pt-6 mt-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground italic">
            "{booking.notes}"
          </p>
        </div>
      )}
      <EditModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        booking={booking}
      />
      <DeleteModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        booking={booking}
      />
    </Card>
  )
}

export default BookingCard
