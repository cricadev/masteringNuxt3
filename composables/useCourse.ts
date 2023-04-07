import { CourseMeta } from "~/types/course";

export default async () => UseFetchWithCache<CourseMeta>("/api/course/meta");
