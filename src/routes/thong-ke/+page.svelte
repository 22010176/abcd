<script>
  import { getKhoa } from "$lib/api/khoa";
  import { getKyHoc } from "$lib/api/kyHoc";
  import { getDuLieuThongKe } from "$lib/api/thongKe";
  import { onMount } from "svelte";

  const formatted = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });
  const tienDay = 100_000;

  let thongKe = $state("khoa");
  let selected = $state("all");

  let data = $state([]);
  let khoa = $state([]);
  let hocKi = $state([]);
  $inspect(data);

  let detailData = $state([]);
  let tableData = $derived(
    Object.values(
      data.reduce((acc, item) => {
        if (selected !== "all" && item.khoaId !== selected && thongKe === "khoa") {
          return acc; // Bỏ qua nếu khoa không khớp
        }
        if (thongKe === "hoc-ki" && item.kyHocId !== selected && selected !== "all") {
          return acc; // Bỏ qua nếu học kì không khớp
        }
        // Kiểm tra xem giảng viên đã có trong acc chưa
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
    const khoaU = await getKhoa();
    khoa = khoaU;

    const hocki = await getKyHoc();
    hocKi = hocki;
  });

  $inspect(hocKi);
</script>

<h1 class="uppercase text-3xl font-bold m-5">Thống kê</h1>

<p class="text-lg px-5">Tiền dạy 1 tiết: 100.000VNĐ</p>
<div class="grid w-full min-h-100 p-5">
  <div class="mb-5 flex gap-5">
    <div class="w-60">
      <!-- svelte-ignore a11y_label_has_associated_control -->
      <label class="label">
        <span class="label-text">Chọn kiểu thống kê</span>
      </label>
      <select class="select select-bordered w-full max-w-xs" bind:value={thongKe}>
        <!-- <option disabled selected>Chọn giảng viên</option> -->
        <option value="khoa">Thống kê theo khoa</option>
        <option value="hoc-ki">Thống kê theo học kì</option>
      </select>
    </div>

    <div class="w-60">
      <!-- svelte-ignore a11y_label_has_associated_control -->
      <label class="label">
        {#if thongKe === "hoc-ki"}
          <span class="label-text">Chọn học kì</span>
        {:else}
          <span class="label-text">Chọn khoa</span>
        {/if}
      </label>
      {#if thongKe === "hoc-ki"}
        <select class="select select-bordered w-full max-w-xs" bind:value={selected}>
          <!-- <option disabled selected>Chọn học kì</option> -->
          <option value="all">Tất cả học kì</option>
          {#each hocKi as item}
            <option value={item.id}>{item.tenKy}</option>
          {/each}
        </select>
      {:else}
        <!-- Chọn khoa -->
        <select class="select select-bordered w-full max-w-xs" bind:value={selected}>
          <!-- <option disabled selected>Chọn giảng viên</option> -->
          <option value="all">Tất cả khoa</option>
          {#each khoa as item}
            <option value={item.id}>{item.tenKhoa}</option>
          {/each}
        </select>
      {/if}
    </div>
  </div>
  <div class="overflow-hidden">
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
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
