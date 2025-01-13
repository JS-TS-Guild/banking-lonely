export default class BankAccount {
  private id: string;
  private balance: number;

  constructor(initialBalance: number) {
    this.id = Math.random().toString(36).substring(7);
    this.balance = initialBalance;
  }

  getId(): string {
    return this.id;
  }

  setBalance(balance: number): void {
    this.balance = balance;
  }
}
