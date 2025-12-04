import * as Dialog from '@radix-ui/react-dialog'

import { cn } from '~/lib/utils'
import type { ModalProps } from '~/types'

const Modal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
}: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
          )}
        />
        <Dialog.Content
          className={cn(
            'fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-card p-6 shadow-lg duration-200',
            'rounded-lg border-border/50 text-card-foreground',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            className
          )}
        >
          {(title || description) && (
            <div className="mb-4 space-y-1.5">
              {title && (
                <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">
                  {title}
                </Dialog.Title>
              )}
              {description && (
                <Dialog.Description className="text-sm text-muted-foreground mt-4">
                  {description}
                </Dialog.Description>
              )}
            </div>
          )}
          <div className="py-2">{children}</div>
          {footer && <div className="mt-4 flex justify-end gap-2">{footer}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal
