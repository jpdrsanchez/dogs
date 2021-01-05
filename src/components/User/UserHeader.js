import UserHeaderNav from './UserHeaderNav';
import styles from './UserHeader.module.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const paths = {
  '/conta/postar': 'Poste Sua Foto',
  '/conta/estatisticas': 'Estatísticas',
};

const UserHeader = () => {
  const [title, setTitle] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    setTitle(paths[pathname] ? paths[pathname] : 'Minha Conta');
  }, [pathname]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
