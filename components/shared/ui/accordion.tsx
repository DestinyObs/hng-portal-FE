import { cn } from '@/lib/utils';
import {
  Accordion as AccordionUI,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';

export function Accordion({
  classname,
  triggerClassname,
  contentClassname,
  itemVariant,
  triggerVariant,
  contentVariant,
  content,
}: {
  classname?: string;
  triggerClassname?: string;
  contentClassname?: string;
  itemVariant?: 'default' | 'leftBorder';
  triggerVariant?: 'default' | 'borderless' | 'noIcon' | 'minimal';
  contentVariant?: 'default' | 'leftBorder' | 'minimal';
  content: {
    title: string;
    content: string;
  }[];
}) {
  return (
    <AccordionUI type="single" className={cn('', classname)} collapsible>
      {content &&
        content.map(({ title, content }, index) => (
          <AccordionItem
            variant={itemVariant}
            key={index}
            value={title}
            className=" border-0"
          >
            <AccordionTrigger
              variant={triggerVariant}
              className={triggerClassname}
            >
              {title}
            </AccordionTrigger>
            <AccordionContent
              variant={contentVariant}
              className={contentClassname}
            >
              {content}
            </AccordionContent>
          </AccordionItem>
        ))}
    </AccordionUI>
  );
}
