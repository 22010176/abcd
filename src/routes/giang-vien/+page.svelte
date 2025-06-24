<script>
  import { Tabs } from "@skeletonlabs/skeleton-svelte";
  import BangCap from "./BangCap.svelte";
  import Khoa from "./Khoa.svelte";
  import GiangVien from "./GiangVien.svelte";
  import ThongKe from "./ThongKe.svelte";

  let group = $state("bangCap");

  const lorem =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum veniam reprehenderit eum, reiciendis obcaecati, excepturi nemo ipsa fugit suscipit autem vitae numquam et cumque praesentium vero eos minus itaque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum veniam reprehenderit eum, reiciendis obcaecati, excepturi nemo.";
</script>

<Tabs value={group} onValueChange={(e) => (group = e.value)}>
  {#snippet list()}
    <Tabs.Control value="bangCap">Bằng cấp</Tabs.Control>
    <Tabs.Control value="khoa">Khoa</Tabs.Control>
    <Tabs.Control value="giangVien">Giảng viên</Tabs.Control>
    <!-- <Tabs.Control value="thongke">Thống kê</Tabs.Control> -->
  {/snippet}
  {#snippet content()}
    <Tabs.Panel value="bangCap">
      <BangCap active={group == "bangCap"} />
    </Tabs.Panel>
    <Tabs.Panel value="khoa">
      <Khoa active={group == "khoa"} />
    </Tabs.Panel>
    <Tabs.Panel value="giangVien">
      <GiangVien active={group == "giangVien"} />
    </Tabs.Panel>
    <!-- <Tabs.Panel value="thongke">
      <ThongKe active={group == "thongke"} />
    </Tabs.Panel> -->
  {/snippet}
</Tabs>
