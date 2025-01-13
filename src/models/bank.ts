import BankAccount from "./bank-account";

export default class Bank {
  private id: string;

  static create(): Bank {
    const bank = new Bank();
    bank.id = Math.random().toString(36).substring(7);
    return bank;
  }

  getId(): string {
    return this.id;
  }

  createAccount(intialBalance: number) {
    const bankAccount = new BankAccount(intialBalance);
    return bankAccount;
  }
}
