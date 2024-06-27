import { getRelativeDateTime, isSameDay } from '@/lib/utils'
import { MessageType } from '@/types'

interface DateIndicatorProps {
  message: MessageType
  prevMessage?: MessageType
}

export default function DateIndicator({ message, prevMessage }: DateIndicatorProps) {
  return (
    <>
      {!prevMessage || !isSameDay(prevMessage._creationTime, message._creationTime) ? (
        <div className="my-1 flex w-full justify-center">
          <p className="z-50 m-2 rounded-md bg-white px-2 py-1 text-sm text-gray-500 dark:bg-gray-primary dark:text-gray-400">
            {getRelativeDateTime(message, prevMessage)}
          </p>
        </div>
      ) : null}
    </>
  )
}
