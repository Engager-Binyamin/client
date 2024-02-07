import React from 'react'
import styles from "./style.module.css"

// Details : the componneta get Loading animation. the way to use: 
//<Suspense fallback={<Loading />}>
  //<Albums />
  //</Suspense>
// Creator: shir

export default function Loading() {
  return (

      <div className={styles.loader}/>
      
  );
}


