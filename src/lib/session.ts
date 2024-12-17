// utils/session.ts
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export const setUserSession = (userId: string) => {
  setCookie('userId', userId, { maxAge: 60 * 60 * 24 }); // 1 day
};

export const getUserSession = (): string | null => {
  const userId = getCookie('userId');
  return userId ? String(userId) : null;
};

export const clearUserSession = () => {
  deleteCookie('userId');
};
