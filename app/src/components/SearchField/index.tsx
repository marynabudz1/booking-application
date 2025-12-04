import { forwardRef } from 'react'
import Input from '~/components/Input'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface SearchFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
  showClearButton?: boolean
}

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ onClear, showClearButton, className, ...props }, ref) => {
    return (
      <div className="relative">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
        />
        <Input
          ref={ref}
          type="text"
          className={`pl-10 ${showClearButton ? 'pr-10' : ''} ${className || ''}`}
          {...props}
        />
        {showClearButton && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            ×
          </button>
        )}
      </div>
    )
  }
)

export default SearchField

