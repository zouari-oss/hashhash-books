<script setup lang="ts">
// Lightweight PDF.js viewer (lazy loaded). The PDF is streamed from GitHub (CORS enabled),
// so the site itself never has to host the (huge) binaries.
import { nextTick, onBeforeUnmount, onMounted, ref, shallowRef } from "vue";

const props = defineProps<{ src: string; download: string }>();

const canvas = ref<HTMLCanvasElement>();
const wrap = ref<HTMLElement>();
const pdf = shallowRef<any>(null);
const page = ref(1);
const pages = ref(0);
const zoom = ref(0); // 0 = fit width
const loading = ref(true);
const error = ref("");
let task: any = null;
let renderToken = 0;

async function draw() {
  if (!pdf.value || !canvas.value || !wrap.value) return;
  const token = ++renderToken;
  const p = await pdf.value.getPage(page.value);
  const base = p.getViewport({ scale: 1 });
  const scale =
    zoom.value || Math.min(2.5, (wrap.value.clientWidth - 2) / base.width);
  const dpr = window.devicePixelRatio || 1;
  const viewport = p.getViewport({ scale: scale * dpr });
  if (token !== renderToken) return;
  const c = canvas.value;
  c.width = viewport.width;
  c.height = viewport.height;
  c.style.width = `${viewport.width / dpr}px`;
  c.style.height = `${viewport.height / dpr}px`;
  task?.cancel?.();
  task = p.render({ canvas: c, canvasContext: c.getContext("2d")!, viewport });
  try {
    await task.promise;
  } catch {
    /* cancelled by a newer render */
  }
}

function go(n: number) {
  page.value = Math.min(pages.value, Math.max(1, Math.round(n) || 1));
  draw();
}
function zoomBy(f: number) {
  const cur =
    zoom.value || (wrap.value ? (wrap.value.clientWidth - 2) / 612 : 1);
  zoom.value = Math.min(4, Math.max(0.3, cur * f));
  draw();
}
function key(e: KeyboardEvent) {
  if ((e.target as HTMLElement)?.tagName === "INPUT") return;
  if (e.key === "ArrowRight" || e.key === "PageDown") go(page.value + 1);
  if (e.key === "ArrowLeft" || e.key === "PageUp") go(page.value - 1);
}

let ro: ResizeObserver | undefined;
onMounted(async () => {
  try {
    const pdfjs = await import("pdfjs-dist");
    const worker = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url"))
      .default;
    pdfjs.GlobalWorkerOptions.workerSrc = worker;
    pdf.value = await pdfjs.getDocument({
      url: props.src,
      disableAutoFetch: true,
    }).promise;
    pages.value = pdf.value.numPages;
    loading.value = false;
    await nextTick();
    await draw();
    if (wrap.value) {
      let last = wrap.value.clientWidth;
      ro = new ResizeObserver(() => {
        if (!zoom.value && Math.abs(wrap.value!.clientWidth - last) > 4) {
          last = wrap.value!.clientWidth;
          draw();
        }
      });
      ro.observe(wrap.value);
    }
    window.addEventListener("keydown", key);
  } catch (e: any) {
    loading.value = false;
    error.value = String(e?.message ?? e);
  }
});
onBeforeUnmount(() => {
  window.removeEventListener("keydown", key);
  ro?.disconnect();
  pdf.value?.destroy?.();
});
</script>

<template>
  <div class="pdf-viewer">
    <div class="bar" role="toolbar" aria-label="PDF controls">
      <button
        type="button"
        :disabled="page <= 1"
        aria-label="Previous page"
        title="Previous page (←)"
        @click="go(page - 1)"
      >
        <i class="i i-caret-left" />
      </button>
      <span class="pager">
        <input
          type="number"
          :value="page"
          min="1"
          :max="pages"
          aria-label="Page number"
          @change="go(+($event.target as HTMLInputElement).value)"
        />
        <span>of {{ pages || "…" }}</span>
      </span>
      <button
        type="button"
        :disabled="page >= pages"
        aria-label="Next page"
        title="Next page (→)"
        @click="go(page + 1)"
      >
        <i class="i i-caret-right" />
      </button>
      <span class="sep" aria-hidden="true" />
      <button
        type="button"
        aria-label="Zoom out"
        title="Zoom out"
        @click="zoomBy(1 / 1.25)"
      >
        <i class="i i-minus" />
      </button>
      <button
        type="button"
        aria-label="Fit to width"
        title="Fit to width"
        @click="
          zoom = 0;
          draw();
        "
      >
        <i class="i i-arrows-out-line-horizontal" />
      </button>
      <button
        type="button"
        aria-label="Zoom in"
        title="Zoom in"
        @click="zoomBy(1.25)"
      >
        <i class="i i-plus" />
      </button>
      <span class="spacer" />
      <a class="dl" :href="download" target="_blank" rel="noreferrer"
        ><i class="i i-download-simple" /><span>Download</span></a
      >
    </div>
    <div ref="wrap" class="stage">
      <p v-if="loading" class="state" role="status">
        <i class="i i-spinner-gap spin" /> Loading PDF…
      </p>
      <p v-else-if="error" class="state err" role="alert">
        <i class="i i-warning-circle" /> Could not load this PDF ({{ error }}).
        <a :href="download" target="_blank" rel="noreferrer">Open it directly</a
        >.
      </p>
      <canvas v-show="!loading && !error" ref="canvas" aria-label="PDF page" />
    </div>
  </div>
</template>

<style scoped>
.pdf-viewer {
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--hh-radius);
  overflow: hidden;
  margin: 16px 0;
  box-shadow: var(--hh-shadow);
}
.bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  background: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  flex-wrap: wrap;
}
.bar button,
.dl {
  display: inline-grid;
  place-items: center;
  min-width: 36px;
  height: 36px;
  padding: 0 8px;
  border: 1px solid var(--vp-c-border);
  border-radius: var(--hh-radius-sm);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition:
    border-color var(--hh-ease),
    color var(--hh-ease);
}
.bar button:hover:not(:disabled),
.dl:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.bar button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.dl {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}
.bar input {
  width: 60px;
  height: 36px;
  padding: 0 4px;
  border: 1px solid var(--vp-c-border);
  border-radius: var(--hh-radius-sm);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  text-align: center;
  font: inherit;
}
.pager {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 4px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.sep {
  width: 1px;
  height: 22px;
  margin: 0 6px;
  background: var(--vp-c-divider);
}
.spacer {
  flex: 1;
}
.stage {
  background: var(--vp-c-bg-soft);
  padding: 16px;
  min-height: 320px;
  text-align: center;
  overflow: auto;
  max-height: 85vh;
}
canvas {
  box-shadow: 0 2px 14px rgb(15 23 42 / 0.25);
  background: #fff;
  max-width: none;
}
.state {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 80px 0;
  color: var(--vp-c-text-2);
}
.err {
  color: var(--vp-c-danger-1);
}
.spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@media (pointer: coarse) {
  .bar button,
  .dl,
  .bar input {
    min-height: 44px;
    min-width: 44px;
  }
}
</style>
