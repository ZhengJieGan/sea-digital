export interface Transaction {
  transactionId: string;
  amount: number;
  date: string;
  description: string;
  transactionType: 'deduction' | 'addition',
  type: 'debit' | 'credit';
}
