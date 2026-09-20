import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const enquiries = pgTable('enquiries', {
  id: bigint('id', { mode: 'number' }).primaryKey().generatedByDefaultAsIdentity(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  category: text('category').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull().default('new'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export type Enquiry = typeof enquiries.$inferSelect
export type NewEnquiry = typeof enquiries.$inferInsert
