import React from "react";

import styles from './Target.module.css';

const Target = ({ handleRingClick }) => {
  return (
    <>
      <div style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
        <div onClick={(e) => handleRingClick(e, 1)} className={styles.outerLine}>
          <div onClick={(e) => handleRingClick(e, 1)} className={styles.ring}>
            <div onClick={(e) => handleRingClick(e, 2)} className={styles.line}>
              <div onClick={(e) => handleRingClick(e, 2)} className={styles.ring} >
                <div onClick={(e) => handleRingClick(e, 3)} className={styles.line}>
                  <div onClick={(e) => handleRingClick(e, 3)} className={styles.ring}>
                    <div onClick={(e) => handleRingClick(e, 4)} className={styles.fourLine}>
                      <div onClick={(e) => handleRingClick(e, 4)} className={styles.ring} >
                        <div onClick={(e) => handleRingClick(e, 6)} className={styles.fiveLine}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default Target;