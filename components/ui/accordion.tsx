'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const accordionItemVariants = cva(
  'border-b last:border-b-0 data-[state=open]:border rounded-3xl border-[#E1F6FF] py-4',
  {
    variants: {
      variant: {
        default: '',
        leftBorder:
          'border-b last:border-b-0 data-[state=open]:border-0 data-[state=open]:border-l data-[state=open]:border-l-4 rounded-none border-l-primary-blue py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const accordionTriggerVariants = cva(
  'group bg-gray-50 flex items-center text-card-title p-2 pl-8 flex-1 justify-between gap-4 rounded-full text-left text-lg font-medium transition-all outline-none disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180 data-[state=open]:bg-transparent ',
  {
    variants: {
      variant: {
        default: '',
        noIcon:
          'pr-4 bg-transparent text-tertiary-100 text-[24px] data-[state=open]:text-black data-[state=open]:text-[32px] *:hidden [&>span:first-child]:block py-0',
        borderless: 'rounded-none bg-transparent hover:bg-gray-50',
        minimal: 'p-0 bg-transparent rounded-none text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const accordionContentVariants = cva(
  'data-[state=closed]:animate-accordion-up p-5 data-[state=open]:animate-accordion-down overflow-hidden text-sm',
  {
    variants: {
      variant: {
        default: '',
        leftBorder: 'px-0 pb-0',
        minimal: 'px-0 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item> &
  VariantProps<typeof accordionItemVariants>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  variant,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> &
  VariantProps<typeof accordionTriggerVariants>) {
  return (
    <AccordionPrimitive.Header className="flex items-center">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(accordionTriggerVariants({ variant }), className)}
        {...props}
      >
        <span>{children}</span>
        <span className="bg-white-50 group-data-[state=open]:bg-gray-50 p-2 flex justify-center items-center rounded-full ">
          <Plus className="text-muted-foreground pointer-events-none size-5 shrink-0 duration-200 group-data-[state=open]:hidden" />
          <X className="hidden text-muted-foreground pointer-events-none size-5 shrink-0 duration-200 group-data-[state=open]:inline-block" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  variant,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content> &
  VariantProps<typeof accordionContentVariants>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up p-5 data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn('pt-0 pb-4 pl-5', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
