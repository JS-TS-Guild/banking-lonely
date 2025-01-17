import BankAccount from "@/models/bank-account";
import GlobalRegistry from "@/services/GlobalRegistry";
import { UserId } from "@/types/Common";

export default class User {
  private id: UserId;
  private accounts: string[];

  static create(name?: string, accounts?: string[]): User {
    const user = new User();
    if (name) user.id = name;
    if (accounts) user.accounts = accounts;
    GlobalRegistry.addUser(user);
    return user;
  }

  getId(): string {
    return this.id;
  }

  sortAccounts(): void {
    this.accounts.sort(
      (a, b) =>
        GlobalRegistry.getAccountPriority(a) -
        GlobalRegistry.getAccountPriority(b)
    );
  }

  getAccounts(): BankAccount[] {
    return this.accounts.map((accountId) =>
      GlobalRegistry.getAccount(accountId)
    );
  }
}
