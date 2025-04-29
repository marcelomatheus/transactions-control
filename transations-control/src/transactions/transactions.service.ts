import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterTransactionDto } from './dto/filter-transaction.dto';
enum TransactionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTransactionDto: CreateTransactionDto) {
    let amount;
    if (createTransactionDto.transactionType === TransactionType.DEBIT) {
      amount = 0.99;
    } else if (
      createTransactionDto.transactionType === TransactionType.CREDIT
    ) {
      if (createTransactionDto.installments === 1) {
        amount = 2.99;
      } else if (createTransactionDto.installments <= 6) {
        amount = 3.49;
      } else if (createTransactionDto.installments <= 12) {
        amount = 3.99;
      }
    } else {
      throw new NotFoundException('Transaction type not found');
    }
    return this.prisma.transaction.create({
      data: {
        transactionType: createTransactionDto.transactionType,
        amount,
        date: createTransactionDto.date,
        installments: createTransactionDto.installments,
        value: createTransactionDto.value * (1 + amount / 100),
        customer_id: createTransactionDto.customer_id,
      },
    });
  }

  findAll(filtersDto: FilterTransactionDto) {
    return this.prisma.transaction.findMany({
      where: {
        date: {
          lte: filtersDto.endDate ? new Date(filtersDto?.endDate) : undefined,
          gte: filtersDto.startDate
            ? new Date(filtersDto?.startDate)
            : undefined,
        },
        transactionType: filtersDto?.transactionType,
      },
    });
  }

  async findOne(id: string) {
    const data = await this.prisma.transaction.findUnique({
      where: {
        id: id,
      },
    });
    if (!data) {
      throw new NotFoundException('Transaction not found');
    }
    return data;
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return 'endpoint not implemented';
  }

  async remove(id: string) {
    const isExist = await this.findOne(id);
    if (!isExist) {
      throw new NotFoundException('Transaction not found');
    }
    await this.prisma.transaction.delete({
      where: {
        id: id,
      },
    });
    return;
  }
}
