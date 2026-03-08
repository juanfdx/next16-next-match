import { differenceInYears } from 'date-fns'


/*==================================================
  Calculate Age
==================================================*/
export function calculateAge(birthday: Date | null) {
  // if null
  if (!birthday) return 0;

  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

/*==================================================
  Calculate Age with date-fns
==================================================*/
export const calculateAgeWithDateFns = (birthday: Date | null) => {
  if (!birthday) return 0;
  
  const age = differenceInYears(new Date(), birthday);
  return age;
}