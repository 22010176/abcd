<script>
  import { createHocPhan, deleteHocPhan, getHocPhan, updateHocPhan } from "$lib/api/hocPhan";
  import { getKhoa } from "$lib/api/khoa";
  import { createToaster, Toaster } from "@skeletonlabs/skeleton-svelte";
  import { onMount } from "svelte";

  const toast = createToaster();
  let inputForm = $state({ khoaId: 0, tenHP: "", heSoHP: 1, soTiet: 1, soTinChi: 0 });
  let updateForm = $state({ id: null, khoaId: 0, tenHP: "", heSoHP: 1, soTiet: 1, soTinChi: 0 });
  let errorMessage = $state({ khoaId: "", tenHP: "", heSoHP: "", soTiet: "", soTinChi: "" });

  let hocPhanData = $state([]);
  let khoaData = $state([]);

  $inspect(hocPhanData);
  onMount(async () => {
    const result = await getHocPhan();
    hocPhanData = result;

    const khoa = await getKhoa();
    khoaData = khoa;
  });
  $inspect(khoaData);

  function checkInput({ khoaId = 0, tenHP = "", heSoHP = 1, soTiet = 1, soTinChi = 0 }) {
    let khoaIdErr = khoaId === 0,
      tenHPErr = tenHP === "",
      heSoHPErr = heSoHP <= 0,
      soTietErr = soTiet <= 0,
      soTinChiErr = soTinChi <= 0;

    errorMessage = {
      khoaId: khoaIdErr ? "Không được để trống" : "",
      tenHP: tenHPErr ? "Không được để trống" : "",
      heSoHP: heSoHPErr ? "Giá trị không hợp lệ!" : "",
      soTiet: soTietErr ? "Giá trị không hợp lệ!" : "",
      soTinChi: soTinChiErr ? "Giá trị không hợp lệ!" : "",
    };
    if (khoaIdErr || tenHPErr || heSoHPErr || soTietErr || soTinChiErr) throw new Error();
  }

  async function addBangCap(e) {
    e.preventDefault();
    checkInput(inputForm);
    const result = await createHocPhan(inputForm)
      .then((result) => {
        toast.success({ title: "Thêm học phần thành công!" });
        return result;
      })
      .catch((r) => {
        toast.error({ title: "Không thể thêm học phần!" });
        return r;
      });
    hocPhanData = result.data;
    inputForm = { tenHP: "", heSoHP: 1, soTiet: 1 };
  }

  async function capNhatBangCap(params) {
    checkInput(updateForm);
    const result = await updateHocPhan(updateForm.id, updateForm)
      .then((result) => {
        toast.success({ title: "Cập nhật học phần thành công!" });
        return result;
      })
      .catch((r) => {
        toast.error({ title: "Không thể cập nhật học phần!" });
        return r;
      });
    hocPhanData = result.data;
    updateForm = { tenHP: "", heSoHP: 1, soTiet: 1 };
  }
</script>

<Toaster toaster={toast} />
<div class="p-5">
  <table class="table">
    <thead class="font-bold">
      <tr>
        <th class="font-bold w-15">STT</th>
        <th class="font-bold w-150">Tên học phần</th>
        <th class="font-bold w-150">Khoa</th>
        <th class="font-bold w-50">Hệ số học phần</th>
        <th class="font-bold w-50">Số tiết</th>
        <th class="font-bold w-50">Số tín chỉ</th>
        <th class="text-right"></th>
      </tr>
    </thead>
    <tbody class="[&>tr]:hover:preset-tonal-primary">
      {#each hocPhanData as row, i (row.id)}
        <tr>
          {#if row.id == updateForm.id}
            <td></td>
            <td>
              <input class="input" bind:value={updateForm.tenHP} type="text" placeholder="tên học phần" />
              <p class="text-red-500">{errorMessage.tenHP}</p>
            </td>
            <td>
              <select class="select" bind:value={updateForm.khoaId}>
                {#each khoaData as khoa}
                  <option value={khoa.id}>{khoa.tenKhoa}</option>
                {/each}
              </select>
              <p class="text-red-500">{errorMessage.khoaId}</p>
            </td>
            <td>
              <input class="input" bind:value={updateForm.heSoHP} type="number" step="0.1" placeholder="hệ số" />
              <p class="text-red-500">{errorMessage.heSoHP}</p>
            </td>
            <td>
              <input class="input" bind:value={updateForm.soTiet} type="number" placeholder="số tiết" />
              <p class="text-red-500">{errorMessage.soTiet}</p>
            </td>
            <td>
              <input class="input" bind:value={updateForm.soTinChi} type="number" placeholder="số tiết" />
              <p class="text-red-500">{errorMessage.soTinChi}</p>
            </td>
            <td>
              <button onclick={capNhatBangCap} type="button" class="btn preset-filled-primary-500">Lưu</button>
            </td>
          {:else}
            <td>{i + 1}</td>
            <td>{row.tenHP}</td>
            <td>{row.tenKhoa}</td>
            <td>{row.heSoHP}</td>
            <td>{row.soTiet}</td>
            <td>{row.soTinChi}</td>

            <td>
              <button
                onclick={() => {
                  updateForm = { ...row };
                }}
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Sửa
              </button>
              <button
                onclick={async () => {
                  hocPhanData = (
                    await deleteHocPhan(row.id)
                      .then((result) => {
                        toast.success({ title: "Xóa thành công!" });
                        return result;
                      })
                      .catch((r) => {
                        toast.error({ title: "Không thể xóa!" });
                        return [];
                      })
                  ).data;
                }}
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Xóa
              </button>
            </td>
          {/if}
        </tr>
      {/each}

      <tr>
        <td></td>
        <td>
          <input class="input" bind:value={inputForm.tenHP} type="text" placeholder="tên bằng cấp" />
          <p class="text-red-500">{updateForm.id ? "" : errorMessage.tenHP}</p>
        </td>
        <td>
          <select class="select" bind:value={inputForm.khoaId}>
            {#each khoaData as khoa}
              <option value={khoa.id}>{khoa.tenKhoa}</option>
            {/each}
          </select>
          <p class="text-red-500">{updateForm.id ? "" : errorMessage.khoaId}</p>
        </td>
        <td>
          <input class="input" bind:value={inputForm.heSoHP} type="number" step="0.1" placeholder="hệ số" />
          <p class="text-red-500">{updateForm.id ? "" : errorMessage.heSoHP}</p>
        </td>
        <td>
          <input class="input" bind:value={inputForm.soTiet} type="number" placeholder="số tiết" />
          <p class="text-red-500">{updateForm.id ? "" : errorMessage.soTiet}</p>
        </td>
        <td>
          <input class="input" bind:value={inputForm.soTinChi} type="number" placeholder="số tín chỉ" />
          <p class="text-red-500">{updateForm.id ? "" : errorMessage.soTinChi}</p>
        </td>
        <td>
          <button
            onclick={addBangCap}
            type="button"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Thêm
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
