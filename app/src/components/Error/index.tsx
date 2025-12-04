import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

import Button from '~/components/Button'
import type { ErrorProps } from '~/types'

const Error = ({
  title = 'Something went wrong',
  message = 'An error occurred while loading data. Please try again.',
  onRetry,
  className,
}: ErrorProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center ${className || ''}`}
    >
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        className="h-12 w-12 text-destructive mb-4"
      />
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  )
}

export default Error



