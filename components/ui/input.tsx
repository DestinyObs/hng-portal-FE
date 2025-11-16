"use client"
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { Eye, EyeClosed } from 'lucide-react'
import { ReactNode, useState } from 'react'

const inputGroup = cva(
  "text-text-secondary flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-6 [&>kbd]:rounded-[calc(var(--radius)-5px)] group-data-[disabled=true]/input-group:opacity-50",
  {
    variants: {
      variant: {
        // outline
        "outline":cn(
          "group/input-group border-gray-50 relative flex w-full items-center rounded-lg border transition-[color,box-shadow] outline-none",
        "h-14 min-w-0 has-[>textarea]:h-auto px-3",
          // Focus state.
        "has-[[data-slot=input-group-control]:focus-visible]:border-primary-blue",
        // Error state.
        "has-[[data-slot][aria-invalid=true]]:border-primary-error",
        // Error state.
        "has-[[data-slot][aria-invalid=false]]:border-primary-green"),
        // No outline - GHOST
        "ghost":
          "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
)

type InputProps = {
    inputType?: "input" | "password" | "textarea", 
    icon?: ReactNode
    className?: string,
    variant?: "outline" | "ghost",
    onChange: ()=> void,
    value: string | number,
  }

const Input = ({
  inputType = "input", 
  variant,
  icon,
  onChange,
  value,
  className, ...props}: InputProps) => {
      const [password, setPassword] = useState(false)
  return (
    <div className={cn(
        inputGroup({variant}),
        className
      )}>
      {
        inputType === "textarea" &&
        <textarea 
        onChange={onChange}
        data-slot="input-group-control"
          {...props}
        ></textarea>
      }
      
      <input
      data-slot="input-group-control"
      className='outline-none'
      onChange={onChange}
      type={password ? "password" : "text"}
      {...props}
    />
    {
      inputType === "password" && 

      <button 
      onClick={()=> setPassword(!password)}>
        {password ?  <Eye /> : <EyeClosed />} </button>
    }
    
    </div>
  )
}

export default Input