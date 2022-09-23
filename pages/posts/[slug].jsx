import { GraphQLClient, gql } from 'graphql-request';
import styles from '../../styles/Slug.module.css';
import { NavBar } from '../../components/NavBar';
import { FloatingDiv } from '../../components/floatingDiv';
import { useState } from 'react';

const graphcms = new GraphQLClient(
  'https://api-sa-east-1.hygraph.com/v2/cl70pb1k11nc801ulatbl1lwv/master'
);
const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      price
      slug
      summary
      title
      images {
        url
      }
      mainContent {
        html
      }
      mainphoto {
        url
      }
      store {
        avatarName
        avatarPhoto {
          url
        }
      }
    }
  }
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;
export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}


export default function PostPage({ post }) {
  return (
    <main className={styles.Post}>
      <NavBar />
      <div className={styles.container}>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${post.mainphoto.url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            borderRadius: '10px',
          }}
        />
        <FloatingDiv txt1='ON SALE' txt2='ON SALE' />
        <div className={styles.side} />
        <div className={styles.intro}>
          <h1>{post.title}</h1>
          <h1>{post.price}</h1>
          <div className={styles.sale} />
        </div>
        <div className={styles.content}>
          <h3>{post.summary}</h3>
        </div>
        <div className={styles.store}>
          <img src={post.store.avatarPhoto.url} alt='' />
          <h6>{post.store.avatarName}</h6>
        </div>
        <div className={styles.Slides}>
          {
            post.images.map((url) => (
              <div
              className={styles.slide1}
              style={{
                backgroundImage: `url(${url.url})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                borderRadius: '10px',
              }}
            />
            ))
          }
        </div>
      </div>
    </main>
  );
}
