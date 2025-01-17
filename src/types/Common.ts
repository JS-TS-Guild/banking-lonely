import User from "@/models/user";

export type BankAccountId = string;
export type UserId = string;
export type Balance = number;
export type BankId = string;

export function findUserById(userId: UserId, users: User[]): User | undefined {
  const result = users.filter((user) => user.getId() === userId);
  if (result.length > 0) return result[0];

  return undefined;
}
