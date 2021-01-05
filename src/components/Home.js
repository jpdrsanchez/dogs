import Feed from './Feed/Feed';
import Head from './Helpers/Head';

const Home = () => {
  return (
    <section className="container mainContainer">
      <Head title="Fotos" description="Home do site Dogs com o Feed de Fotos" />
      <Feed />
    </section>
  );
};

export default Home;
