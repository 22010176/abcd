<script>
  import { getBangCap } from "$lib/api/bangCap";
  import { onMount } from "svelte";
  let bangCapData = $state([]);

  $onMount(async function () {
    bangCapData = await getBangCap();
    console.log(bangCapData);
  });
</script>

<h1 class="m-5 text-2xl font-bold">Thống kê giảng viên</h1>

<table class="table">
  <thead>
    <tr>
      <td>STT</td>
      <td>Tên khoa</td>
      <td>Số giảng viên nam</td>
      <td>Số giảng viên nữ</td>
      <td>Tống số giảng viên</td>
    </tr>
  </thead>
</table>
