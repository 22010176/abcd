import { eq } from "drizzle-orm";
import { db } from ".";
import { BangCap, GiangVien, Khoa } from "./schema";

export async function getGiangVien() {
  return await db
    .select({
      id: GiangVien.id,
      tenGV: GiangVien.tenGV,
      dienThoai: GiangVien.dienThoai,
      ngaySinh: GiangVien.ngaySinh,
      email: GiangVien.email,
      khoaId: GiangVien.khoaId,
      bangCapId: GiangVien.bangCapId,
      tenKhoa: Khoa.tenKhoa,
      tenBC: BangCap.tenBC
    })
    .from(GiangVien)
    .innerJoin(Khoa, eq(GiangVien.khoaId, Khoa.id))
    .innerJoin(BangCap, eq(GiangVien.bangCapId, BangCap.id))
    .orderBy(GiangVien.id)
}