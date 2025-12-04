import { useState, useEffect, useRef, useMemo } from 'react'
import type { Hotel } from '~/types'
import SearchField from '~/components/SearchField'
import HotelCard from './Card'
import { HOTELS } from '~/constants/hotels'

interface HotelSearchProps {
  onSelect: (hotel: Hotel | null) => void
  selectedHotel?: Hotel | null
  className?: string
}

const HotelSearch = ({ onSelect, selectedHotel, className }: HotelSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const hotels = useMemo(() => {
    if (!searchQuery.trim()) {
      return []
    }
    const queryLower = searchQuery.toLowerCase().trim()
    return HOTELS.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(queryLower) ||
        hotel.address?.cityName?.toLowerCase().includes(queryLower)
    )
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (hotel: Hotel) => {
    onSelect(hotel)
    setSearchQuery(hotel.name)
    setShowResults(false)
  }

  const handleClear = () => {
    setSearchQuery('')
    onSelect(null)
    setShowResults(false)
  }

  return (
    <div ref={searchRef} className={`relative ${className || ''}`}>
      <SearchField
        value={selectedHotel ? selectedHotel.name : searchQuery}
        onChange={(e) => {
          const value = e.target.value
          setSearchQuery(value)
          if (selectedHotel) {
            onSelect(null)
          }
          if (value.trim()) {
            setShowResults(true)
          }
        }}
        onFocus={() => {
          if (searchQuery.trim()) {
            setShowResults(true)
          }
        }}
        placeholder="Search for a hotel..."
        showClearButton={!!selectedHotel}
        onClear={handleClear}
        className="bg-background border-border focus:ring-primary"
      />

      {showResults && (
        <div className="absolute z-50 w-full mt-2 bg-background border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {hotels.length === 0 && searchQuery.trim() && (
            <div className="p-4 text-sm text-muted-foreground">
              No hotels found for "{searchQuery}". Try a different search term.
            </div>
          )}

          {hotels.length > 0 && (
            <div className="py-2">
              {hotels.map((hotel) => (
                <HotelCard
                  key={hotel.hotelId}
                  hotel={hotel}
                  onClick={() => handleSelect(hotel)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default HotelSearch

