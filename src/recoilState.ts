import { atom } from 'recoil'

export const searchData = atom({
  key: 'search',
  default: [],
})

export const profileData = atom({
  key: 'profile',
  default: null,
})

export const school = atom({
  key: 'school',
  default: 'A',
})

export const subject = atom({
  key: 'subject',
  default: 'Maths',
})
