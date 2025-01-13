import BankAccount from "@/models/bank-account";

export default class User {
  private id: string;
  private accounts: string[];

  static create(name?: string, accounts?: string[]): User {
    const user = new User();
    if (name) user.id = name;
    if (accounts) user.accounts = accounts;
    return user;
  }

  getId(): string {
    return this.id;
  }
}
