// /data/resources.ts
export type ClassLevel = '9th' | '10th' | '11th' | '12th';
export type ResourceKind = 'document' | 'image' | 'video' | 'link';

export interface Resource {
  id: string;
  title: string;
  description?: string;
  kind: ResourceKind;
  classes: ClassLevel[]; // which classes this resource is for
  category:
    | 'past paper'
    | 'test paper'
    | 'notes'
    | 'book'
    | 'guess paper'
    | 'assignment'
    | 'important link'
    | 'study paper'
    | string;
  url: string; // public path or external URL
  filename?: string; // optional filename for download
  featured?: boolean;
  date?: string; // optional for sorting/display (ISO)
}

export const RESOURCES: Resource[] = [
  {
    id: 'r1',
    title: '9th Board - Past Paper 2023 (Math)',
    description: 'Complete past paper with marking scheme.',
    kind: 'document',
    classes: ['9th'],
    category: 'past paper',
    url: '/resources/papers/9th-math-past-2023.pdf',
    filename: '9th-math-past-2023.pdf',
    featured: true,
    date: '2023-05-10',
  },
  {
    id: 'r2',
    title: '10th English Guess Paper',
    description: 'High probability questions for board exam.',
    kind: 'document',
    classes: ['10th'],
    category: 'guess paper',
    url: '/resources/papers/10th-english-guess.pdf',
    filename: '10th-english-guess.pdf',
  },
  {
    id: 'r3',
    title: '12th Physics - Important Formulas (Notes)',
    description: 'Concise formula sheet for quick revision.',
    kind: 'image',
    classes: ['12th'],
    category: 'notes',
    url: '/resources/images/12th-physics-formulas.png',
  },
  {
    id: 'r4',
    title: 'Computer Basics — Intro Video',
    description: 'Short lecture on computer fundamentals.',
    kind: 'video',
    classes: ['11th', '12th'],
    category: 'study paper',
    url: '/resources/videos/computer-basics.mp4',
  },
  {
    id: 'r5',
    title: 'English Language - Online Practice',
    description: 'External practice portal with quizzes.',
    kind: 'link',
    classes: ['9th', '10th', '11th', '12th'],
    category: 'important link',
    url: 'https://example.com/english-practice',
  },
  {
    id: 'r6',
    title: '11th Biology - Test Paper',
    description: 'Timed test for chapter 3 & 4.',
    kind: 'document',
    classes: ['11th'],
    category: 'test paper',
    url: '/resources/papers/11th-bio-test1.pdf',
    filename: '11th-bio-test1.pdf',
  },
  {
    id: 'r7',
    title: 'General Assignment Template',
    description: 'Blank template for student assignments.',
    kind: 'document',
    classes: ['9th', '10th', '11th', '12th'],
    category: 'assignment',
    url: '/resources/papers/assignment-template.docx',
    filename: 'assignment-template.docx',
  },
];
