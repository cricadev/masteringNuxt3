import { LessonWithPath } from "~/types/course";

export default async (chapterSlug: string, lessonSlug: string) =>
  UseFetchWithCache<LessonWithPath>(
    `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  );
