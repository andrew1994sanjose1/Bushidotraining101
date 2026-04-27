import { User, Product, Schedule, Event, AttendanceRecord, OrderRequest } from '../types';
import { INITIAL_STAFF, INITIAL_PRODUCTS, INITIAL_SCHEDULE, INITIAL_EVENTS } from '../constants';

const KEYS = {
  MEMBERS: 'bushido_members',
  STAFF: 'bushido_staff',
  PRODUCTS: 'bushido_products',
  SCHEDULE: 'bushido_schedule',
  EVENTS: 'bushido_events',
  ATTENDANCE: 'bushido_attendance',
  ORDERS: 'bushido_orders',
  CURRENT_USER: 'bushido_auth_user'
};

const get = <T>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const set = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const storage = {
  // Members
  getMembers: (): User[] => get<User[]>(KEYS.MEMBERS, []),
  saveMembers: (members: User[]) => set(KEYS.MEMBERS, members),

  // Staff
  getStaff: (): User[] => get<User[]>(KEYS.STAFF, INITIAL_STAFF),
  saveStaff: (staff: User[]) => set(KEYS.STAFF, staff),

  // Products
  getProducts: (): Product[] => get<Product[]>(KEYS.PRODUCTS, INITIAL_PRODUCTS),
  saveProducts: (products: Product[]) => set(KEYS.PRODUCTS, products),

  // Schedule
  getSchedule: (): Schedule[] => get<Schedule[]>(KEYS.SCHEDULE, INITIAL_SCHEDULE),
  saveSchedule: (schedule: Schedule[]) => set(KEYS.SCHEDULE, schedule),

  // Events
  getEvents: (): Event[] => get<Event[]>(KEYS.EVENTS, INITIAL_EVENTS),
  saveEvents: (events: Event[]) => set(KEYS.EVENTS, events),

  // Attendance
  getAttendance: (): AttendanceRecord[] => get<AttendanceRecord[]>(KEYS.ATTENDANCE, []),
  addAttendance: (record: AttendanceRecord) => {
    const list = storage.getAttendance();
    set(KEYS.ATTENDANCE, [...list, record]);
  },

  // Orders
  getOrders: (): OrderRequest[] => get<OrderRequest[]>(KEYS.ORDERS, []),
  addOrder: (order: OrderRequest) => {
    const list = storage.getOrders();
    set(KEYS.ORDERS, [...list, order]);
  },
  updateOrder: (orderId: string, status: OrderRequest['status']) => {
    const list = storage.getOrders();
    const updated = list.map(o => o.id === orderId ? { ...o, status } : o);
    set(KEYS.ORDERS, updated);
  },

  // Auth Simulation
  getCurrentUser: (): User | null => get<User | null>(KEYS.CURRENT_USER, null),
  setCurrentUser: (user: User | null) => set(KEYS.CURRENT_USER, user),
  logout: () => localStorage.removeItem(KEYS.CURRENT_USER)
};
