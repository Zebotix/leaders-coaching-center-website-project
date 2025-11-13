'use server';
import { FAQs } from '../generated/prisma/client';
import prisma from '../prisma';
async function getFaqs(): Promise<FAQs[] | {}> {
  try {
    const faqs = await prisma.fAQs.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return faqs;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export { getFaqs };
