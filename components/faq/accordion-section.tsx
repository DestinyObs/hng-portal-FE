import { Accordion } from '../shared/ui/accordion';
import { content1, content2 } from '@/constants/constants';

export const FAQAccordion = () => {
  return (
    <div
      className="
        accordion-div 
        p-6 sm:p-10 lg:p-24 
        flex flex-col-reverse lg:flex-row 
        gap-6 lg:gap-5
      "
    >
      <div
        className="
          first 
          w-full 
          lg:w-[400px]
        "
      >
        <Accordion
          triggerVariant="noIcon"
          itemVariant="leftBorder"
          triggerClassname="py-0"
          contentClassname="text-sm sm:text-[18px]"
          content={content2}
        />
      </div>

      <div
        className="
          second 
          w-full 
          lg:w-[774px]
        "
      >
        <Accordion
          content={content1}
          classname="py-2"
          triggerClassname="p-[10px] pl-[30px] text-base sm:text-[24px]"
          contentClassname="text-sm sm:text-[18px]"
        />
      </div>
    </div>
  );
};
