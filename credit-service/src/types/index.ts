export interface CreditBalanceResponse {
  userId: string;
  balance: number;
}

export interface UpdateCreditRequest {
  userId: string;
  amount: number;
  transactionType: 'purchase' | 'gain' | 'sale';
}

export interface TransactionHistoryResponse {
  userId: string;
  transactions: Array<{
    transactionId: string;
    amount: number;
    transactionType: 'purchase' | 'gain' | 'sale';
    date: string;
  }>;
}