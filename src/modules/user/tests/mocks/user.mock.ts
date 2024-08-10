import { User, UserType } from '../../entities/user.entity';

export const mockUser: User = {
  id: 'user1',
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  password: 'hashedpassword',
  phone: '1234567890',
  is_active: true,
  attempts_left: 3,
  time_left: null,
  secret: 'secret',
  is_2fa_enabled: false,
  owned_organisations: [],
  profile: null,
  status: 'active',
  testimonials: [],
  backup_codes: [],
  jobs: [],
  created_at: new Date(),
  updated_at: new Date(),
  notification_settings: [],
  notifications: [],
  hashPassword: () => null,
  cart: [],
  organisations: null,
};
