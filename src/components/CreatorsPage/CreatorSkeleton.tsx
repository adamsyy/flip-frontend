import styles from './Skeleton.module.css';

export const CreatorSkeleton = () => {
  return (
    <div className={styles.skeletonContainer}>
      {[1, 2].map((i) => (
        <div key={i} className={styles.skeletonRow}>
          <div className={styles.skeletonCard} />
          <div className={styles.skeletonDesc}>
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonText} style={{ width: '70%' }} />
          </div>
        </div>
      ))}
    </div>
  );
};
