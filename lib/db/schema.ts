import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const forms = mysqlTable("form", {
  id: serial("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 500 }),
  email: varchar("email", { length: 500 }),
  phone: varchar("phone", { length: 500 }),
  message: varchar("message", { length: 500 }),
  person: varchar("person", { length: 500 }),
});
