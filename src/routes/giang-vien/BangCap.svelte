<script>
  import { createBangCap, deleteBangCap, getBangCap, updateBangCap } from "$lib/api/bangCap";
  import { onMount } from "svelte";

  let inputForm = $state({ tenBC: "", tenVietTat: "", heSo: 1 });
  let updateForm = $state({ tenBC: "", tenVietTat: "", heSo: 1 });
  let bangCapData = $state([]);

  onMount(async () => {
    const result = await getBangCap();
    bangCapData = result;
  });

  $inspect(bangCapData);
  $inspect(inputForm);

  const tableData = [
    { position: "0", name: "Iron", symbol: "Fe", atomic_no: "26" },
    { position: "1", name: "Rhodium", symbol: "Rh", atomic_no: "45" },
    { position: "2", name: "Iodine", symbol: "I", atomic_no: "53" },
    { position: "3", name: "Radon", symbol: "Rn", atomic_no: "86" },
    { position: "4", name: "Technetium", symbol: "Tc", atomic_no: "43" },
  ];

  async function addBangCap(e) {
    e.preventDefault();

    const result = await createBangCap(inputForm);
    bangCapData = result.data;
    inputForm = { tenBC: "", tenVietTat: "", heSo: 1 };
  }

  async function capNhatBangCap(params) {
    const result = await updateBangCap(updateForm.id, updateForm);
    bangCapData = result.data;
    updateForm = { tenBC: "", tenVietTat: "", heSo: 1 };
  }
</script>

<div class="p-5">
  <table class="table">
    <thead class="font-bold">
      <tr>
        <th class="font-bold w-15">STT</th>
        <th class="font-bold w-200">Tên bằng cấp</th>
        <th class="font-bold w-50">Tên viết tắt</th>
        <th class="font-bold w-50">Hệ số</th>
        <th class="text-right">Mô tả</th>
        <th class="text-right"></th>
      </tr>
    </thead>
    <tbody class="[&>tr]:hover:preset-tonal-primary">
      {#each bangCapData as row, i (row.id)}
        <tr>
          {#if row.id == updateForm.id}
            <td></td>
            <td><input class="input" bind:value={updateForm.tenBC} type="text" placeholder="tên bằng cấp" /></td>
            <td><input class="input" bind:value={updateForm.tenVietTat} type="text" placeholder="tên viết tắt" /></td>
            <td><input class="input" bind:value={updateForm.heSo} type="number" placeholder="hệ số" /></td>
            <td>
              <button onclick={capNhatBangCap} disabled={!Object.values(updateForm).every((i) => !!i)} type="button" class="btn preset-filled-primary-500">Lưu</button>
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
                class="btn preset-filled-primary-500">Sửa</button>
              <button
                onclick={async () => {
                  bangCapData = (await deleteBangCap(row.id)).data;
                }}
                type="button"
                class="btn preset-filled-primary-500">Xóa</button>
            </td>
          {/if}
        </tr>
      {/each}

      <tr>
        <td></td>
        <td><input disabled={updateForm.id} class="input" bind:value={inputForm.tenBC} type="text" placeholder="tên bằng cấp" /></td>
        <td><input disabled={updateForm.id} class="input" bind:value={inputForm.tenVietTat} type="text" placeholder="tên viết tắt" /></td>
        <td><input disabled={updateForm.id} class="input" bind:value={inputForm.heSo} type="number" placeholder="hệ số" /></td>
        <td> <button onclick={addBangCap} disabled={!Object.values(inputForm).every((i) => !!i)} type="button" class="btn preset-filled-primary-500">Thêm</button></td>
      </tr>
    </tbody>
  </table>
</div>
