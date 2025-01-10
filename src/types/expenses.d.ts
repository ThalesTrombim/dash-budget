export interface Expense {
  id: string;
  name: string;
  amount: string;
  category: string;
  categoryId: string;
  date: string;
  paymentMethod: string | 'credit' | 'debit';
}

export interface NewExpense {
  name: string;
  amount: string;
  category: string;
  date: string;
  paymentMethod: string | 'credit' | 'debit';
}

export interface ExpenseFirebase {
  id: string;
  name: string;
  amount: number;
  category: string;
  categoryId: string;
  date: string;
  paymentMethod: string | 'credit' | 'debit';
}