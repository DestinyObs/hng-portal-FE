import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cva } from 'class-variance-authority'
import { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

type DropdownProps = {
    title: string | ReactNode,
    values: {
        name: string,
        action?: ()=> void,
    }[],
    triggerVariant?: 'outline' | 'ghost' | "data-menu"
    triggerClassName?: string
    dropdownMenuContent?: "start" | "center" | "end" | undefined
    contentClassName?: string
}

const dropdownStyles = cva(
   "text-text-secondary w-full flex h-auto items-center justify-between gap-2 py-1.5 text-sm active:outline-0 active:border-none active:border-0 active:focus-ring-0  select-none group-data-[disabled=true]/input-group:opacity-50 [&>svg]:size-6 cursor-pointer [&[data-state=open]>svg]:rotate-180 outline-none focus:outline-none focus-visible:outline-none active:outline-none active:ring-0 touch-manipulation focus:ring-0 focus-visible:ring-0",
    { variants: 
        { variant:
        { 
          // outline 
            "outline":cn( "group/input-group border-gray-50 relative flex items-center rounded-md border transition-[color,box-shadow] outline-none", "h-[40px] min-w-0 px-3", 
              // Focus state. 
                "data-[state=open]:border-primary-blue data-[state=open]:border-b-0 rounded-none rounded-t-md",
              // Error state. 
                "has-[[data-slot][aria-invalid=true]]:border-primary-error", 
              // Success state. 
                "has-[[data-slot][aria-invalid=false]]:border-primary-green"), 
            // No outline - GHOST 
            "ghost": "outline-none focus-ring-0 justify-start active:border-none text-black active:border-none border-none order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]", 
            "data-menu": "outline:none focus-ring-0 justify-start active:border-none text-black active:border-none border-none order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]", 
           }, 
        }, 
           defaultVariants: { variant: "outline", }, 
          } 
    )

    const Dropdown =({
        title, 
        values, 
        dropdownMenuContent = 'start',
        triggerVariant = "outline", 
        triggerClassName,
        contentClassName}: DropdownProps)=> {
        return (
        <DropdownMenu>
        <DropdownMenuTrigger className={cn(
            dropdownStyles({variant: triggerVariant}),
            triggerClassName,

        )}>
            <span>{title} </span>
            {
                triggerVariant === "outline" && <ChevronDown size={30} />
            }
        </DropdownMenuTrigger>
        <DropdownMenuContent 
        align={dropdownMenuContent}
    sideOffset={0}
    className={cn(
        `${triggerVariant === "outline" && " rounded-none rounded-b-md border border-t shadow-none border-red px-0 w-(--radix-dropdown-menu-trigger-width) data-[state=open]:border-primary-blue data-[state=open]:border-t-black max-h-[184px]"}`,
        contentClassName
        )}
            >
            {
                values && values.map((item, index)=> 
                <DropdownMenuItem
                className={cn(
                    "w-full flex items-center justify-between px-3 py-2 cursor-pointer",
                    "data-highlighted:bg-primary-blue data-highlighted:text-white",
                    "rounded-none transition-colors"
                )}
                key={index}
                >
                <button onClick={item.action} className="w-full text-left">
                    {item.name}
                </button>
                </DropdownMenuItem>
                )
            }
            
        </DropdownMenuContent>
        </DropdownMenu>
        )
    }

export default Dropdown