import { MessageSeenSvg } from '@/lib/svgs'

interface MessageTimeProps {
  time: string
  isMsgFromActualUser: boolean
}

export default function MessageTime({ time, isMsgFromActualUser }: MessageTimeProps) {
  return (
    <p
      className={`absolute bottom-0 right-0 flex items-center gap-1 px-2 py-[2px] text-[10px] font-light text-muted-foreground ${isMsgFromActualUser && "after:w-1 after:content-['']"} `}
    >
      {time}
      {!isMsgFromActualUser && <MessageSeenSvg />}
    </p>
  )
}
