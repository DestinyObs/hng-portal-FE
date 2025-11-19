import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export function AccordionUI({
    classname, 
    triggerClassname, 
    contentClassname,
    content
}: {
        classname?: string, 
        triggerClassname?: string, 
        contentClassname?: string,
        content: {
            title: string,
            content: string,
        }[]

    }) {
  return (
    <Accordion type="single" className={cn(
        "",
        classname
        )} 
        collapsible>
      
     {
        content && content.map(({title, content}, index)=> 

        <AccordionItem key={index} value={title} className="py-3 border-0">
        <AccordionTrigger className={triggerClassname}>{title}</AccordionTrigger>
        <AccordionContent className={contentClassname}>
         {content}
        </AccordionContent>
      </AccordionItem>
        )
     }
      


    </Accordion>
  )
}