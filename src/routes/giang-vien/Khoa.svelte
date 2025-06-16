<script>
  import { createBangCap, deleteBangCap, getBangCap, updateBangCap } from "$lib/api/bangCap";
  import { createKhoa, deleteKhoa, getKhoa, updateKhoa } from "$lib/api/khoa";
  import { onMount } from "svelte";

  let inputForm = $state({ tenKhoa: "", tenVietTat: "", moTaNhiemVu: "" });
  let updateForm = $state({ tenKhoa: "", tenVietTat: "", moTaNhiemVu: "" });
  let bangCapData = $state([]);

  onMount(async () => {
    const result = await getKhoa();
    bangCapData = result;
  });

  $inspect(bangCapData);
  $inspect(inputForm);

  async function addBangCap(e) {
    e.preventDefault();

    const result = await createKhoa(inputForm);
    bangCapData = result.data;
    inputForm = { tenKhoa: "", tenVietTat: "", heSo: 1 };
  }

  async function capNhatBangCap(params) {
    const result = await updateKhoa(updateForm.id, updateForm);
    bangCapData = result.data;
    updateForm = { tenKhoa: "", tenVietTat: "", moTaNhiemVu: "" };
  }
</script>

<div class="p-5">
  <table class="table">
    <thead class="font-bold">
      <tr>
        <th class="font-bold w-15">STT</th>
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
            <td><input class="input" bind:value={updateForm.tenKhoa} type="text" placeholder="tên bằng cấp" /></td>
            <td><input class="input" bind:value={updateForm.tenVietTat} type="text" placeholder="tên viết tắt" /></td>
            <td><input class="input" bind:value={updateForm.moTaNhiemVu} type="text" placeholder="mô tả" /></td>
            <td>
              <button
                onclick={capNhatBangCap}
                disabled={!Object.values(updateForm).every((i) => !!i)}
                type="button"
                class="btn preset-filled-primary-500">Lưu</button>
            </td>
          {:else}
            <td>{i + 1}</td>
            <td>{row.tenKhoa}</td>
            <td>{row.tenVietTat}</td>
            <td>{row.moTaNhiemVu}</td>

            <td>
              <button
                onclick={() => {
                  updateForm = { ...row };
                }}
                type="button"
                class="btn preset-filled-primary-500">Sửa</button>
              <button
                onclick={async () => {
                  bangCapData = (await deleteKhoa(row.id)).data;
                }}
                type="button"
                class="btn preset-filled-primary-500">Xóa</button>
            </td>
          {/if}
        </tr>
      {/each}

      <tr>
        <td></td>
        <td><input disabled={updateForm.id} class="input" bind:value={inputForm.tenKhoa} type="text" placeholder="tên khoa" /></td>
        <td><input disabled={updateForm.id} class="input" bind:value={inputForm.tenVietTat} type="text" placeholder="tên viết tắt" /></td>
        <td><input disabled={updateForm.id} class="input" bind:value={inputForm.moTaNhiemVu} type="text" placeholder="mô tả" /></td>
        <td>
          <button onclick={addBangCap} disabled={!Object.values(inputForm).every((i) => !!i)} type="button" class="btn preset-filled-primary-500"
            >Thêm</button
          ></td>
      </tr>
    </tbody>
  </table>
</div>
