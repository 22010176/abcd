import { eq } from "drizzle-orm";

import { db } from ".";
import { BangCap, GiangVien, HocPhan, Khoa, KyHoc, LopHocPhan } from "./schema";

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

export async function getLopHocPhan() {
  return await db
    .select({
      id: LopHocPhan.id,
      tenLop: LopHocPhan.tenLop,
      soLuongSV: LopHocPhan.soLuongSV,
      hocPhanId: LopHocPhan.hocPhanId,
      kyHocId: LopHocPhan.kyHocId,
      giangVienId: LopHocPhan.giangVienId,
      tenHP: HocPhan.tenHP,
      tenKy: KyHoc.tenKy,
      tenGV: GiangVien.tenGV,
      khoaId: HocPhan.khoaId,
      tenKhoa: Khoa.tenKhoa
    })
    .from(LopHocPhan)
    .innerJoin(KyHoc, eq(LopHocPhan.kyHocId, KyHoc.id))
    .innerJoin(GiangVien, eq(LopHocPhan.giangVienId, GiangVien.id))
    .innerJoin(HocPhan, eq(LopHocPhan.hocPhanId, HocPhan.id))
    .innerJoin(Khoa, eq(GiangVien.khoaId, Khoa.id))
    .orderBy(LopHocPhan.id)
}

export async function getDanhSachHocPhanGiangVien() {
  return await db
    .select({
      id: LopHocPhan.id,
      tenLop: LopHocPhan.tenLop,
      soLuongSV: LopHocPhan.soLuongSV,
      hocPhanId: LopHocPhan.hocPhanId,
      heSoHocPhan: HocPhan.heSoHP,
      soTiet: HocPhan.soTiet,
      kyHocId: LopHocPhan.kyHocId,
      giangVienId: LopHocPhan.giangVienId,
      tenHP: HocPhan.tenHP,
      tenKy: KyHoc.tenKy,
      tenGV: GiangVien.tenGV,
      bangCapId: GiangVien.bangCapId,
      tenBC: BangCap.tenBC,
      heSoBC: BangCap.heSo,
      khoaId: GiangVien.khoaId,
      tenKhoa: Khoa.tenKhoa
    })
    .from(LopHocPhan)
    .innerJoin(GiangVien, eq(LopHocPhan.giangVienId, GiangVien.id))
    .innerJoin(HocPhan, eq(LopHocPhan.hocPhanId, HocPhan.id))
    .innerJoin(KyHoc, eq(LopHocPhan.kyHocId, KyHoc.id))
    .innerJoin(Khoa, eq(GiangVien.khoaId, Khoa.id))
    .innerJoin(BangCap, eq(GiangVien.bangCapId, BangCap.id))
    .orderBy(LopHocPhan.id)
}

export async function getHocPhan() {
  return await db
    .select({
      id: HocPhan.id,
      tenHP: HocPhan.tenHP,
      heSoHP: HocPhan.heSoHP,
      soTiet: HocPhan.soTiet,
      soTinChi: HocPhan.soTinChi,
      khoaId: HocPhan.khoaId,
      tenKhoa: Khoa.tenKhoa
    })
    .from(HocPhan)
    .innerJoin(Khoa, eq(HocPhan.khoaId, Khoa.id))
}
export async function getHocKi() {
  return await db
    .select({
      id: KyHoc.id,
      tenKy: KyHoc.tenKy,
      namHoc: KyHoc.namHoc,
      ngayBatDau: KyHoc.ngayBatDau,
      ngayKetThuc: KyHoc.ngayKetThuc
    })
    .from(KyHoc)
}