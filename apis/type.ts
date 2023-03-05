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
  itemCodes: [] | string;
  createdAt: string;
  updatedAt: string;
  foodItem?: string;
  furnitureItem?: string;
  createDate?: Date;
};

export type FootprintType = {
  footprintId: number;
  githubId: string;
  totalCount: number;
  thisMonthTotalCount: number;
  continuousCount: number;
  year: string;
  month: string;
  dayStamp: any[];
  createdAt: string;
  today: number;
};
