import { Bookmark } from 'lucide-react'

type stat = {
    title: string,
    description: string,
}

export const InsightCard = ({stat}: {stat: stat}) => {
  return (
    <div className="flex justify-start items-center gap-3 py-1">

        <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[#F1F5F9]">
            <Bookmark width={16} height={16} fill="#93C5FD" strokeWidth={0} />
        </div>
        <div className="text">
            <p className="views text-base">{stat.title}</p>
            <p className="text-sm text-tertiary-100">{stat.description}</p>
        </div>
    </div>
  )
}
