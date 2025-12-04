import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import type { LoaderProps } from '~/types'

const Loader = ({ size = 'md', className }: LoaderProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div className={`flex items-center justify-center ${className || ''}`}>
      <FontAwesomeIcon
        icon={faSpinner}
        className={`${sizeClasses[size]} text-primary animate-spin`}
      />
    </div>
  )
}

export default Loader


