export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  if (
    user.value ||
    to.params.chapterSlug === '1-chapter-1'
  ) {
    return;
  }

  return navigateTo(`/login?redirectTo=${to.path}`);
});
