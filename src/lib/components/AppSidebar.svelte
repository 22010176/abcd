<script>
  import { faBookReader, faTable, faUserAlt } from "@fortawesome/free-solid-svg-icons";
  import { Navigation } from "@skeletonlabs/skeleton-svelte";
  import Fa from "svelte-fa";

  let value = $state("files");
  let isExpansed = $state(false);
</script>

<div class="h-screen w-min">
  <Navigation.Rail expanded={false}>
    {#snippet tiles()}
      <Navigation.Tile href="/giang-vien" labelExpanded="Giảng viên">
        <Fa scale="1.5" icon={faUserAlt} />
      </Navigation.Tile>
      <Navigation.Tile href="/lop-hoc-phan" labelExpanded="Lớp học phần">
        <Fa scale="1.5" icon={faBookReader} />
      </Navigation.Tile>
      <Navigation.Tile href="/thong-ke" labelExpanded="Thống kê">
        <Fa scale="1.5" icon={faTable} />
      </Navigation.Tile>
    {/snippet}
  </Navigation.Rail>
</div>
