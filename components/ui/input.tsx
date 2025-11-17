"use client"
import { ReactNode, useState } from "react"
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Eye, EyeClosed } from "lucide-react"

const inputWrapperStyles = cva(
   "text-text-secondary flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-6 [&>kbd]:rounded-[calc(var(--radius)-5px)] group-data-[disabled=true]/input-group:opacity-50",
    { variants: 
      { variant:
         { 
          // outline 
          "outline":cn( "group/input-group border-gray-50 relative flex w-full items-center rounded-lg border transition-[color,box-shadow] outline-none", "h-14 min-w-0 has-[>textarea]:h-auto px-3", 
              // Focus state. 
                 "focus-within:border-primary-blue",
              // Error state. 
              "has-[[data-slot][aria-invalid=true]]:border-primary-error", 
              // Error state. 
              "has-[[data-slot][aria-invalid=false]]:border-primary-green"), 
            // No outline - GHOST 
            "ghost": "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]", "block-start": "order-first w-full justify-start px-3 pt-3 [.border-b]:pb-3 group-has-[>input]/input-group:pt-2.5",
           }, }, 
           defaultVariants: { variant: "outline", }, 
          } 
    )

type InputProps = {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  error?: boolean
  inputType?: "input" | "password" | "textarea"
} & (
  | React.InputHTMLAttributes<HTMLInputElement>
  | React.TextareaHTMLAttributes<HTMLTextAreaElement>
) &
  VariantProps<typeof inputWrapperStyles>

export function Input({
  leftIcon,
  rightIcon,
  error = false,
  inputType = "input",
  variant,
  className,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const inputClass = "absolute left-3 text-text-secondary pointer-events-none [&>svg:not([class*='size-'])]:size-6 group-data-[disabled=true]/input-group:opacity-50"
  const sharedPadding = leftIcon ? "pl-10" : "pl-4"
  const rightPadding = rightIcon || inputType === "password" ? "pr-10" : ""

  return (
    <div
      className={cn(
        inputWrapperStyles({ variant }),
        className
      )}
    >
      {/* Left Icon */}
      {leftIcon && (
        <span className={inputClass}>
          {leftIcon}
        </span>
      )}

      {/* Textarea */}
      {inputType === "textarea" ? (
        <textarea
          className={cn(
            "w-full resize-none bg-transparent outline-none",
            sharedPadding,
            rightPadding
          )}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <>
          {/* Regular Input  */}
          <input
            type={
              inputType === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : "text"
            }
            className={cn(
              "w-full bg-transparent outline-none",
              sharedPadding,
              rightPadding
            )}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />

          {/* Password Toggle */}
          {inputType === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={inputClass}
            >
              {showPassword ? <EyeClosed /> : <Eye />}
            </button>
          )}

          {/* Right icon */}
          {!error && inputType !== "password" && rightIcon && (
            <span className={inputClass}>
              {rightIcon}
            </span>
          )}
        </>
      )}
    </div>
  )
}

export default Input
