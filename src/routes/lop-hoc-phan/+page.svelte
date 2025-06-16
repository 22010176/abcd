<script>
  import { Tabs } from "@skeletonlabs/skeleton-svelte";

  import HocPhan from "./HocPhan.svelte";
  import KyHoc from "./KyHoc.svelte";
  import LopHocPhan from "./LopHocPhan.svelte";

  let group = $state("hocPhan");
</script>

<Tabs value={group} onValueChange={(e) => (group = e.value)}>
  {#snippet list()}
    <Tabs.Control value="hocPhan">Học phần</Tabs.Control>
    <Tabs.Control value="kyHoc">Học kì</Tabs.Control>
    <Tabs.Control value="lopHocPhan">Lớp học phần</Tabs.Control>
  {/snippet}

  {#snippet content()}
    <Tabs.Panel value="hocPhan">
      <HocPhan active={group == "hocPhan"} />
    </Tabs.Panel>
    <Tabs.Panel value="kyHoc">
      <KyHoc active={group == "kyHoc"} />
    </Tabs.Panel>
    <Tabs.Panel value="lopHocPhan">
      <LopHocPhan active={group == "lopHocPhan"} />
    </Tabs.Panel>
  {/snippet}
</Tabs>
