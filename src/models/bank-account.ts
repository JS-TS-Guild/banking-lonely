import { BankAccountId } from "@/types/Common";

export default class BankAccount {
  private id: BankAccountId;
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

  getBalance(id: BankAccountId) {
    return this.balance;
  }
}
