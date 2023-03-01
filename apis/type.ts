export type User = {
  nickname: string;
  character: string;
};

export type CHARACTER_CODES = 'A' | 'B' | 'C' | 'D';
export type CHARACTER_NAMES = '시고르자브종' | '닥스훈트' | '푸들';

export type CharacterType = {
  id: number;
  code: CHARACTER_CODES;
  name: CHARACTER_NAMES;
  image_url: string | null;
};

export type UserProfileType = {
  id: string | null;
  nickname: string;
  email: string | null;
  isNewUser: 0 | 1;
  characterCode: CHARACTER_CODES;
  itemCodes: [];
  createdAt: string;
  updatedAt: string;
};
