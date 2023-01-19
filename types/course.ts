import { Lesson } from '@prisma/client';

export type LessonWithPath = Lesson & {
  path: string;
};

export type ChapterProgress = {
  [key: string]: boolean;
};

export type CourseProgress = {
  [key: string]: ChapterProgress;
};
