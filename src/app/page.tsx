'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home(): React.ReactElement {
  const [isClick, setIsClick] = useState(false);

  function handleClick(): void {
    setIsClick(!isClick);
  }
  return (
    <div className={styles.container}>
      <h1>pqc-messenger</h1>
      <button onClick={handleClick}>ボタン</button>
      {isClick ? <p>クリックされました</p> : <p>クリックされていません</p>}
    </div>
  );
}
