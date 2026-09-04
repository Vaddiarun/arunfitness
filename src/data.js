import { wa } from './lib/config';

export const transformations = [
  { id: 'a', name: 'Client 01', meta: 'Fat loss', before: 'images/client-03.png', after: 'images/client-01.png' },
  { id: 'b', name: 'Client 02', meta: 'Body recomposition', muted: true, before: 'images/client-04.png', after: 'images/client-06.png' },
  { id: 'c', name: 'Client 03', meta: 'Muscle building', muted: true, before: 'images/client-05.png', after: 'images/client-02.png' },
  { id: 'f', name: 'Client 04', meta: 'Muscle building', before: 'images/client-11.png', after: 'images/client-12.png' },
  { id: 'e', name: 'Client 05', meta: 'Body recomposition', muted: true, before: 'images/client-09.png', after: 'images/client-10.png' },
];

export const categories = [
  { no: '01', title: 'FAT → FIT', body: 'Lose excess body fat. Build strength. Build sustainable habits.', cta: 'Explore', href: wa('Hi Arun, I want to start my fat-loss transformation.') },
  { no: '02', title: 'WEDDING TRANSFORMATION', body: 'Look your absolute best for your wedding. Personalized nutrition, training and accountability.', cta: 'Get wedding ready', href: wa("Hi Arun, I'm interested in a wedding transformation.") },
  { no: '03', title: '45-DAY TRANSFORMATION', body: 'A structured short-term transformation program designed around measurable progress.', cta: 'Start 45 days', href: wa("Hi Arun, I'm interested in your 45-day transformation program.") },
  { no: '04', title: 'MUSCLE BUILDING', body: 'Build lean muscle while improving strength and body composition.', cta: 'Build muscle', href: wa('Hi Arun, I want to build muscle with your coaching.') },
  { no: '05', title: 'BODY RECOMPOSITION', body: 'Lose fat while building or preserving muscle.', cta: 'Recompose', href: wa("Hi Arun, I'm interested in body recomposition coaching.") },
  { no: '06', title: 'LIFESTYLE TRANSFORMATION', body: 'Build sustainable habits instead of following another temporary diet.', cta: 'Change your lifestyle', href: wa('Hi Arun, I want to change my lifestyle with your coaching.') },
];

export const timeline = [
  { when: 'DAY 01', what: 'Assessment' },
  { when: 'WEEK 01', what: 'Foundation' },
  { when: 'WEEK 02–03', what: 'Consistency' },
  { when: 'WEEK 04', what: 'Progress' },
  { when: 'WEEK 05', what: 'Intensity' },
  { when: 'DAY 45', what: 'Transformation' },
];

export const weddingBits = ['Timeline', 'Training', 'Nutrition', 'Progress tracking', 'Accountability', 'Final preparation'];

export const systemSteps = [
  { no: '01', title: 'UNDERSTAND YOU', body: 'Goals, lifestyle, schedule, food preferences and current fitness level.' },
  { no: '02', title: 'BUILD YOUR PLAN', body: 'Personalized training and nutrition strategy.' },
  { no: '03', title: 'EXECUTE', body: "Follow your program with Arun's guidance." },
  { no: '04', title: 'TRACK', body: 'Progress, measurements, photos, performance and adherence.' },
  { no: '05', title: 'ADAPT', body: 'Your plan evolves based on your progress.' },
];

export const dashboard = [
  { label: 'Workout', value: 'Push A — done', pct: 100, tone: 'accent' },
  { label: 'Nutrition', value: '1,840 / 2,050 kcal', pct: 90, tone: 'accent' },
  { label: 'Water', value: '2.4 / 3.5 L', pct: 68, tone: 'accent-500' },
  { label: 'Steps', value: '7,400 / 10,000', pct: 74, tone: 'accent-500' },
  { label: 'Progress', value: '−3.1 kg since day 1', pct: 55, tone: 'accent-600' },
  { label: 'Coach check-in', value: 'Weekly review — Sunday', pct: 40, tone: 'accent-600' },
];

export const chatThread = [
  { who: 'YOU', me: true, text: "Arun, I'm struggling with today's diet." },
  { who: 'ARUN', me: false, text: "Tell me what happened. Let's adjust today's plan instead of giving up." },
  { who: 'YOU', me: true, text: 'Can I replace chicken with paneer?' },
  { who: 'ARUN', me: false, text: "Yes. Here's the equivalent option — same protein, adjust the oil down." },
];

const PLACEHOLDER_QUOTE = 'Placeholder quote — Arun to supply the real words.';

export const testimonials = [
  { quote: PLACEHOLDER_QUOTE, name: 'Manthesh R.', meta: 'Fat loss · 25 days' },
  { quote: PLACEHOLDER_QUOTE, name: 'Sandeep K.', meta: 'Muscle building · 4 months' },
  { quote: PLACEHOLDER_QUOTE, name: 'Priya N.', meta: 'Wedding transformation · 3 months' },
  { quote: PLACEHOLDER_QUOTE, name: 'Rahul V.', meta: '45-day transformation' },
  { quote: PLACEHOLDER_QUOTE, name: 'Divya S.', meta: 'Body recomposition · 5 months' },
  { quote: PLACEHOLDER_QUOTE, name: 'Kiran M.', meta: 'Lifestyle transformation · 6 months' },
];

export const programs = [
  {
    no: 'PROGRAM 01',
    title: '45 DAY TRANSFORMATION',
    who: 'For people who want a structured kickstart.',
    includes: ['Personalized training', 'Nutrition guidance', 'Progress tracking', 'Accountability', 'WhatsApp coaching'],
    cta: 'Start 45 days',
    href: wa("Hi Arun, I'm interested in your 45-day transformation program."),
  },
  {
    no: 'PROGRAM 02',
    title: '1:1 ONLINE COACHING',
    who: 'For people who want continuous personalized coaching.',
    includes: ['Personalized training', 'Nutrition', 'Weekly progress review', 'WhatsApp support', 'Plan adjustments', 'Accountability'],
    cta: 'Apply for 1:1',
    href: wa("Hi Arun, I'd like to apply for 1:1 online coaching."),
  },
  {
    no: 'PROGRAM 03',
    title: 'WEDDING TRANSFORMATION',
    who: 'For clients preparing for their wedding.',
    includes: ['Goal-based training', 'Nutrition', 'Progress tracking', 'Timeline planning', 'Accountability'],
    cta: 'Get wedding ready',
    href: wa("Hi Arun, I'm interested in a wedding transformation."),
  },
];

export const quizGoals = ['Lose fat', 'Build muscle', 'Wedding', '45-day transformation', 'Body recomposition', 'General fitness'];
export const quizWhens = ['This week', 'This month', 'Just exploring'];

export const faqs = [
  ['Is online personal training suitable for beginners?', 'Yes. Every program is written around your current fitness level, and the first block is built to teach movement and consistency before intensity.'],
  ['Do I need a gym?', 'No. The plan is adapted to the equipment you have — full gym, home setup or bodyweight only.'],
  ['Do you provide nutrition plans?', 'Yes. Personalized nutrition guidance based on your goals, food preferences and lifestyle, with substitutions you can actually live with.'],
  ['How does WhatsApp coaching work?', 'You send progress, questions and obstacles as they happen; Arun replies with adjustments so a bad day becomes a changed plan instead of a missed week.'],
  ['How often will my plan be updated?', 'Updates follow your progress, adherence and goals rather than a fixed calendar — when the data says change, the plan changes.'],
  ['Do you train clients outside India?', 'Coaching runs entirely online, so location is not a barrier. Message on WhatsApp to confirm timings for your time zone.'],
  ['How does the 45-day transformation work?', 'Assessment, then a personalized training and nutrition plan, execution with weekly tracking, and adjustments through to day 45.'],
  ['What happens after I contact you?', 'WhatsApp conversation, goal discussion, assessment, program recommendation, then start.'],
];
