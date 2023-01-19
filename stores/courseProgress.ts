import { defineStore } from 'pinia';
import { CourseProgress } from '~/types/course';

export const useCourseProgress = defineStore(
  'courseProgress',
  () => {
    // Initialize progress from local storage
    const progress = ref<CourseProgress>({});
    const initialized = ref(false);

    async function initialize() {
      // If the course has already been initialized, return
      if (initialized.value) return;
      initialized.value = true;

      const { data: userProgress } =
        await useFetch<CourseProgress>(
          '/api/user/progress',
          { headers: useRequestHeaders(['cookie']) }
        );

      // Update progress value
      if (userProgress.value) {
        progress.value = userProgress.value;
      }
    }

    // Toggle the progress of a lesson based on chapter slug and lesson slug
    const toggleComplete = async (
      chapter: string,
      lesson: string
    ) => {
      // If there's no user we can't update the progress
      const user = useSupabaseUser();
      if (!user.value) return;

      // Grab chapter and lesson slugs from the route if they're not provided
      if (!chapter || !lesson) {
        const {
          params: { chapterSlug, lessonSlug },
        } = useRoute();
        chapter = chapterSlug as string;
        lesson = lessonSlug as string;
      }

      // Get the current progress for the lesson
      const currentProgress =
        progress.value[chapter]?.[lesson];

      // Optimistically update the progress value in the UI
      progress.value[chapter] = {
        ...progress.value[chapter],
        [lesson]: !currentProgress,
      };

      // Update the progress in the DB
      try {
        await $fetch(
          `/api/course/chapter/${chapter}/lesson/${lesson}/progress`,
          {
            method: 'POST',
            // Automatically stringified by ofetch
            body: {
              completed: !currentProgress,
            },
          }
        );
      } catch (error) {
        console.error(error);

        // If the request failed, revert the progress value
        progress.value[chapter] = {
          ...progress.value[chapter],
          [lesson]: currentProgress,
        };
      }
    };

    return {
      initialize,
      progress,
      toggleComplete,
    };
  }
);
