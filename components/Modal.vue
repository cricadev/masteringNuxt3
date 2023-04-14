<template>
  <div
    class="backdrop-blur-xl backdrop-brightness-50 w-100vw h-100vh flex flex-col justify-center items-center fixed inset-0"
  >
    <div
      class="text-white text-2xl w-12 h-12 bg-slate-600 hover:bg-slate-500 transition rounded-full flex justify-center items-center cursor-pointer absolute top-4 right-4"
      @click="$emit('close')"
    >
      &#10005;
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const previousOverflow = ref('');
onMounted(() => {
  // Lock the scrollbar by removing overflow if we have any
  previousOverflow.value = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
});

onBeforeUnmount(() => {
  // Restore the overflow and position
  document.body.style.overflow = previousOverflow.value;
});
</script>
