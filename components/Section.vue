<template>
  <div
    class="section bg-white p-24 flex flex-col items-center"
  >
    <div class="w-full max-w-4xl">
      <h2
        v-if="title"
        class="text-4xl font-bold pb-8 text-center"
      >
        {{ title }}
      </h2>
      <div v-bind="$attrs">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<script lang="ts">
// Don't inherit the attributes from the parent component
// since we only put them on the slot
export default {
  inheritAttrs: false,
};
</script>

<style>
.section:nth-of-type(even) {
  @apply bg-blue-500 text-white;
}
</style>
