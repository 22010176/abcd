<script>
  import { createBangCap, deleteBangCap, getBangCap, updateBangCap } from "$lib/api/bangCap";
  import { createGiangVien, deleteGiangVien, getGiangVien, updateGiangVien } from "$lib/api/giangVien";
  import { getKhoa } from "$lib/api/khoa";
  import { dateToInDate, inDateToDate } from "$lib/utils";
  import { onMount } from "svelte";

  const { active } = $props();

  let inputForm = $state({ tenGV: "", dienThoai: "", ngaySinh: new Date(), email: "", khoaId: undefined, bangCapId: undefined });
  let updateForm = $state({ tenGV: "", dienThoai: "", ngaySinh: new Date(), email: "", khoaId: undefined, bangCapId: undefined });

  let state = $state("loading");
  let giangVienData = $state([]);
  let bangCapData = $state([]);
  let khoaData = $state([]);

  $inspect(giangVienData);

  $inspect(active);

  // cập nhật dữ liệu mỗi khi người dùng chuyển sang tab giảng viên
  $effect(async () => {
    if (!active) return;

    giangVienData = await getGiangVien();

    bangCapData = await getBangCap();
    updateForm.bangCapId = bangCapData[0]?.id;

    khoaData = await getKhoa();
    updateForm.khoaId = khoaData[0]?.id;

    state = "loaded";
  });

  async function addGiangVien(e) {
    e.preventDefault();
    const inputData = {
      ...inputForm,
      ngaySinh: inDateToDate(inputForm.ngaySinh),
    };

    const result = await createGiangVien(inputData);
    giangVienData = result.data;
    inputForm = { tenGV: "", dienThoai: "", ngaySinh: new Date(), email: "", khoaId: khoaData[0]?.id, bangCapId: bangCapData[0]?.id };
  }

  async function capNhatGiangVien(params) {
    const inputData = {
      ...updateForm,
      ngaySinh: inDateToDate(updateForm.ngaySinh),
    };
    const result = await updateGiangVien(inputData.id, inputData);
    giangVienData = result.data;
    updateForm = { tenGV: "", dienThoai: "", ngaySinh: new Date(), email: "", khoaId: undefined, bangCapId: undefined };
  }
</script>

<!-- Nếu dữ liệu đang tải thì hiện thị dòng này -->
{#if state == "loading"}
  <p class="mx-5 text-red-500 text-lg font-bold">Loading...</p>
  <!-- Nếu dữ liệu đã tải xong tất cả lên giao diện -->
{:else if state == "loaded"}
  <!-- Hiện thông báo nếu dữ liệu bằng cấp không có bảng ghi -->
  {#if bangCapData.length == 0}
    <p class="mx-5 text-red-500 text-lg font-bold">Vui lòng nhập dữ liệu bằng cấp</p>
  {/if}

  <!-- Hiện thông báo nếu dữ liệu khoa không có bảng ghi -->
  {#if khoaData.length == 0}
    <p class="mx-5 text-red-500 text-lg font-bold">Vui lòng nhập dữ liệu khoa</p>
  {/if}

  <!-- Bảng dữ liệu chỉ được tải khi dữ liệu khoa và bằng cập được khởi tạo -->
  {#if bangCapData.length && khoaData.length}
    <div class="p-5">
      <table class="table">
        <thead class="font-bold">
          <tr>
            <th class="font-bold w-15">STT</th>
            <th class="font-bold w-80">Tên giảng viên</th>
            <th class="font-bold w-50">Điện thoại</th>
            <th class="font-bold w-50">Ngày sinh</th>
            <th class="text-right">Email</th>
            <th class="text-right">Khoa</th>
            <th class="text-right">Bằng cấp</th>
            <th class="text-right w-50"></th>
          </tr>
        </thead>
        <tbody class="[&>tr]:hover:preset-tonal-primary">
          <!-- lấy từng dữ liệu giảng viên ở trong giangVienData và tạo dòng dữ liệu -->
          {#each giangVienData as row, i (row.id)}
            <tr>
              <!-- Kiểm tra nếu form cập nhật có id trùng với id của dòng dữ liệu -->
              {#if row.id == updateForm.id}
                <!-- Hiện thị form cập nhật cho dòng dữ liệu -->
                <td>{i + 1}</td>
                <td><input class="input" bind:value={updateForm.tenGV} type="text" placeholder="Tên giảng viên" /></td>
                <td><input class="input" bind:value={updateForm.dienThoai} type="text" placeholder="Điện thoại" /></td>
                <td><input class="input" bind:value={updateForm.ngaySinh} type="date" placeholder="Ngày sinh" /></td>
                <td><input class="input" bind:value={updateForm.email} type="email" placeholder="Email" /></td>
                <td>
                  <select class="select" bind:value={updateForm.bangCapId}>
                    {#each bangCapData as bangCap}
                      <option value={bangCap.id}>{bangCap.tenBC}</option>
                    {/each}
                  </select>
                </td>
                <td>
                  <select class="select" bind:value={updateForm.khoaId}>
                    {#each khoaData as khoa}
                      <option value={khoa.id}>{khoa.tenKhoa}</option>
                    {/each}
                  </select>
                </td>
                <td>
                  <button
                    type="button"
                    onclick={capNhatGiangVien}
                    disabled={!Object.values(updateForm).every((i) => !!i)}
                    class="btn preset-filled-primary-500">
                    Lưu
                  </button>
                </td>
              {:else}
                <!-- Nếu không phải thì hiện thì dòng dữ liệu bình thường -->
                <td>{i + 1}</td>
                <td>{row.tenGV}</td>
                <td>{row.dienThoai}</td>
                <td>{new Date(row.ngaySinh).toLocaleDateString()}</td>
                <td>{row.email}</td>
                <td>{row.tenKhoa}</td>
                <td>{row.tenBC}</td>
                <td>
                  <!-- nút sửa dữ liệu -->
                  <button
                    type="button"
                    class="btn preset-filled-primary-500"
                    onclick={() => {
                      updateForm = {
                        ...row,
                        ngaySinh: dateToInDate(row.ngaySinh),
                      };
                    }}>Sửa</button>
                  <!-- nút xóa dữ liệu -->
                  <button
                    type="button"
                    class="btn preset-filled-primary-500"
                    onclick={async () => {
                      giangVienData = (await deleteGiangVien(row.id)).data;
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
            <td><input disabled={updateForm.id} class="input" bind:value={inputForm.tenGV} type="text" placeholder="Tên giảng viên" /></td>
            <td><input disabled={updateForm.id} class="input" bind:value={inputForm.dienThoai} type="tel" placeholder="Điện thoại" /></td>
            <td><input disabled={updateForm.id} class="input" bind:value={inputForm.ngaySinh} type="date" placeholder="Ngày sinh" /></td>
            <td><input disabled={updateForm.id} class="input" bind:value={inputForm.email} type="email" placeholder="Email" /></td>
            <td>
              <select class="select" bind:value={inputForm.khoaId} placeholder="Khoa">
                {#each khoaData as khoa}
                  <option value={khoa.id}>{khoa.tenKhoa}</option>
                {/each}
              </select>
            </td>
            <td>
              <select class="select" bind:value={inputForm.bangCapId} placeholder="Bằng cấp">
                {#each bangCapData as bangCap}
                  <option value={bangCap.id}>{bangCap.tenBC}</option>
                {/each}
              </select>
            </td>
            <td>
              <!-- nút thêm dữ liệu -->
              <button
                onclick={addGiangVien}
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
