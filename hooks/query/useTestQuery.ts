import { useQuery } from '@tanstack/react-query';
import { getTest } from '@/apis/api';

const useTestQuery = () => {
  const queryInfo = useQuery(['test'], getTest);

  console.log(queryInfo);
  return {
    ...queryInfo,
    data: queryInfo,
  };
};

export default useTestQuery;
