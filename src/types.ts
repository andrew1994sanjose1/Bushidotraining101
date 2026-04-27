export type UserRole = 'member' | 'instructor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  rank?: string;
  joinedDate: string;
  avatar?: string;
  bio?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'gear' | 'apparel' | 'membership';
  description: string;
  image: string;
  stock: number;
}

export interface Schedule {
  id: string;
  title: string;
  instructorId: string;
  day: string; // Monday, Tuesday, etc.
  startTime: string;
  endTime: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  type: 'tournament' | 'seminar' | 'grading';
  image?: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  scheduleId: string;
  date: string;
  timestamp: string;
}

export interface OrderRequest {
  id: string;
  userId: string;
  productId: string;
  status: 'pending' | 'processed' | 'shipped';
  timestamp: string;
}
