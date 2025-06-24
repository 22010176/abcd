<script>
  import { createBangCap, deleteBangCap, getBangCap, updateBangCap } from "$lib/api/bangCap";
  import { createToaster, Toaster } from "@skeletonlabs/skeleton-svelte";
  import { onMount } from "svelte";

  const toaster = createToaster();
  let inputForm = $state({ tenBC: "", tenVietTat: "", heSo: 1 });
  let updateForm = $state({ tenBC: "", tenVietTat: "", heSo: 1 });
  let bangCapData = $state([]);
  let errorMessage = $state({ tenBC: "", tenVietTat: "", heSo: "" });

  onMount(async () => {
    const result = await getBangCap();
    bangCapData = result;
  });

  $inspect(bangCapData);
  $inspect(inputForm);

  async function addBangCap(e) {
    e.preventDefault();
    let heSoErr = inputForm.heSo <= 0,
      tenBCErr = inputForm.tenBC === "",
      tenVietTatErr = inputForm.tenVietTat === "";

    errorMessage = {
      heSo: heSoErr ? "Phải lớn hơn 0" : "",
      tenBC: tenBCErr ? "Không được để trống" : "",
      tenVietTat: tenVietTatErr ? "Không được để trống" : "",
    };
    if (heSoErr || tenBCErr || tenVietTatErr) return;

    const result = await createBangCap(inputForm)
      .then((result) => {
        toaster.success({ title: "Thêm bằng cấp thành công!" });
        return result;
      })
      .catch((r) => {
        toaster.error({ title: "Không thể thêm bằng cấp!" });
        return [];
      });
    bangCapData = result.data;
    inputForm = { tenBC: "", tenVietTat: "", heSo: 1 };
    errorMessage = { tenBC: "", tenVietTat: "", heSo: "" };
  }

  async function capNhatBangCap(params) {
    let heSoErr = updateForm.heSo <= 0,
      tenBCErr = updateForm.tenBC === "",
      tenVietTatErr = updateForm.tenVietTat === "";

    errorMessage = {
      heSo: heSoErr ? "Phải lớn hơn 0" : "",
      tenBC: tenBCErr ? "Không được để trống" : "",
      tenVietTat: tenVietTatErr ? "Không được để trống" : "",
    };
    if (heSoErr || tenBCErr || tenVietTatErr) return;

    const result = await updateBangCap(updateForm.id, updateForm)
      .then((result) => {
        toaster.success({ title: "Cập nhật bằng cấp thành công!" });
        return result;
      })
      .catch((r) => {
        toaster.error({ title: "Không thể cập nhật bằng cấp!" });
        return [];
      });
    bangCapData = result.data;
    updateForm = { tenBC: "", tenVietTat: "", heSo: 1 };
    errorMessage = { tenBC: "", tenVietTat: "", heSo: "" };
  }
</script>

<Toaster {toaster} />
<div class="p-5">
  <table class="table">
    <thead class="font-bold">
      <tr>
        <th class="font-bold w-15">STT</th>
        <th class="font-bold w-150">Tên bằng cấp</th>
        <th class="font-bold w-80">Tên viết tắt</th>
        <th class="font-bold w-50">Hệ số</th>
        <!-- <th class="text-right">Mô tả</th> -->
        <th class="text-right w-30"></th>
      </tr>
    </thead>
    <tbody class="[&>tr]:hover:preset-tonal-primary">
      {#each bangCapData as row, i (row.id)}
        <tr>
          {#if row.id == updateForm.id}
            <td></td>
            <td>
              <input class="input" bind:value={updateForm.tenBC} type="text" placeholder="tên bằng cấp" />
              <p class="text-red-400">{errorMessage.tenBC}</p>
            </td>
            <td>
              <input class="input" bind:value={updateForm.tenVietTat} type="text" placeholder="tên viết tắt" />
              <p class="text-red-400">{errorMessage.tenVietTat}</p>
            </td>
            <td>
              <input class="input" bind:value={updateForm.heSo} type="number" placeholder="hệ số" />
              <p class="text-red-400">{errorMessage.heSo}</p>
            </td>
            <td>
              <button onclick={capNhatBangCap} type="button" class="btn preset-filled-primary-500">Lưu</button>
            </td>
          {:else}
            <td>{i + 1}</td>
            <td>{row.tenBC}</td>
            <td>{row.tenVietTat}</td>
            <td>{row.heSo}</td>

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
                  bangCapData = (
                    await deleteBangCap(row.id)
                      .then((result) => {
                        toaster.success({ title: "Xóa thành công!" });
                        return result;
                      })
                      .catch((r) => {
                        toaster.error({ title: "Không thể xóa!" });
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
          <input disabled={updateForm.id} class="input" bind:value={inputForm.tenBC} type="text" placeholder="tên bằng cấp" />
          <p class="text-red-400">{updateForm.id ? "" : errorMessage.tenBC}</p>
        </td>
        <td>
          <input disabled={updateForm.id} class="input" bind:value={inputForm.tenVietTat} type="text" placeholder="tên viết tắt" />
          <p class="text-red-400">{updateForm.id ? "" : errorMessage.tenVietTat}</p>
        </td>
        <td>
          <input disabled={updateForm.id} class="input" bind:value={inputForm.heSo} type="number" placeholder="hệ số" />
          <p class="text-red-400">{updateForm.id ? "" : errorMessage.heSo}</p>
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
