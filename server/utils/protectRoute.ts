import { H3Event } from 'h3';

// If the user does not exist on the request, throw a 401 error
export default async (event: H3Event) => {
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  // Check to see if this user has access to this course
  const hasAccess = await $fetch('/api/user/hasAccess', {
    headers: {
      // Make sure to pass along the cookie with the user session
      cookie: getHeader(event, 'cookie'),
    },
  });
  if (!hasAccess) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }
};
