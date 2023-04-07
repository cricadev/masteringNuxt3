<template>
  <div class="w-full max-w-2xl prose h-9">
    <h1>Log in to {{ course.title }}</h1>
    <button
      class="px-4 py-2 font-bold text-white bg-blue-500 rounded"
      @click="login"
    >
      Log in with Github
    </button>
  </div>
</template>

<script setup lang="ts">
const course = useCourse();
const { query } = useRoute();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

watchEffect(async () => {
  if (user.value) {
    await navigateTo(query.redirectTo as string, {
      replace: true,
    });
  }
});

const login = async () => {
  const redirectTo = `${window.location.origin}${query.redirectTo}`;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo },
  });

  if (error) {
    console.error(error);
  }
};
</script>
