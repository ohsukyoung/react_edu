import { useEffect, useState } from "react";

export function useFatch(initialValue, fnFetch) {
  const [fetchedData, setFetchedDate] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    setError(undefined);

    // -- 에러가 있으면 에러를 받아오고, 패치도 할 수 있는 것
    const fetchCall = async () => {
      try {
        const json = await fnFetch();
        setFetchedDate(json);
      } catch (e) {
        setError(e.mesage || "데이터 처리 실패");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCall();
  }, [fnFetch]);

  return { fetchedData, setFetchedDate, isLoading, error };
}
