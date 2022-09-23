
import { GraphQLClient, gql } from 'graphql-request';
import { Intro } from '../components/Intro';
import { NavBar } from '../components/NavBar';
import PostCard from '../components/PostCard';

const graphcms = new GraphQLClient(
  'https://api-sa-east-1.hygraph.com/v2/cl70pb1k11nc801ulatbl1lwv/master'
);
const QUERY = gql`
  {
    posts {
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

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default function Home({ posts }) {

  return (
    <main className='Home'>
      <NavBar/>
      <div className='Posts'>
      <Intro/>
      {posts.map((post) => (
        <PostCard
          mainPhoto={post.mainphoto.url}
          title={post.title}
          price={post.price}
          slug={post.slug}
          storeName={post.store.avatarName}
          storePhoto={post.store.avatarPhoto.url}
        />
      ))}
      </div>
    </main>
  );
}
