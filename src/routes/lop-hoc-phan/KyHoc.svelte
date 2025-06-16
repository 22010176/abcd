<script>
  import { createKyHoc, deleteKyHoc, getKyHoc, updateKyHoc } from "$lib/api/kyHoc";
  import { dateToInDate, inDateToDate } from "$lib/utils";
  import { onMount } from "svelte";

  let inputForm = $state({ tenKy: "", ngayBatDau: "", ngayKetThuc: "" });
  let updateForm = $state({ tenKy: "", ngayBatDau: "", ngayKetThuc: "" });
  let hocKyData = $state([]);

  onMount(async () => {
    const result = await getKyHoc();
    hocKyData = result;
  });

  $inspect(hocKyData);
  $inspect(inputForm);

  async function addBangCap(e) {
    e.preventDefault();
    const input = {
      ...inputForm,
      ngayBatDau: inDateToDate(inputForm.ngayBatDau),
      ngayKetThuc: inDateToDate(inputForm.ngayKetThuc),
    };
    const result = await createKyHoc(input);
    hocKyData = result.data;
    inputForm = { tenKy: "", ngayBatDau: "", ngayKetThuc: "" };
  }

  async function capNhatBangCap(params) {
    const result = await updateKyHoc(updateForm.id, updateForm);
    hocKyData = result.data;
    updateForm = { tenKy: "", ngayBatDau: "", ngayKetThuc: "" };
  }
</script>

<div class="p-5">
  <table class="table">
    <thead class="font-bold">
      <tr>
        <th class="font-bold w-15">STT</th>
        <th class="font-bold w-100">Tên kì</th>
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
            <td><input class="input" bind:value={updateForm.tenKy} type="text" placeholder="tên kì" /></td>
            <td><input class="input" bind:value={updateForm.ngayBatDau} type="date" placeholder="ngày bắt đầu" /></td>
            <td><input class="input" bind:value={updateForm.ngayKetThuc} type="date" placeholder="ngày kết thúc" /></td>
            <td>
              <button
                onclick={capNhatBangCap}
                disabled={!Object.values(updateForm).every((i) => !!i)}
                type="button"
                class="btn preset-filled-primary-500">Lưu</button>
            </td>
          {:else}
            <td>{i + 1}</td>
            <td>{row.tenKy}</td>
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
                class="btn preset-filled-primary-500">Sửa</button>
              <button
                onclick={async () => {
                  hocKyData = (await deleteKyHoc(row.id)).data;
                }}
                type="button"
                class="btn preset-filled-primary-500">Xóa</button>
            </td>
          {/if}
        </tr>
      {/each}

      <tr>
        <td></td>
        <td><input disabled={updateForm.id} class="input" bind:value={inputForm.tenKy} type="text" placeholder="tên kì" /></td>
        <td><input disabled={updateForm.id} class="input" bind:value={inputForm.ngayBatDau} type="date" placeholder="ngày bắt đầu" /></td>
        <td><input disabled={updateForm.id} class="input" bind:value={inputForm.ngayKetThuc} type="date" placeholder="ngày kết thúc" /></td>
        <td>
          <button onclick={addBangCap} disabled={!Object.values(inputForm).every((i) => !!i)} type="button" class="btn preset-filled-primary-500"
            >Thêm</button
          ></td>
      </tr>
    </tbody>
  </table>
</div>
