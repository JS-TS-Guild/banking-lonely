import BankAccount from "@/models/bank-account";
import { UserId } from "@/types/Common";

export default class User {
  private id: UserId;
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
