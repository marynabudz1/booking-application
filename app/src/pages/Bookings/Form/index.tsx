import { useState } from 'react'
import { useForm } from 'react-hook-form'

import Button from '~/components/Button'
import Input from '~/components/Input'
import Textarea from '~/components/Textarea'
import HotelSearch from '~/components/HotelSearch'
import type { BookingFormData, BookingFormProps, Hotel } from '~/types'
import { getTodayDateString } from '~/utils/date'

import { BOOKING_FORM_FIELDS, DEFAULT_BOOKING_FORM_DATA } from './constants'

const BookingForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = 'Create Booking',
  isSubmitting = false,
}: BookingFormProps) => {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(
    defaultValues?.hotel || null
  )

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<BookingFormData>({
    defaultValues: defaultValues || DEFAULT_BOOKING_FORM_DATA,
    mode: 'onChange',
  })

  const dateFrom = watch('dateFrom')
  const todayDateString = getTodayDateString()

  const handleHotelSelect = (hotel: Hotel | null) => {
    setSelectedHotel(hotel)
  }

  const handleFormSubmit = (data: BookingFormData) => {
    if (!selectedHotel) {
      return
    }
    onSubmit({
      ...data,
      hotel: selectedHotel,
    })
  }
  
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 pt-4">
      <div className="space-y-2">
        <label htmlFor="hotel" className="text-sm font-medium">
          Hotel <span className="text-destructive">*</span>
        </label>
        <HotelSearch onSelect={handleHotelSelect} selectedHotel={selectedHotel} />
      </div>

      {BOOKING_FORM_FIELDS.map((field) => {
        let minValue: string | undefined
        if (field.id === 'dateFrom') {
          minValue = todayDateString
        } else if (field.id === 'dateTo') {
          minValue = dateFrom || todayDateString
        }

        return (
          <div key={field.id} className="space-y-2">
            <label htmlFor={field.id} className="text-sm font-medium">
              {field.label}
              {(field.required || field.validation?.required) && (
                <span className="text-destructive"> *</span>
              )}
            </label>
            {field.type === 'textarea' ? (
              <Textarea
                id={field.id}
                {...register(field.id, field.validation)}
                placeholder={field.placeholder}
                className="bg-background border-border focus:ring-primary resize-none"
                rows={3}
              />
            ) : (
              <Input
                id={field.id}
                type={field.type}
                {...register(field.id, field.validation)}
                placeholder={field.placeholder}
                className="bg-background border-border focus:ring-primary resize-none"
                min={minValue}
              />
            )}
            {errors[field.id] && (
              <p className="text-sm text-destructive">
                {errors[field.id]?.message}
              </p>
            )}
          </div>
        )
      })}

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 rounded-full border-border hover:bg-muted"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!isValid || !selectedHotel || isSubmitting}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  )
}

export default BookingForm

