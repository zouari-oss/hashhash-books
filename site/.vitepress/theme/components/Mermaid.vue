<script setup lang="ts">
// Renders a ```mermaid block. mermaid is loaded lazily (own chunk) only on pages that use it.
import { onMounted, ref, watch } from "vue";
import { useData } from "vitepress";

const props = defineProps<{ code: string }>();
const { isDark } = useData();
const host = ref<HTMLElement>();
const error = ref("");
let counter = 0;

async function render() {
  const id = `mmd-${Math.random().toString(36).slice(2)}-${counter++}`;
  try {
    const mermaid = (await import("mermaid")).default;
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark.value ? "dark" : "default",
      securityLevel: "strict",
    });
    const { svg } = await mermaid.render(id, decodeURIComponent(props.code));
    if (host.value) host.value.innerHTML = svg;
    error.value = "";
  } catch (e: any) {
    error.value = String(e?.message ?? e);
    document.getElementById("d" + id)?.remove(); // mermaid leaves its error node in <body>
  }
}

onMounted(render);
watch(isDark, render);
</script>

<template>
  <div class="mermaid-diagram">
    <div v-if="error" class="mermaid-error">Mermaid error: {{ error }}</div>
    <div ref="host" />
  </div>
</template>
