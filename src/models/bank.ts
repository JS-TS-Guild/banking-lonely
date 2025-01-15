import { BankAccountId } from "@/types/Common";
import BankAccount from "./bank-account";
import GlobalRegistry from "@/services/GlobalRegistry";

interface createBankProps {
  isNegativeAllowed?: boolean;
}
export default class Bank {
  private id: string;
  private isNegativeAllowed: boolean;

  constructor() {}

  static create({ isNegativeAllowed = false }: createBankProps = {}): Bank {
    const bank = new Bank();
    bank.id = Math.random().toString(36).substring(7);
    bank.isNegativeAllowed = isNegativeAllowed;
    return bank;
  }

  getId(): string {
    return this.id;
  }

  createAccount(intialBalance: number) {
    const bankAccount = new BankAccount(intialBalance);
    GlobalRegistry.addBankAccount(bankAccount);
    return bankAccount;
  }

  getAccount(id: BankAccountId) {}
}
