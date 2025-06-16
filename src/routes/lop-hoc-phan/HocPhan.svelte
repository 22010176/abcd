<script>
  import { deleteBangCap, updateBangCap } from "$lib/api/bangCap";
  import { createHocPhan, deleteHocPhan, getHocPhan, updateHocPhan } from "$lib/api/hocPhan";
  import { onMount } from "svelte";

  let inputForm = $state({ tenHP: "", heSoHP: 1, soTiet: 1 });
  let updateForm = $state({ tenHP: "", heSoHP: 1, soTiet: 1 });
  let hocPhanData = $state([]);

  $inspect(inputForm);
  onMount(async () => {
    const result = await getHocPhan();
    hocPhanData = result;
  });

  async function addBangCap(e) {
    e.preventDefault();

    const result = await createHocPhan(inputForm);
    hocPhanData = result.data;
    inputForm = { tenHP: "", heSoHP: 1, soTiet: 1 };
  }

  async function capNhatBangCap(params) {
    const result = await updateHocPhan(updateForm.id, updateForm);
    hocPhanData = result.data;
    updateForm = { tenHP: "", heSoHP: 1, soTiet: 1 };
  }
</script>

<div class="p-5">
  <table class="table">
    <thead class="font-bold">
      <tr>
        <th class="font-bold w-15">STT</th>
        <th class="font-bold w-150">Tên học phần</th>
        <th class="font-bold w-50">Hệ số học phần</th>
        <th class="font-bold w-50">Số tiết</th>
        <th class="text-right"></th>
      </tr>
    </thead>
    <tbody class="[&>tr]:hover:preset-tonal-primary">
      {#each hocPhanData as row, i (row.id)}
        <tr>
          {#if row.id == updateForm.id}
            <td></td>
            <td><input class="input" bind:value={updateForm.tenHP} type="text" placeholder="tên bằng cấp" /></td>
            <td><input class="input" bind:value={updateForm.heSoHP} type="number" step="0.1" placeholder="hệ số" /></td>
            <td><input class="input" bind:value={updateForm.soTiet} type="number" placeholder="số tiết" /></td>
            <td>
              <button
                onclick={capNhatBangCap}
                disabled={!Object.values(updateForm).every((i) => !!i)}
                type="button"
                class="btn preset-filled-primary-500">Lưu</button>
            </td>
          {:else}
            <td>{i + 1}</td>
            <td>{row.tenHP}</td>
            <td>{row.heSoHP}</td>
            <td>{row.soTiet}</td>

            <td>
              <button
                onclick={() => {
                  updateForm = { ...row };
                }}
                type="button"
                class="btn preset-filled-primary-500">Sửa</button>
              <button
                onclick={async () => {
                  hocPhanData = (await deleteHocPhan(row.id)).data;
                }}
                type="button"
                class="btn preset-filled-primary-500">Xóa</button>
            </td>
          {/if}
        </tr>
      {/each}

      <tr>
        <td></td>
        <td><input class="input" bind:value={inputForm.tenHP} type="text" placeholder="tên bằng cấp" /></td>
        <td><input class="input" bind:value={inputForm.heSoHP} type="number" step="0.1" placeholder="hệ số" /></td>
        <td><input class="input" bind:value={inputForm.soTiet} type="number" placeholder="số tiết" /></td>
        <td>
          <button onclick={addBangCap} disabled={!Object.values(inputForm).every((i) => !!i)} type="button" class="btn preset-filled-primary-500">
            Thêm
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
