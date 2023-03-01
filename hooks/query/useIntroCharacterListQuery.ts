import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { getCharacter } from '@/apis/api';
import { CharacterType } from '@/apis/type';

const useIntroCharacterListQuery = (options?: UseQueryOptions<CharacterType[]>) => {
  return useQuery({
    queryKey: [queryKeys.INTRO_CHARACTER_LIST],
    queryFn: () => getCharacter(),
    ...options,
  });
};

export default useIntroCharacterListQuery;
