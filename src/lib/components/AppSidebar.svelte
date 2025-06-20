<script>
  import { afterNavigate } from "$app/navigation";
  import { page } from "$app/state";
  import { faBookReader, faMoneyBill1Wave, faTable, faUserAlt } from "@fortawesome/free-solid-svg-icons";
  import { Navigation } from "@skeletonlabs/skeleton-svelte";
  import Fa from "svelte-fa";

  let url = $state(page.url.pathname);
  afterNavigate(function () {
    url = page.url.pathname;
  });

  let value = $state("files");
  let isExpansed = $state(false);
</script>

<div class="h-screen w-min">
  <Navigation.Rail expanded={false}>
    {#snippet tiles()}
      <Navigation.Tile href="/giang-vien" labelExpanded="Giảng viên">
        <Fa scale="1.5" icon={faUserAlt} color={url.includes("giang-vien") ? "black" : "#808080"} />
      </Navigation.Tile>
      <Navigation.Tile href="/lop-hoc-phan" labelExpanded="Lớp học phần">
        <Fa scale="1.5" icon={faBookReader} color={url.includes("lop-hoc-phan") ? "black" : "#808080"} />
      </Navigation.Tile>
      <Navigation.Tile href="/tinh-tien-day" labelExpanded="Tính tiền dạy">
        <Fa scale="1.5" icon={faMoneyBill1Wave} color={url.includes("tinh-tien-day") ? "black" : "#808080"} />
      </Navigation.Tile>
      <Navigation.Tile href="/thong-ke" labelExpanded="Thống kê">
        <Fa scale="1.5" icon={faTable} color={url.includes("thong-ke") ? "black" : "#808080"} />
      </Navigation.Tile>
    {/snippet}
  </Navigation.Rail>
</div>
