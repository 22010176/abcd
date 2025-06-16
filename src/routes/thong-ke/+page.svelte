<script>
  import { getDuLieuThongKe } from "$lib/api/thongKe";
  import { onMount } from "svelte";

  const formatted = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });
  const tienDay = 100_000;

  let data = $state([]);
  let detailData = $state([]);
  let tableData = $derived(
    Object.values(
      data.reduce((acc, item) => {
        if (acc[item.giangVienId] == null) {
          acc[item.giangVienId] = {};
          acc[item.giangVienId].giangVienId = item.giangVienId;
          acc[item.giangVienId].tenGV = item.tenGV;
          acc[item.giangVienId].tenKhoa = item.tenKhoa;
          acc[item.giangVienId].tenBC = item.tenBC;
          acc[item.giangVienId].soMonDay = 1;
          acc[item.giangVienId].tongTienDay = tienDay * item.heSoHocPhan * item.heSoBC * item.soTiet;
        } else {
          acc[item.giangVienId].soMonDay += 1;
          acc[item.giangVienId].tongTienDay += tienDay * item.heSoHocPhan * item.heSoBC * item.soTiet;
        }
        return acc;
      }, {}),
    ),
  );

  onMount(async () => {
    const result = await getDuLieuThongKe();
    data = result;
  });

  $inspect(tableData);
  $inspect(detailData);
</script>

<h1 class="uppercase text-3xl font-bold m-5">Tính tiền dạy</h1>

<p class="text-lg px-5">Tiền dạy 1 tiết: 100.000VNĐ</p>
<div class="grid w-full min-h-100 p-5 grid-cols-[2fr_1.5fr] gap-10">
  <div class="overflow-hidden">
    <h1 class="text-xl font-bold">Danh sách giảng viên</h1>
    <div class="h-100 overflow-auto">
      <table class="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên giáo viên</th>
            <th>Bằng cấp</th>
            <th>Khoa</th>
            <th>Số môn dạy</th>
            <th>Tổng tiền dạy</th>
          </tr>
        </thead>
        <tbody>
          {#each tableData as row, i}
            <tr>
              <td>{i + 1}</td>
              <td>{row.tenGV}</td>
              <td>{row.tenBC}</td>
              <td>{row.tenKhoa}</td>
              <td>{row.soMonDay}</td>
              <td>{formatted.format(row.tongTienDay)}</td>
              <td>
                <button
                  class="btn preset-filled-primary-500"
                  onclick={() => {
                    detailData = data
                      .filter((i) => i.giangVienId == row.giangVienId)
                      .map((i) => ({
                        id: i.id,
                        tenLop: i.tenLop,
                        tenHP: i.tenHP,
                        soTiet: i.soTiet,
                        tongTienDay: tienDay * i.heSoHocPhan * i.heSoBC * i.soTiet,
                      }));
                  }}>Xem chi tiết</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <div class="overflow-hidden">
    <h1 class="text-xl font-bold">Danh sách môn giảng viên dạy</h1>
    <div class="h-100 overflow-auto">
      <table class="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên lớp</th>
            <th>Học phần</th>
            <th>Số tiết</th>
            <th>Số tiền quy đổi</th>
          </tr>
        </thead>
        <tbody>
          {#each detailData as row, i (row.id)}
            <tr>
              <td>{i + 1}</td>
              <td>{row.tenLop}</td>
              <td>{row.tenHP}</td>
              <td>{row.soTiet}</td>
              <td>{formatted.format(row.tongTienDay)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
