<script>
  import { getBangCap } from "$lib/api/bangCap";
  import { createGiangVien, deleteGiangVien, getGiangVien, updateGiangVien } from "$lib/api/giangVien";
  import { getKhoa } from "$lib/api/khoa";
  import { dateToInDate, inDateToDate } from "$lib/utils";
  import { createToaster, Toaster } from "@skeletonlabs/skeleton-svelte";

  const { active } = $props();

  const toaster = createToaster();
  let inputForm = $state({ tenGV: "", dienThoai: "", ngaySinh: null, email: "", khoaId: undefined, bangCapId: undefined });
  let updateForm = $state({ tenGV: "", dienThoai: "", ngaySinh: null, email: "", khoaId: undefined, bangCapId: undefined });
  let errorMessage = $state({ tenGV: "", dienThoai: "", ngaySinh: "", email: "", khoaId: "", bangCapId: "" });

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
    khoaData = await getKhoa();

    state = "loaded";
    updateForm.bangCapId = bangCapData[0]?.id;
    updateForm.khoaId = khoaData[0]?.id;
  });
  /*
  {
    "tenGV": "",
    "dienThoai": "",
    "ngaySinh": "2025-06-24T09:07:59.203Z",
    "email": "",
    "khoaId": 6,
    "bangCapId": 1
  }
  */
  function checkField({ id, tenGV, dienThoai, ngaySinh, email, khoaId, bangCapId }) {
    const tenGVErr = tenGV === "",
      dienThoaiErr = dienThoai === "",
      ngaySinhErr = ngaySinh == null,
      emailErr = email === "",
      khoaIdErr = khoaId === undefined,
      bangCapIdErr = bangCapId === undefined,
      phoneFormatErr = !/^(0|\+84)[1-9][0-9]{8}$/.test(dienThoai);

    errorMessage = {
      tenGV: tenGVErr ? "Không được để trống" : "",
      dienThoai: dienThoaiErr ? "Không được để trống" : phoneFormatErr ? "Sai định dạng số điện thoại" : "",
      ngaySinh: ngaySinhErr ? "Không được để trống" : "",
      email: emailErr ? "Không được để trống" : "",
      khoaId: khoaIdErr ? "Không được để trống" : "",
      bangCapId: bangCapIdErr ? "Không được để trống" : "",
    };

    if (tenGVErr || dienThoaiErr || ngaySinhErr || emailErr || khoaIdErr || bangCapIdErr || phoneFormatErr) throw new Error();
  }

  async function addGiangVien(e) {
    e.preventDefault();
    checkField(inputForm);
    const inputData = {
      ...inputForm,
      ngaySinh: inDateToDate(inputForm.ngaySinh),
    };

    const result = await createGiangVien(inputData)
      .then((result) => {
        toaster.success({ title: "Thêm giảng viên thành công!" });
        return result;
      })
      .catch((r) => {
        toaster.error({ title: "Không thể thêm giảng viên!" });
        return [];
      });
    giangVienData = result.data;
    inputForm = { tenGV: "", dienThoai: "", ngaySinh: null, email: "", khoaId: khoaData[0]?.id, bangCapId: bangCapData[0]?.id };
    errorMessage = { tenGV: "", dienThoai: "", ngaySinh: "", email: "", khoaId: "", bangCapId: "" };
  }

  async function capNhatGiangVien(params) {
    checkField(updateForm);
    const inputData = {
      ...updateForm,
      ngaySinh: inDateToDate(updateForm.ngaySinh),
    };
    const result = await updateGiangVien(inputData.id, inputData)
      .then((result) => {
        toaster.success({ title: "Cập nhật giảng viên thành công!" });
        return result;
      })
      .catch((r) => {
        toaster.error({ title: "Không thể cập nhật giảng viên!" });
        return [];
      });
    giangVienData = result.data;
    updateForm = { tenGV: "", dienThoai: "", ngaySinh: new Date(), email: "", khoaId: undefined, bangCapId: undefined };
    errorMessage = { tenGV: "", dienThoai: "", ngaySinh: "", email: "", khoaId: "", bangCapId: "" };
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
    <Toaster {toaster}></Toaster>
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
                <td>
                  <input class="input" bind:value={updateForm.tenGV} type="text" placeholder="Tên giảng viên" />
                  <p class="text-red-400">{errorMessage.tenGV}</p>
                </td>
                <td>
                  <input class="input" bind:value={updateForm.dienThoai} type="text" placeholder="Điện thoại" />
                  <p class="text-red-400">{errorMessage.dienThoai}</p>
                </td>
                <td>
                  <input class="input" bind:value={updateForm.ngaySinh} type="date" placeholder="Ngày sinh" />
                  <p class="text-red-400">{errorMessage.ngaySinh}</p>
                </td>
                <td>
                  <input class="input" bind:value={updateForm.email} type="email" placeholder="Email" />
                  <p class="text-red-400">{errorMessage.email}</p>
                </td>
                <td>
                  <select class="select" bind:value={updateForm.bangCapId}>
                    {#each bangCapData as bangCap}
                      <option value={bangCap.id}>{bangCap.tenBC}</option>
                    {/each}
                  </select>
                  <p class="text-red-400">{errorMessage.bangCapId}</p>
                </td>
                <td>
                  <select class="select" bind:value={updateForm.khoaId}>
                    {#each khoaData as khoa}
                      <option value={khoa.id}>{khoa.tenKhoa}</option>
                    {/each}
                  </select>
                  <p class="text-red-400">{errorMessage.khoaId}</p>
                </td>
                <td>
                  <button type="button" onclick={capNhatGiangVien} class="btn preset-filled-primary-500"> Lưu </button>
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
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onclick={() => {
                      updateForm = {
                        ...row,
                        ngaySinh: dateToInDate(row.ngaySinh),
                      };
                    }}>Sửa</button>
                  <!-- nút xóa dữ liệu -->
                  <button
                    type="button"
                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onclick={async () => {
                      giangVienData = (
                        await deleteGiangVien(row.id)
                          .then((result) => {
                            toaster.success({ title: "Xóa giảng viên thành công!" });
                            return result;
                          })
                          .catch((r) => {
                            toaster.error({ title: "Không thể xóa giảng viên!" });
                            return [];
                          })
                      ).data;
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
            <td>
              <input disabled={updateForm.id} class="input" bind:value={inputForm.tenGV} type="text" placeholder="Tên giảng viên" />
              <p class="text-red-400">{errorMessage.tenGV}</p>
            </td>
            <td>
              <input disabled={updateForm.id} class="input" bind:value={inputForm.dienThoai} type="tel" placeholder="Điện thoại" />
              <p class="text-red-400">{updateForm.id != null ? "" : errorMessage.dienThoai}</p>
            </td>
            <td>
              <input disabled={updateForm.id} class="input" bind:value={inputForm.ngaySinh} type="date" placeholder="Ngày sinh" />
              <p class="text-red-400">{updateForm.id != null ? "" : errorMessage.ngaySinh}</p>
            </td>
            <td>
              <input disabled={updateForm.id} class="input" bind:value={inputForm.email} type="email" placeholder="Email" />
              <p class="text-red-400">{updateForm.id != null ? "" : errorMessage.email}</p>
            </td>
            <td>
              <select class="select" bind:value={inputForm.khoaId} placeholder="Khoa">
                {#each khoaData as khoa}
                  <option value={khoa.id}>{khoa.tenKhoa}</option>
                {/each}
              </select>
              <p class="text-red-400">{updateForm.id != null ? "" : errorMessage.bangCapId}</p>
            </td>
            <td>
              <select class="select" bind:value={inputForm.bangCapId} placeholder="Bằng cấp">
                {#each bangCapData as bangCap}
                  <option value={bangCap.id}>{bangCap.tenBC}</option>
                {/each}
              </select>
              <p class="text-red-400">{updateForm.id != null ? "" : errorMessage.khoaId}</p>
            </td>
            <td>
              <!-- nút thêm dữ liệu -->
              <button
                type="button"
                onclick={addGiangVien}
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Thêm
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  {/if}
{/if}
