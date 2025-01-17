import Bank from "@/models/bank";
import BankAccount from "@/models/bank-account";
import User from "@/models/user";
import { BankAccountId, BankId, UserId } from "@/types/Common";

export default class GlobalRegistry {
  private static instance: GlobalRegistry | null = null;
  private banks: Bank[] = [];
  private bankAccounts: BankAccount[] = [];
  private users: User[] = [];

  private constructor() {}

  static getInstance(): GlobalRegistry {
    if (!GlobalRegistry.instance) {
      GlobalRegistry.instance = new GlobalRegistry();
    }
    return GlobalRegistry.instance;
  }

  static clear() {
    const instance = GlobalRegistry.getInstance();
    instance.banks = [];
    instance.bankAccounts = [];
    instance.users = [];
  }

  static addBankAccount(bankAccount: BankAccount): void {
    const instance = GlobalRegistry.getInstance();
    instance.bankAccounts.push(bankAccount);
  }

  static addBank(bank: Bank): void {
    const instance = GlobalRegistry.getInstance();
    instance.banks.push(bank);
  }
  static addUser(user: User): void {
    const instance = GlobalRegistry.getInstance();
    instance.users.push(user);
  }

  static getAccount(accountId: BankAccountId): BankAccount {
    const bankAccounts = this.instance.bankAccounts.filter(
      (bankAccount) => bankAccount.getId() === accountId
    );
    return bankAccounts[0];
  }

  static getUsers(): User[] {
    return this.instance.users;
  }

  static getBanks(): Bank[] {
    return this.instance.banks;
  }

  static getAccountPriority(accountId: BankAccountId): number {
    const bankAccount = this.getAccount(accountId);
    return bankAccount.getPriority();
  }

  static getIsNegativeAllowed(bankId: BankId) {
    const bank = this.instance.banks.filter(
      (bank) => bank.getId() === bankId
    )[0];
    if (bank) {
      return bank.getIsNegativeAllowed();
    }
    return false;
  }

  static withdraw(amount: number, bankAccount: BankAccount) {
    const bankId: BankId = bankAccount.getBankId();
    const accountId: BankAccountId = bankAccount.getId();
    const bank = this.instance.banks.filter(
      (bank) => bank.getId() === bankId
    )[0];
    const account = bank.getAccount(accountId);
    account.withdraw(amount);
  }

  static deposit(amount: number, bankAccount: BankAccount) {
    const bankId: BankId = bankAccount.getBankId();
    const accountId: BankAccountId = bankAccount.getId();
    const bank = this.instance.banks.filter(
      (bank) => bank.getId() === bankId
    )[0];
    const account = bank.getAccount(accountId);
    account.deposit(amount);
  }
}
