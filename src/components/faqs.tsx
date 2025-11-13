import { getFaqs } from '@/lib/server-actions/faqs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQs } from '@/lib/generated/prisma/client';
export default async function faqs() {
  const faqs = (await getFaqs()) as FAQs[];
  return (
    <Accordion type='single' collapsible className='w-full' defaultValue='item-1'>
      {faqs.map(({ question, answer, id }) => {
        return (
          <AccordionItem value={id}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent className='flex flex-col gap-4 text-balance'>
              {answer}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
