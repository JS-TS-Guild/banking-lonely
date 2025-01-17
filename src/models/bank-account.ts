import GlobalRegistry from "@/services/GlobalRegistry";
import { Balance, BankAccountId, BankId } from "@/types/Common";

export default class BankAccount {
  private id: BankAccountId;
  private balance: Balance;
  private bankId: BankId;
  private priority: number;

  constructor(initialBalance: number, bankId: BankId) {
    this.id = Math.random().toString(36).substring(7);
    this.bankId = bankId;
    this.balance = initialBalance;
    this.priority = 0;
  }

  getId(): BankAccountId {
    return this.id;
  }

  getBankId(): BankId {
    return this.bankId;
  }

  setBalance(balance: Balance): void {
    this.balance = balance;
  }

  getBalance(): Balance {
    return this.balance;
  }

  getPriority(): number {
    return this.priority;
  }

  setPriority(priority: number): void {
    this.priority = priority;
  }

  withdraw(amount: number) {
    this.balance = this.balance - amount;
  }
  deposit(amount: number) {
    this.balance = this.balance + amount;
  }
}
