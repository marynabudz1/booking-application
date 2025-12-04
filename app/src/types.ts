import type { VariantProps } from 'class-variance-authority'
import type { buttonVariants } from '~/components/Button'

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  variant?: ButtonVariant
  size?: ButtonSize
  onClick?: () => void
  children: React.ReactNode
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  className?: string
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export interface Hotel {
  hotelId: string
  name: string
  cityCode?: string
  address?: {
    lines?: string[]
    cityName?: string
    countryCode?: string
  }
  rating?: number
  amenities?: string[]
  description?: string
  price?: {
    currency: string
    total: string
  }
}

export interface Booking {
  id?: string
  bookingReference?: string
  hotel: Hotel
  dateFrom: string
  dateTo: string
  time?: string
  notes?: string
}

export interface BookingFormData {
  hotel: Hotel
  dateFrom: string
  dateTo: string
  time?: string
  notes?: string
}

export interface BookingCardProps {
  booking: Booking
}

export interface ModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}


export interface BookingFormProps {
  defaultValues?: Partial<BookingFormData>
  onSubmit: (data: BookingFormData) => void
  onCancel: () => void
  submitLabel?: string
  isSubmitting?: boolean
}

export interface BookingFormField {
  id: 'dateFrom' | 'dateTo' | 'time' | 'notes'
  label: string
  placeholder?: string
  type: 'text' | 'date' | 'time' | 'textarea'
  required?: boolean
  validation?: {
    required?: string
  }
  className?: string
  gridCols?: number
}

export interface ErrorProps {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}

export interface FailedBookingsProps {
  error?: unknown
}

export interface EditModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  booking: Booking | null
}

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}


export interface AddModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export interface DeleteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  booking: Booking | null
}


