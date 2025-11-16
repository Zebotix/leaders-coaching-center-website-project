import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQComponent() {
  const faqs = [
    {
      id: 'item-1',
      question: 'What is the difference between a coaching session and a one-to-one session?',
      answer:
        'A coaching session is a group session where multiple students are present, while a one-to-one session is a private session between a student and a teacher.',
    },
    {
      id: 'item-2',
      question: 'What is the difference between a coaching session and a one-to-one session?',
      answer:
        'A coaching session is a group session where multiple students are present, while a one-to-one session is a private session between a student and a teacher.',
    },
    {
      id: 'item-3',
      question: 'What is the difference between a coaching session and a one-to-one session?',
      answer:
        'A coaching session is a group session where multiple students are present, while a one-to-one session is a private session between a student and a teacher.',
    },
    {
      id: 'item-4',
      question: 'What is the difference between a coaching session and a one-to-one session?',
      answer:
        'A coaching session is a group session where multiple students are present, while a one-to-one session is a private session between a student and a teacher.',
    },
    {
      id: 'item-5',
      question: 'What is the difference between a coaching session and a one-to-one session?',
      answer:
        'A coaching session is a group session where multiple students are present, while a one-to-one session is a private session between a student and a teacher.',
    },
    {
      id: 'item-6',
      question: 'What is the difference between a coaching session and a one-to-one session?',
      answer:
        'A coaching session is a group session where multiple students are present, while a one-to-one session is a private session between a student and a teacher.',
    },
    {
      id: 'item-7',
      question: 'What is the difference between a coaching session and a one-to-one session?',
      answer:
        'A coaching session is a group session where multiple students are present, while a one-to-one session is a private session between a student and a teacher.',
    },
  ];

  return (
    <div className='px-6 overflow-x-hidden shadow-sm py-16 bg-linear-to-b from-blue-50 to-white'>
      <h2 className='text-2xl md:text-3xl font-bold text-center mb-8 tracking-tight'>
        Frequently Asked Questions
      </h2>

      <Accordion type='single' collapsible className='w-full space-y-3' defaultValue='item-1'>
        {faqs.map(({ id, question, answer }) => (
          <AccordionItem
            key={id}
            value={id}
            className='border rounded-xl px-4 bg-white shadow-sm hover:shadow-md transition-shadow'
          >
            <AccordionTrigger className='text-left font-medium text-base md:text-lg py-4'>
              {question}
            </AccordionTrigger>

            <AccordionContent className='text-sm md:text-base leading-relaxed px-1 pb-4 text-muted-foreground'>
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
