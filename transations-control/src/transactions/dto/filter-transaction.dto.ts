enum TransactionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}
export class FilterTransactionDto {
  startDate: Date;
  endDate: Date;
  transactionType?: 'CREDIT' | 'DEBIT';
}
