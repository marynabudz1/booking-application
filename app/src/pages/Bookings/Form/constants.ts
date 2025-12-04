import type { BookingFormField } from "~/types"

export const BOOKING_FORM_FIELDS: BookingFormField[] = [
  {
    id: 'dateFrom',
    label: 'From Date',
    type: 'date',
    required: true,
    validation: {
      required: 'From date is required',
    },
  },
  {
    id: 'dateTo',
    label: 'To Date',
    type: 'date',
    required: true,
    validation: {
      required: 'To date is required',
    },
  },
  {
    id: 'time',
    label: 'Time (Optional)',
    type: 'time',
  },
  {
    id: 'notes',
    label: 'Notes (Optional)',
    placeholder: 'Any special requests or preferences...',
    type: 'textarea',
  },
]

export const DEFAULT_BOOKING_FORM_DATA = {
  dateFrom: '',
  dateTo: '',
  time: '',
  notes: '',
}

