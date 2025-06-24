<script>
  import { createKyHoc, deleteKyHoc, getKyHoc, updateKyHoc } from "$lib/api/kyHoc";
  import { dateToInDate, inDateToDate } from "$lib/utils";
  import { createToaster, Toaster } from "@skeletonlabs/skeleton-svelte";
  import { onMount } from "svelte";

  let inputForm = $state({ tenKy: "", namHoc: new Date().getFullYear(), ngayBatDau: "", ngayKetThuc: "" });
  let updateForm = $state({ tenKy: "", namHoc: "", ngayBatDau: "", ngayKetThuc: "" });
  let errorMessage = $state({ tenKy: "", namHoc: "", ngayBatDau: "", ngayKetThuc: "" });
  let hocKyData = $state([]);

  const toaster = createToaster();
  onMount(async () => {
    const result = await getKyHoc();
    hocKyData = result;
  });

  $inspect(hocKyData);
  $inspect(inputForm);

  function checkInput({ tenKy = "", namHoc = "", ngayBatDau = "", ngayKetThuc = "" }) {
    let tenKyErr = tenKy === "",
      namHocErr = namHoc === "",
      ngayBatDauErr = ngayBatDau === "",
      ngayKetThucErr = ngayKetThuc === "";

    errorMessage = {
      tenKy: tenKyErr ? "Không được để trống" : "",
      namHoc: namHocErr ? "Không được để trống" : "",
      ngayBatDau: ngayBatDauErr ? "Không được để trống" : "",
      ngayKetThuc: ngayKetThucErr ? "Không được để trống" : "",
    };

    if (ngayBatDauErr || ngayKetThucErr) throw new Error();
    if (ngayBatDau > ngayKetThuc) throw new Error();
    if (tenKyErr || namHocErr) throw new Error();
  }

  async function addBangCap(e) {
    e.preventDefault();
    checkInput(inputForm);
    const input = {
      ...inputForm,
      ngayBatDau: inDateToDate(inputForm.ngayBatDau),
      ngayKetThuc: inDateToDate(inputForm.ngayKetThuc),
    };
    const result = await createKyHoc(input)
      .then((result) => {
        toaster.success({ title: "Thêm kì học thành công!" });
        return result;
      })
      .catch((r) => {
        toaster.error({ title: "Không thể thêm kì học!" });
        return [];
      });
    hocKyData = result.data;
    inputForm = { tenKy: "", namHoc: new Date().getFullYear(), ngayBatDau: "", ngayKetThuc: "" };
  }

  async function capNhatBangCap(params) {
    checkInput(updateForm);
    const result = await updateKyHoc(updateForm.id, updateForm);
    hocKyData = result.data;
    updateForm = { tenKy: "", ngayBatDau: "", ngayKetThuc: "" };
  }
</script>

<Toaster {toaster} />
<div class="p-5">
  <table class="table">
    <thead class="font-bold">
      <tr>
        <th class="font-bold w-15">STT</th>
        <th class="font-bold w-100">Tên kì</th>
        <th class="font-bold w-50">Năm học</th>
        <th class="font-bold w-50">Thời gian bắt đầu</th>
        <th class="text-right w-100">Thời gian kết thúc</th>
        <th class="text-right w-50"></th>
      </tr>
    </thead>
    <tbody class="[&>tr]:hover:preset-tonal-primary">
      {#each hocKyData as row, i (row.id)}
        <tr>
          {#if row.id == updateForm.id}
            <td></td>
            <td>
              <input class="input" bind:value={updateForm.tenKy} type="text" placeholder="tên kì" />
              <p class="text-red-400">{errorMessage.tenKy}</p>
            </td>
            <td>
              <input class="input" bind:value={updateForm.namHoc} type="text" placeholder="năm học" />
              <p class="text-red-400">{errorMessage.namHoc}</p>
            </td>
            <td>
              <input class="input" bind:value={updateForm.ngayBatDau} type="date" placeholder="ngày bắt đầu" />
              <p class="text-red-400">{errorMessage.ngayBatDau}</p>
            </td>
            <td>
              <input class="input" bind:value={updateForm.ngayKetThuc} type="date" placeholder="ngày kết thúc" />
              <p class="text-red-400">{errorMessage.ngayKetThuc}</p>
            </td>
            <td>
              <button onclick={capNhatBangCap} type="button" class="btn preset-filled-primary-500">Lưu</button>
            </td>
          {:else}
            <td>{i + 1}</td>
            <td>{row.tenKy}</td>
            <td>{row.namHoc}</td>
            <td>{new Date(row.ngayBatDau).toLocaleDateString()}</td>
            <td>{new Date(row.ngayKetThuc).toLocaleDateString()}</td>
            <td>
              <button
                onclick={() => {
                  updateForm = {
                    ...row,
                    ngayBatDau: dateToInDate(row.ngayBatDau),
                    ngayKetThuc: dateToInDate(row.ngayKetThuc),
                  };
                }}
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Sửa
              </button>
              <button
                onclick={async () => {
                  hocKyData = (
                    await deleteKyHoc(row.id)
                      .then((result) => {
                        toaster.success({ title: "Xóa kì học thành công!" });
                        return result;
                      })
                      .catch((r) => {
                        toaster.error({ title: "Không thể xóa kì học!" });
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
          <input disabled={updateForm.id} class="input" bind:value={inputForm.tenKy} type="text" placeholder="tên kì" />
          <p class="text-red-400">{updateForm.id ? "" : errorMessage.tenKy}</p>
        </td>
        <td>
          <input disabled={updateForm.id} type="number" class="input" bind:value={inputForm.namHoc} placeholder="tên kì" />
          <p class="text-red-400">{updateForm.id ? "" : errorMessage.namHoc}</p>
        </td>
        <td>
          <input disabled={updateForm.id} class="input" bind:value={inputForm.ngayBatDau} type="date" placeholder="ngày bắt đầu" />
          <p class="text-red-400">{updateForm.id ? "" : errorMessage.ngayBatDau}</p>
        </td>
        <td>
          <input disabled={updateForm.id} class="input" bind:value={inputForm.ngayKetThuc} type="date" placeholder="ngày kết thúc" />
          <p class="text-red-400">{updateForm.id ? "" : errorMessage.ngayKetThuc}</p>
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
