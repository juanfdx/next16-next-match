type Gender = 'male' | 'female' | 'other';

/* ==================================================
  Member
================================================== */
export type Member = {
  id: string
  name: string | null
  username: string | null
  email: string | null
  image: string | null
  gender: Gender
  dateOfBirth: Date | null
  description: string | null
  city: string | null
  country: string | null
  createdAt: Date
}

/* ==================================================
  Result - data can be any type
================================================== */
export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };