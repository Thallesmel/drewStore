import React from 'react';
import Link from 'next/link';
import styles from '../styles/PostCard.module.css';

const PostCard = ({ mainPhoto, title, price, slug, storeName, storePhoto }) => {
  return (
    <div className={styles.container}>
      <Link href={'/posts/' + slug}>
        <div className={styles.post}>
          <div
            className={styles.image}
            style={{
              backgroundImage: `url(${mainPhoto})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: '150px',
              width: '180px',
              borderRadius: '10px',
            }}
          />
          <div className={styles.contains}>
            <h5>{title}</h5>
            <h2>{price}</h2>
          </div>
          <div className={styles.store}>
            <img src={storePhoto} alt='' />
            <h6>{storeName}</h6>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
