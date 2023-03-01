export type User = {
  nickname: string;
  character: string;
};

export type CharacterType = {
  id: number;
  code: 'A' | 'B' | 'C' | 'D';
  name: '시고르자브종' | '닥스훈트' | '푸들';
  image_url: string | null;
};
