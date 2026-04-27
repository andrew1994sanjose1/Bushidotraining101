import { User, Product, Schedule, Event } from './types';

export const INITIAL_STAFF: User[] = [
  {
    id: 'staff-1',
    name: 'Sensei Hiroshi Tanaka',
    email: 'tanaka@bushido.dojo',
    role: 'instructor',
    rank: '7th Dan Black Belt',
    joinedDate: '1995-03-01',
    avatar: 'https://images.unsplash.com/photo-1525130413817-d45c1d127c42?auto=format&fit=crop&q=80&w=200&h=200',
    bio: 'With over 40 years of experience, Sensei Tanaka leads our dojo with wisdom and precision.'
  },
  {
    id: 'staff-2',
    name: 'Sensei Sarah Jenkins',
    email: 'sarah@bushido.dojo',
    role: 'instructor',
    rank: '4th Dan Black Belt',
    joinedDate: '2010-06-15',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200',
    bio: 'Specializing in Kata and youth development, Sensei Sarah brings energy and focus to every class.'
  },
  {
    id: 'admin-1',
    name: 'Kenji Sato',
    email: 'admin@bushido.dojo',
    role: 'admin',
    joinedDate: '2015-01-10'
  }
];

export const INITIAL_SCHEDULE: Schedule[] = [
  { id: 'sch-1', title: 'Beginner Karate', instructorId: 'staff-2', day: 'Monday', startTime: '17:00', endTime: '18:00', level: 'Beginner' },
  { id: 'sch-2', title: 'Advanced Kumite', instructorId: 'staff-1', day: 'Monday', startTime: '18:30', endTime: '20:00', level: 'Advanced' },
  { id: 'sch-3', title: 'Adult All Levels', instructorId: 'staff-1', day: 'Wednesday', startTime: '19:00', endTime: '20:30', level: 'All Levels' },
  { id: 'sch-4', title: 'Youth Foundations', instructorId: 'staff-2', day: 'Friday', startTime: '16:30', endTime: '17:30', level: 'Beginner' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Heavyweight Gi (White)',
    price: 85,
    category: 'gear',
    description: 'Professional grade 14oz brushed cotton karate gi.',
    image: 'https://images.unsplash.com/photo-1552072092-b5cd2915079a?auto=format&fit=crop&q=80&w=400&h=400',
    stock: 25
  },
  {
    id: 'prod-2',
    name: 'Bushido Team Hoodie',
    price: 45,
    category: 'apparel',
    description: 'Soft-touch navy blue hoodie with embroidered dojo crest.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400&h=400',
    stock: 50
  },
  {
    id: 'prod-3',
    name: 'Sparring Protection Set',
    price: 120,
    category: 'gear',
    description: 'Full WKF-approved set including shins, gloves, and mouthguard.',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=400&h=400',
    stock: 15
  }
];

export const INITIAL_EVENTS: Event[] = [
  {
    id: 'evt-1',
    title: 'Winter Grading 2024',
    date: '2024-12-15',
    description: 'The final belt promotion ceremony of the year.',
    type: 'grading'
  },
  {
    id: 'evt-2',
    title: 'National Championships',
    date: '2024-11-20',
    description: 'Our squad travels to the capital for the annual tournament.',
    type: 'tournament'
  }
];

export const CONTACT_INFO = {
  address: '123 Dojo Way, Bushido District, Martial City',
  phone: '+1 (555) 987-6543',
  email: 'info@bushidokarate.com'
};
