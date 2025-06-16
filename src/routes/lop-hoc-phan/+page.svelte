<script>
  import { Tabs } from "@skeletonlabs/skeleton-svelte";
  import BangCap from "./BangCap.svelte";
  import Khoa from "./Khoa.svelte";
  import GiangVien from "./GiangVien.svelte";

  let group = $state("bangCap");

  const lorem =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum veniam reprehenderit eum, reiciendis obcaecati, excepturi nemo ipsa fugit suscipit autem vitae numquam et cumque praesentium vero eos minus itaque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum veniam reprehenderit eum, reiciendis obcaecati, excepturi nemo.";
</script>

<Tabs value={group} onValueChange={(e) => (group = e.value)}>
  {#snippet list()}
    <Tabs.Control value="bangCap">Học phần</Tabs.Control>
    <Tabs.Control value="khoa">Học kì</Tabs.Control>
    <Tabs.Control value="giangVien">Lớp học phần</Tabs.Control>
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
  {/snippet}
</Tabs>
