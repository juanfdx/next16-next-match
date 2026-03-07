

/* ==================================================
  Result - data can be any type
================================================== */
export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };