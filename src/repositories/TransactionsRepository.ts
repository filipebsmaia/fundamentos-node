import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((value, transaction) => {
        return value + transaction.value;
      }, 0);

    const totalOutcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((value, transaction) => {
        return value + transaction.value;
      }, 0);

    const total = totalIncome - totalOutcome;

    const balance = { income: totalIncome, outcome: totalOutcome, total };
    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
