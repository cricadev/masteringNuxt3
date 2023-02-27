export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser();
  const { data: hasAccess } = await useFetch(
    '/api/user/hasAccess',
    {
      headers: useRequestHeaders(['cookie']),
    }
  );

  if (
    hasAccess.value ||
    to.params.chapterSlug === '1-chapter-1'
  ) {
    return;
  } else if (user.value && !hasAccess.value) {
    // Prevent logging in with Github if user has not purchased course
    const client = useSupabaseClient();
    await client.auth.signOut();
  }

  return navigateTo(`/login?redirectTo=${to.path}`);
});
