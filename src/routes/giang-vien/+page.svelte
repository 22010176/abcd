<script>
  import { Tabs } from "@skeletonlabs/skeleton-svelte";
  import BangCap from "./BangCap.svelte";

  let group = $state("bangCap");

  const lorem =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum veniam reprehenderit eum, reiciendis obcaecati, excepturi nemo ipsa fugit suscipit autem vitae numquam et cumque praesentium vero eos minus itaque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum veniam reprehenderit eum, reiciendis obcaecati, excepturi nemo.";
</script>

<Tabs value={group} onValueChange={(e) => (group = e.value)}>
  {#snippet list()}
    <Tabs.Control value="bangCap">Bằng cấp</Tabs.Control>
    <Tabs.Control value="khoa">Khoa</Tabs.Control>
    <Tabs.Control value="giangVien">Giảng viên</Tabs.Control>
  {/snippet}
  {#snippet content()}
    <Tabs.Panel value="bangCap">
      <BangCap />
    </Tabs.Panel>
    <Tabs.Panel value="khoa">Boat Panel - {lorem}</Tabs.Panel>
    <Tabs.Panel value="giangVien">Car Panel - {lorem}</Tabs.Panel>
  {/snippet}
</Tabs>
