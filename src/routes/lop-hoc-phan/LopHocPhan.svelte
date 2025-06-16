<script>
  import { deleteGiangVien, getGiangVien } from "$lib/api/giangVien";
  import { getHocPhan } from "$lib/api/hocPhan";
  import { getKyHoc } from "$lib/api/kyHoc";
  import { createLopHocPhan, deleteLopHocPhan, getLopHocPhan, updateLopHocPhan } from "$lib/api/lopHocPhan";
  import { dateToInDate } from "$lib/utils";

  const { active } = $props();

  let inputForm = $state({ tenLop: "", soLuongSV: "", hocPhanId: undefined, kyHocId: undefined, giangVienId: undefined });
  let updateForm = $state({ tenLop: "", soLuongSV: "", hocPhanId: undefined, kyHocId: undefined, giangVienId: undefined });

  let state = $state("loading");
  let giangVienData = $state([]);
  let lopHocPhanData = $state([]);
  let hocPhanData = $state([]);
  let hocKiData = $state([]);

  $inspect(lopHocPhanData);

  $inspect(active);

  // cập nhật dữ liệu mỗi khi người dùng chuyển sang tab giảng viên
  $effect(async () => {
    if (!active) return;

    lopHocPhanData = await getLopHocPhan();

    giangVienData = await getGiangVien();
    inputForm.giangVienId = giangVienData[0]?.id;

    hocPhanData = await getHocPhan();
    inputForm.hocPhanId = hocPhanData[0]?.id;

    hocKiData = await getKyHoc();
    inputForm.kyHocId = hocKiData[0]?.id;

    state = "loaded";
  });

  async function addLopHocPhan(e) {
    e.preventDefault();

    const result = await createLopHocPhan(inputForm);
    lopHocPhanData = result.data;
    inputForm = { tenLop: "", soLuongSV: "", hocPhanId: undefined, kyHocId: undefined, giangVienId: undefined };
  }
  $inspect(updateForm);
  async function capNhatLopHocPhan(params) {
    const result = await updateLopHocPhan(updateForm.id, updateForm);
    lopHocPhanData = result.data;
    updateForm = { tenLop: "", soLuongSV: "", hocPhanId: undefined, kyHocId: undefined, giangVienId: undefined };
  }
</script>

<!-- Nếu dữ liệu đang tải thì hiện thị dòng này -->
{#if state == "loading"}
  <p class="mx-5 text-red-500 text-lg font-bold">Loading...</p>
  <!-- Nếu dữ liệu đã tải xong tất cả lên giao diện -->
{:else if state == "loaded"}
  <!-- Hiện thông báo nếu dữ liệu bằng cấp không có bảng ghi -->
  {#if hocPhanData.length == 0}
    <p class="mx-5 text-red-500 text-lg font-bold">Vui lòng nhập dữ liệu bằng cấp</p>
  {/if}

  <!-- Hiện thông báo nếu dữ liệu khoa không có bảng ghi -->
  {#if hocKiData.length == 0}
    <p class="mx-5 text-red-500 text-lg font-bold">Vui lòng nhập dữ liệu khoa</p>
  {/if}

  <!-- Bảng dữ liệu chỉ được tải khi dữ liệu khoa và bằng cập được khởi tạo -->
  {#if hocPhanData.length && hocKiData.length}
    <div class="p-5">
      <table class="table">
        <thead class="font-bold">
          <tr>
            <th class="font-bold w-15">STT</th>
            <th class="font-bold w-80">Tên lớp</th>
            <th class="font-bold w-50">Số lượng sinh viên</th>
            <th class="font-bold w-50">Học phần</th>
            <th class="text-right">Kì học</th>
            <th class="text-right">Giảng viên giảng dạy</th>
            <th class="text-right w-80"></th>
          </tr>
        </thead>
        <tbody class="[&>tr]:hover:preset-tonal-primary">
          <!-- lấy từng dữ liệu giảng viên ở trong giangVienData và tạo dòng dữ liệu -->
          {#each lopHocPhanData as row, i (row.id)}
            <tr>
              <!-- Kiểm tra nếu form cập nhật có id trùng với id của dòng dữ liệu -->
              {#if row.id == updateForm.id}
                <!-- Form thêm dữ liệu  -->
                <td>{i + 1}</td>
                <td><input class="input" bind:value={updateForm.tenLop} type="text" placeholder="Tên lớp" /></td>
                <td><input class="input" bind:value={updateForm.soLuongSV} type="number" placeholder="số lượng sinh viên" /></td>
                <td>
                  <!-- <input disabled={updateForm.id} class="input" bind:value={inputForm.ngaySinh} type="date" placeholder="học phần" /> -->
                  <select class="select" bind:value={updateForm.hocPhanId}>
                    {#each hocPhanData as hocPhan}
                      <option value={hocPhan.id}>{hocPhan.tenHP}</option>
                    {/each}
                  </select>
                </td>
                <!-- <td><input disabled={updateForm.id} class="input" bind:value={inputForm.email} type="email" placeholder="Email" /></td> -->
                <td>
                  <select class="select" bind:value={updateForm.kyHocId}>
                    {#each hocKiData as khoa}
                      <option value={khoa.id}>{khoa.tenKy}</option>
                    {/each}
                  </select>
                </td>
                <td>
                  <select class="select" bind:value={updateForm.giangVienId} placeholder="Bằng cấp">
                    {#each giangVienData as giangVien}
                      <option value={giangVien.id}>{giangVien.tenGV}</option>
                    {/each}
                  </select>
                </td>
                <td>
                  <button onclick={capNhatLopHocPhan} type="button" class="btn preset-filled-primary-500">Lưu</button>
                </td>
              {:else}
                <!-- Nếu không phải thì hiện thì dòng dữ liệu bình thường -->
                <td>{i + 1}</td>
                <td>{row.tenLop}</td>
                <td>{row.soLuongSV}</td>
                <td>{row.tenHP}</td>
                <td>{row.tenKy}</td>
                <td>{row.tenGV}</td>
                <td>
                  <!-- nút sửa dữ liệu -->
                  <button
                    type="button"
                    class="btn preset-filled-primary-500"
                    onclick={() => {
                      updateForm = { ...row };
                    }}>Sửa</button>
                  <!-- nút xóa dữ liệu -->
                  <button
                    type="button"
                    class="btn preset-filled-primary-500"
                    onclick={async () => {
                      lopHocPhanData = (await deleteLopHocPhan(row.id)).data;
                    }}>
                    Xóa
                  </button>
                </td>
              {/if}
            </tr>
          {/each}
          <tr>
            <!-- Form thêm dữ liệu  -->
            <td></td>
            <td><input disabled={updateForm.id} class="input" bind:value={inputForm.tenLop} type="text" placeholder="Tên lớp" /></td>
            <td><input disabled={updateForm.id} class="input" bind:value={inputForm.soLuongSV} type="number" placeholder="số lượng sinh viên" /></td>
            <td>
              <!-- <input disabled={updateForm.id} class="input" bind:value={inputForm.ngaySinh} type="date" placeholder="học phần" /> -->
              <select class="select" bind:value={inputForm.hocPhanId}>
                {#each hocPhanData as hocPhan}
                  <option value={hocPhan.id}>{hocPhan.tenHP}</option>
                {/each}
              </select>
            </td>
            <!-- <td><input disabled={updateForm.id} class="input" bind:value={inputForm.email} type="email" placeholder="Email" /></td> -->
            <td>
              <select class="select" bind:value={inputForm.kyHocId}>
                {#each hocKiData as khoa}
                  <option value={khoa.id}>{khoa.tenKy}</option>
                {/each}
              </select>
            </td>
            <td>
              <select class="select" bind:value={inputForm.giangVienId} placeholder="Bằng cấp">
                {#each giangVienData as giangVien}
                  <option value={giangVien.id}>{giangVien.tenGV}</option>
                {/each}
              </select>
            </td>
            <td>
              <!-- nút thêm dữ liệu -->
              <button
                onclick={addLopHocPhan}
                disabled={!Object.values(inputForm).every((i) => !!i)}
                type="button"
                class="btn preset-filled-primary-500">
                Thêm
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  {/if}
{/if}
