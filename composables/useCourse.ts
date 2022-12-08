import { CourseMeta } from '~~/types/course';

export default async () =>
  useFetchWithCache<CourseMeta>('/api/course/meta');
