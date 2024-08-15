import { memo, useMemo } from 'react';
import usePhotos from '../hooks/usePhotos';
import { Card } from './ui/card';
import { Skeleton } from './ui/skeleton';

const SkeletonGrid = () => (
  <div className="grid grid-cols-3 gap-10 mt-10">
    {[...Array(9)].map((_, index) => (
      <Skeleton key={index} className="w-[300px] h-[400px] rounded-[4%]" />
    ))}
  </div>
);

function PhotoGallery({ photoPage }: { photoPage: number | undefined }) {
  const { photos, loading, error } = usePhotos(photoPage);

  const photoGrid = useMemo(() => (
    <div className="grid grid-cols-3 gap-10">
      {photos.map(photo => (
        <Card
          key={photo.id}
          className="w-[300px] h-[400px] rounded-[4%] overflow-hidden transition-all duration-300"
        >
          <img
            src={photo.download_url}
            alt={photo.author}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </Card>
      ))}
    </div>
  ), [photos]);

  if (loading) return <SkeletonGrid />;
  if (error) return <div>Error: {error}</div>;

  return <div className='mt-10'>{photoGrid}</div>;
}

export default memo(PhotoGallery);