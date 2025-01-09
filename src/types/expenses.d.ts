export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
  categoryId: string;
  date: string;
  paymentMethod: string | 'credit' | 'debit';
}