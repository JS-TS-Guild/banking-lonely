import { BankAccountId, BankId, findUserById, UserId } from "@/types/Common";
import BankAccount from "./bank-account";
import GlobalRegistry from "@/services/GlobalRegistry";

export default class Bank {
  private id: BankId;
  private isNegativeAllowed: boolean;

  constructor() {}

  static create(options?: { isNegativeAllowed?: boolean }): Bank {
    const bank = new Bank();
    bank.id = Math.random().toString(36).substring(7);
    bank.isNegativeAllowed = options?.isNegativeAllowed || false;
    GlobalRegistry.addBank(bank);
    return bank;
  }

  getIsNegativeAllowed(): boolean {
    return this.isNegativeAllowed;
  }

  getId(): BankId {
    return this.id;
  }

  createAccount(intialBalance: number) {
    const bankAccount = new BankAccount(intialBalance, this.id);
    GlobalRegistry.addBankAccount(bankAccount);
    return bankAccount;
  }

  getAccount(accountId: BankAccountId): BankAccount | undefined {
    const account = GlobalRegistry.getAccount(accountId);
    return account.getBankId() === this.id ? account : undefined;
  }

  send(
    senderId: UserId,
    receiverId: UserId,
    amount: number,
    receiverBankId?: BankId
  ) {
    const users = GlobalRegistry.getUsers();

    const sender = findUserById(senderId, users);
    const receiver = findUserById(receiverId, users);

    if (!sender || !receiver) {
      throw new Error("Insufficient funds");
    }

    sender.sortAccounts(); // Ensure accounts are sorted by priority
    let senderAccounts = sender.getAccounts();
    let receiverAccounts = receiver.getAccounts();
    senderAccounts = senderAccounts.filter(
      (acc) => acc.getBankId() == senderAccounts[0].getBankId()
    );

    const senderBankId = senderAccounts[0].getBankId();

    const isNegativeAllowed = GlobalRegistry.getIsNegativeAllowed(senderBankId);

    let remainingAmount = amount;
    let receiverAccount: BankAccount;

    if (receiverBankId) {
      const receiverAccountsById = receiverAccounts.filter(
        (acc) => acc.getBankId() === receiverBankId
      );
      if (!receiverAccountsById)
        throw new Error("Receiver bank account not found.");
      else receiverAccount = receiverAccountsById[0];
    } else {
      receiverAccount =
        receiverAccounts.filter((acc) => acc.getBankId() === senderBankId)[0] ||
        receiverAccounts[0]; // Default to any account if inter-bank transfer
    }

    if (isNegativeAllowed) {
      GlobalRegistry.withdraw(amount, senderAccounts[0]);
      GlobalRegistry.deposit(amount, receiverAccount);
    } else {
      for (const senderAccount of senderAccounts) {
        const bank = GlobalRegistry.getBanks().filter(
          (bank) => bank.id === senderAccount.getBankId()
        )[0];

        const transferableAmount = Math.min(
          remainingAmount,
          senderAccount.getBalance()
        );
        if (transferableAmount > 0) {
          GlobalRegistry.withdraw(amount, senderAccount);
          GlobalRegistry.deposit(amount, receiverAccount);
          remainingAmount -= transferableAmount;

          if (remainingAmount === 0) break;
        }
      }

      if (remainingAmount > 0) {
        throw new Error("Insufficient funds");
      }
    }
  }
}
