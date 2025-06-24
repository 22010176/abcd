<script>
  import { createBangCap, deleteBangCap, getBangCap, updateBangCap } from "$lib/api/bangCap";
  import { createKhoa, deleteKhoa, getKhoa, updateKhoa } from "$lib/api/khoa";
  import { createToaster, Toaster } from "@skeletonlabs/skeleton-svelte";
  import { onMount } from "svelte";

  const toaster = createToaster();
  let bangCapData = $state([]);
  let inputForm = $state({ maKhoa: "", tenKhoa: "", tenVietTat: "", moTaNhiemVu: "" });
  let updateForm = $state({ id: "", maKhoa: "", tenKhoa: "", tenVietTat: "", moTaNhiemVu: "" });
  let errorMessage = $state({ maKhoa: "", tenKhoa: "", tenVietTat: "", moTaNhiemVu: "" });
  onMount(async () => {
    const result = await getKhoa();
    bangCapData = result;
  });

  function CheckError({ id, maKhoa = "", tenKhoa = "", tenVietTat = "", moTaNhiemVu = "" }) {
    console.log(id);
    const maKhoaErr = maKhoa === "",
      tenKhoaErr = tenKhoa === "",
      tenVietTatErr = tenVietTat === "",
      moTaNhiemVuErr = moTaNhiemVu === "",
      duplicateErr = typeof id === "undefined" && bangCapData.some((i) => i.maKhoa === maKhoa);

    errorMessage = {
      maKhoa: maKhoaErr ? "Không được để trống" : duplicateErr ? "Mã khoa đã tồn tại" : "",
      tenKhoa: tenKhoaErr ? "Không được để trống" : "",
      tenVietTat: tenVietTatErr ? "Không được để trống" : "",
      moTaNhiemVu: moTaNhiemVuErr ? "Không được để trống" : "",
    };
    if (maKhoaErr || tenKhoaErr || tenVietTatErr || moTaNhiemVuErr || duplicateErr) throw new Error();
  }

  async function addBangCap(e) {
    e.preventDefault();
    CheckError(inputForm);
    const result = await createKhoa(inputForm)
      .then((result) => {
        toaster.success({ title: "Thêm khoa thành công!" });
        return result;
      })
      .catch((r) => {
        toaster.error({ title: "Không thể thêm khoa!" });
        return r;
      });
    bangCapData = result.data;
    inputForm = { tenKhoa: "", tenVietTat: "", heSo: 1 };
  }

  async function capNhatBangCap(params) {
    CheckError(updateForm);
    const result = await updateKhoa(updateForm.id, updateForm)
      .then((result) => {
        toaster.success({ title: "Cập nhật khoa thành công!" });
        return result;
      })
      .catch((r) => {
        toaster.error({ title: "Không thể cập nhật khoa!" });
        return r;
      });
    bangCapData = result.data;
    updateForm = { maKhoa: "", tenKhoa: "", tenVietTat: "", moTaNhiemVu: "" };
  }
</script>

<Toaster {toaster}></Toaster>
<div class="p-5">
  <table class="table">
    <thead class="font-bold">
      <tr>
        <th class="font-bold w-15">STT</th>
        <th class="font-bold w-100">Mã khoa</th>
        <th class="font-bold w-100">Tên khoa</th>
        <th class="font-bold w-50">Tên viết tắt</th>
        <th class="text-right w-150">Mô tả</th>
        <th class="text-right w-50"></th>
      </tr>
    </thead>
    <tbody class="[&>tr]:hover:preset-tonal-primary">
      {#each bangCapData as row, i (row.id)}
        <tr>
          {#if row.id == updateForm.id}
            <td></td>
            <td>
              <input disabled class="input" bind:value={updateForm.maKhoa} type="text" placeholder="tên khoa" />
              <p class="text-red-500">{errorMessage.maKhoa}</p>
            </td>
            <td>
              <input class="input" bind:value={updateForm.tenKhoa} type="text" placeholder="tên khoa" />
              <p class="text-red-500">{errorMessage.tenKhoa}</p>
            </td>
            <td>
              <input class="input" bind:value={updateForm.tenVietTat} type="text" placeholder="tên viết tắt" />
              <p class="text-red-500">{errorMessage.tenVietTat}</p>
            </td>
            <td>
              <input class="input" bind:value={updateForm.moTaNhiemVu} type="text" placeholder="mô tả" />
              <p class="text-red-500">{errorMessage.moTaNhiemVu}</p>
            </td>
            <td>
              <button onclick={capNhatBangCap} type="button" class="btn preset-filled-primary-500">Lưu</button>
            </td>
          {:else}
            <td>{i + 1}</td>
            <td>{row.maKhoa}</td>
            <td>{row.tenKhoa}</td>
            <td>{row.tenVietTat}</td>
            <td>{row.moTaNhiemVu}</td>

            <td>
              <button
                onclick={() => (updateForm = { ...row })}
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Sửa
              </button>
              <button
                onclick={async () => {
                  bangCapData = (
                    await deleteKhoa(row.id)
                      .then((data) => {
                        toaster.success({ title: "Xóa thành công!" });
                        return data;
                      })
                      .catch((r) => {
                        toaster.error({ title: "Không thể xóa!" });
                        return r;
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
          <input disabled={updateForm.id} class="input" bind:value={inputForm.maKhoa} type="text" placeholder="mã khoa" />
          <p class="text-red-500">{updateForm.id ? "" : errorMessage.maKhoa}</p>
        </td>
        <td>
          <input disabled={updateForm.id} class="input" bind:value={inputForm.tenKhoa} type="text" placeholder="tên khoa" />
          <p class="text-red-500">{updateForm.id ? "" : errorMessage.tenKhoa}</p>
        </td>
        <td>
          <input disabled={updateForm.id} class="input" bind:value={inputForm.tenVietTat} type="text" placeholder="tên viết tắt" />
          <p class="text-red-500">{updateForm.id ? "" : errorMessage.tenVietTat}</p>
        </td>
        <td>
          <input disabled={updateForm.id} class="input" bind:value={inputForm.moTaNhiemVu} type="text" placeholder="mô tả" />
          <p class="text-red-500">{updateForm.id ? "" : errorMessage.moTaNhiemVu}</p>
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
