import { bigint, foreignKey } from 'drizzle-orm/gel-core';
import { int, mysqlTable, serial, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const BangCap = mysqlTable('BangCap', {
	id: serial('id').primaryKey(),
	tenBC: varchar("tenBC", { length: 255 }).unique().notNull(),
	tenVietTat: varchar("tenVietTat", { length: 255 }).unique().notNull(),
	heSo: bigint('heSo', { mode: 'number' }).default(1)
})

export const Khoa = mysqlTable("Khoa", {
	id: serial('id').primaryKey(),
	tenKhoa: varchar("tenKhoa", { length: 255 }).unique().notNull(),
	tenVietTat: varchar("tenVietTat", { length: 255 }).unique().notNull(),
	moTaNhiemVu: varchar("moTaNhiemVu", { length: 255 }).notNull(),
})

export const GiangVien = mysqlTable("GiangVien", {
	id: serial('id').primaryKey(),
	tenGV: varchar("tenGV", { length: 255 }).notNull(),
	dienThoai: varchar("dienThoai", { length: 15 }).notNull(),
	ngaySinh: timestamp("ngaySinh").notNull(),
	email: varchar("email", { length: 255 }).unique().notNull(),
	khoaId: int("khoaId").notNull(),
	bangCapId: int("bangCapId").notNull(),
}, (table) => ({
	khoaFK: foreignKey(() => [table.khoaId], () => [Khoa.id]),
	bangCapFK: foreignKey(() => [table.bangCapId], () => [BangCap.id]),
}))