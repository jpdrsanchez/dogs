import { lazy, Suspense, useEffect } from 'react';
import useFetch from '../../Hooks/useFetch';
import Head from '../Helpers/Head';
import { STATS_GET } from '../../api';
import Loading from '../Helpers/Loading';
import Error from '../Helpers/Error';

const UserStatsGraphs = lazy(() => import('./UserStatsGraphs'));

const UserStats = () => {
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    const getData = async () => {
      const { url, options } = STATS_GET();
      await request(url, options);
    };
    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data)
    return (
      <div>
        <Head title="Estatísticas" />
        <Suspense fallback={<div> </div>}>
          <UserStatsGraphs data={data} />
        </Suspense>
      </div>
    );
  else return null;
};

export default UserStats;
