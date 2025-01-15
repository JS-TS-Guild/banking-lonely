import Bank from "@/models/bank";
import BankAccount from "@/models/bank-account";
import User from "@/models/user";

interface createBankProps {
  isNegativeAllowed?: boolean;
}

export default class GlobalRegistry {
  private static instance: GlobalRegistry | null = null;
  private banks: Bank[] = [];
  private bankAccounts: BankAccount[] = [];
  private user: User[] = [];

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
    instance.user = [];
  }

  static addBankAccount(bankAccount: BankAccount): void {
    const instance = GlobalRegistry.getInstance();
    instance.bankAccounts.push(bankAccount);
  }

  static addBank(bank: Bank): void {
    const instance = GlobalRegistry.getInstance();
    instance.banks.push(bank);
  }
}
