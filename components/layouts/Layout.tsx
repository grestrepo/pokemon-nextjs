import { FC } from 'react';
import Head from 'next/head';

import {Navbar} from '../ui';

interface Props {
  children: JSX.Element | JSX.Element[],
  title?: string
}

export const Layout: FC<Props> = ({children, title}) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name="author" content="Gustavo Restrepo" />
        <meta name="description" content={`Informcación sobre el pokemon ${title}`} />
        <meta name="keywords" content="XXXXX, pookemon, pokedex" />
      </Head>
      <Navbar />
      <main style={{
        padding: '0px 20px'
      }}>
        { children }
      </main>
    </>
  );
};
