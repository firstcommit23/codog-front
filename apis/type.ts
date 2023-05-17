export type User = {
  nickname: string;
  character: string;
};

export type CHARACTER_CODES = 'A' | 'B' | 'C' | 'D';
export type CHARACTER_NAMES = '시고르자브종' | '닥스훈트' | '푸들' | '바둑이';

export type CharacterType = {
  id: number;
  code: CHARACTER_CODES;
  name: CHARACTER_NAMES;
  image_url: string | null;
};

export type ItemType = {
  item: string;
  itemCode: string;
  imageUrl: string | null;
  category: string;
  categoryCode: 'A' | 'B' | 'C';
  query: string;
  questType: number;
  questRequisite: number;
};

export type UserProfileDetailType = {
  id: string | null;
  nickname: string;
  github_id: string | null;
  email: string | null;
  isNewUser: 0 | 1;
  characterCode: CHARACTER_CODES;
  itemCodes: [];
  createdAt: string;
  updatedAt: string;
  foodItem?: string;
  furnitureItem?: string;
  createDate?: Date;
  cheerCount: number;
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

export type CommentType = {
  contents: string;
  footprintId: number;
  writer: number;
  nickname: string;
  githubId: string;
  createdAt: string;
  id: number;
};

export type CommentResponse = {
  totalCount: number;
  comments: CommentType[];
};

export type ShareUserDataType = UserProfileDetailType & {
  footPrintData: FootprintType;
  isOwner: boolean;
};
