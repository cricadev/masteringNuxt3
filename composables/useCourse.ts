import { CourseOutline } from "~/server/api/course/meta.get";

export default async () => UseFetchWithCache<CourseOutline>("/api/course/meta");
