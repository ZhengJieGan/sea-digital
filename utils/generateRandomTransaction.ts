import {Transaction} from '../types/transactions';

export const generateRandomTransaction = (): Transaction => {
  const descriptions: string[] = [
    'Grocery shopping',
    'Online subscription',
    'Coffee at cafe',
    'Dinner at restaurant',
    'Electricity bill payment',
    'Freelance payment',
    'Rent payment',
    'Salary deposit',
    'Bonus received',
    'PayPal transfer',
  ];

  const randomAmount: number = parseFloat((Math.random() * 500 + 1).toFixed(2)); 
  const randomDescription: string =
    descriptions[Math.floor(Math.random() * descriptions.length)];
  const randomTransactionType: 'deduction' | 'addition' =
    Math.random() > 0.5 ? 'deduction' : 'addition';
  const randomType: 'debit' | 'credit' =
    Math.random() > 0.5 ? 'debit' : 'credit'; 
  const randomDate: string = new Date().toISOString(); 

  return {
    transactionId: Date.now().toString(), 
    amount: randomAmount,
    date: randomDate,
    transactionType: randomTransactionType,
    description: randomDescription,
    type: randomType,
  };
};
