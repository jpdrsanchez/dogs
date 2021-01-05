import styles from './UserPhotoPost.module.css';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helpers/Error';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { useEffect, useState } from 'react';
import { PHOTO_POST } from '../../api';
import { useNavigate } from 'react-router-dom';
import Head from '../Helpers/Head';

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm();
  const idade = useForm();
  const [img, setImg] = useState({});
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);

    const token = localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options);
  };

  const handleImgChange = ({ target }) => {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  };

  useEffect(() => {
    if (data) navigate('/conta');
  }, [data, navigate]);

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Poste sua foto" />
      <form onSubmit={handleSubmit}>
        <Input label="Nome" name="nome" type="text" {...nome} />
        <Input label="Peso" name="peso" type="number" {...peso} />
        <Input label="Idade" name="idade" type="number" {...idade} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
