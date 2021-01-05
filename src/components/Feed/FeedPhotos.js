import { useEffect } from 'react';
import { PHOTOS_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helpers/Error';
import Loading from '../Helpers/Loading';
import FeedPhotosItem from './FeedPhotosItem';
import styles from './FeedPhotos.module.css';

const FeedPhotos = ({ user, page, setModalPhoto, setInfinite }) => {
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    const fetchPhotos = async () => {
      const total = 6;
      const { url, options } = PHOTOS_GET({ page, total, user });
      const { response, json } = await request(url, options);
      console.log(response, 'oi', json);
      if (response && response.ok && json.length < total) setInfinite(false);
    };
    fetchPhotos();
  }, [user, page, request, setInfinite]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map((photo) => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    );
  else return null;
};

export default FeedPhotos;
