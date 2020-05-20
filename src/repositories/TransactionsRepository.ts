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
    const { income, outcome } = this.transactions.reduce(
      (balance: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income': {
            // eslint-disable-next-line no-param-reassign
            balance.income += transaction.value;
            break;
          }
          case 'outcome': {
            // eslint-disable-next-line no-param-reassign
            balance.outcome += transaction.value;
            break;
          }
          default:
            break;
        }
        return balance;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    const balance = { income, outcome, total };
    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
