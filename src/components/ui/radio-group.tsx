"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      
        className
      )}
      style={{
        // 크기를 딱 고정해서 어떤 상황에서도 변하지 않게 합니다.
        width: '16px',
        height: '16px',
        minWidth: '16px',  // 축소 방지
        minHeight: '16px', // 축소 방지
        padding: '0px',    // 글로벌 버튼의 패딩 제거
        margin: '0px',
        borderWidth: '1px', // 테두리 두께 고정
        boxSizing: 'border-box', // 테두리가 크기에 포함되도록 설정
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline:'none',
        boxShadow:'none'
      }}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        {/* <Circle className="h-3.5 w-3.5 fill-primary" /> */}
        <Circle className="h-3.5 w-3.5 fill-black" />

      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
