import { bigint, foreignKey } from 'drizzle-orm/gel-core';
import { double, int, mysqlTable, serial, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const BangCap = mysqlTable('BangCap', {
	id: serial('id').primaryKey(),
	tenBC: varchar("tenBC", { length: 255 }).notNull(),
	tenVietTat: varchar("tenVietTat", { length: 255 }).notNull(),
	heSo: bigint('heSo', { mode: 'number' }).default(1)
})

export const Khoa = mysqlTable("Khoa", {
	id: serial('id').primaryKey(),
	tenKhoa: varchar("tenKhoa", { length: 255 }).notNull(),
	tenVietTat: varchar("tenVietTat", { length: 255 }).notNull(),
	moTaNhiemVu: varchar("moTaNhiemVu", { length: 255 }).notNull(),
})

export const GiangVien = mysqlTable("GiangVien", {
	id: serial('id').primaryKey(),
	tenGV: varchar("tenGV", { length: 255 }).notNull(),
	dienThoai: varchar("dienThoai", { length: 15 }).notNull(),
	ngaySinh: timestamp("ngaySinh").notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	khoaId: int("khoaId").notNull(),
	bangCapId: int("bangCapId").notNull(),
}, (table) => ({
	khoaFK: foreignKey(() => [table.khoaId], () => [Khoa.id]),
	bangCapFK: foreignKey(() => [table.bangCapId], () => [BangCap.id]),
}))

export const HocPhan = mysqlTable("HocPhan", {
	id: serial('id').primaryKey(),
	tenHP: varchar("tenHP", { length: 255 }).notNull(),
	heSoHP: double("heSoHP").notNull(),
	soTiet: int("soTiet").notNull(),
})

export const KyHoc = mysqlTable("KyHoc", {
	id: serial('id').primaryKey(),
	tenKy: varchar("tenKy", { length: 255 }).notNull(),
	ngayBatDau: timestamp("ngayBatDau").notNull(),
	ngayKetThuc: timestamp("ngayKetThuc").notNull(),
})

export const LopHocPhan = mysqlTable("LopHocPhan", {
	id: serial('id').primaryKey(),
	tenLop: varchar("tenLop", { length: 255 }).notNull(),
	soLuongSV: int("soLuongSV").notNull(),
	hocPhanId: int("hocPhanId").notNull(),
	kyHocId: int("kyHocId").notNull(),
	giangVienId: int("giangVienId").notNull(),
}, (table) => ({
	hocPhanFK: foreignKey(() => [table.hocPhanId], () => [HocPhan.id]),
	kyHocFK: foreignKey(() => [table.kyHocId], () => [KyHoc.id]),
	giangVienFK: foreignKey(() => [table.giangVienId], () => [GiangVien.id]),
}))


