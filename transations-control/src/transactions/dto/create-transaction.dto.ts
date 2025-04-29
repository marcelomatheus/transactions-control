import { IsDate, IsEnum, IsInt, IsNumber, IsString } from 'class-validator';

enum TransactionType {
  DEBIT,
  CREDIT,
}
export class CreateTransactionDto {
  @IsDate()
  date: Date;

  @IsNumber()
  value: number;

  @IsEnum(TransactionType)
  transactionType: 'CREDIT' | 'DEBIT';

  @IsNumber()
  @IsInt()
  installments: number;

  @IsString()
  customer_id: string;
}
