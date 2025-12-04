import type { Hotel } from '~/types'
import Button from '~/components/Button'
import { faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface HotelCardProps {
  hotel: Hotel
  onClick: () => void
}

const HotelCard = ({ hotel, onClick }: HotelCardProps) => {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      className="w-full text-left px-4 py-3 hover:bg-muted transition-colors border-b border-border last:border-0 !justify-start !items-start h-auto rounded-none whitespace-normal"
    >
      <div className="flex items-start justify-between gap-2 w-full">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{hotel.name}</h3>
          {hotel.address && (
            <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="h-3 w-3" />
              <span className="truncate">
                {hotel.address.cityName || hotel.address.lines?.[0]}
              </span>
            </div>
          )}
          {hotel.rating && (
            <div className="flex items-center gap-1 mt-1">
              <FontAwesomeIcon icon={faStar} className="h-3 w-3 text-yellow-500" />
              <span className="text-sm text-muted-foreground">{hotel.rating}</span>
            </div>
          )}
          {hotel.amenities && hotel.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground"
                >
                  {amenity}
                </span>
              ))}
            </div>
          )}
        </div>
        {hotel.price && (
          <div className="flex-shrink-0 text-right">
            <div className="font-semibold text-foreground">
              {hotel.price.currency} {hotel.price.total}
            </div>
            <div className="text-xs text-muted-foreground">per night</div>
          </div>
        )}
      </div>
    </Button>
  )
}

export default HotelCard

