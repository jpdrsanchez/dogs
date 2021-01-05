import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PHOTO_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helpers/Error';
import Head from '../Helpers/Head';
import Loading from '../Helpers/Loading';
import PhotoContent from './PhotoContent';

const Photo = () => {
  const { id } = useParams();
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    const { url, options } = PHOTO_GET(id);
    request(url, options);
  }, [id, request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <section className="container mainContainer">
        <Head title={data.photo.title} />
        <PhotoContent data={data} single={true} />
      </section>
    );
  return <div></div>;
};

export default Photo;
