import { useState, useEffect, useCallback } from 'react';

interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

function usePhotos(photoPage = 1, limit = 9) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [_, setInternalPage] = useState<number>(photoPage);

  const fetchPhotos = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch photos');
      }
      const data: Photo[] = await response.json();
      setPhotos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    setInternalPage(photoPage);
    fetchPhotos(photoPage);

    const intervalId = setInterval(() => {
      setInternalPage(prevPage => {
        const nextPage = prevPage + 1;
        fetchPhotos(nextPage);
        return nextPage;
      });
    }, 10000);

    return () => clearInterval(intervalId);
  }, [fetchPhotos, photoPage]);

  return { photos, loading, error };
}

export default usePhotos;