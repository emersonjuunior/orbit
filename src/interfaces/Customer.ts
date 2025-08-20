export interface ICustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address?: string | null;
  userId: string | null;
  created_at: Date | null;
  updated_at: Date | null;
}
