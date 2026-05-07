import React from 'react';
import { navigate } from 'gatsby';

import * as styles from './Brand.module.css';

const Brand = (props) => {
return (
  <div style={{ marginTop: "-30px" }}  
    className={styles.root}
    role="presentation"
    onClick={() => navigate('/')}
  >
    <span style={{
      fontWeight: 900,
      fontSize: "50px",
      letterSpacing: "2px",
      color: "black",
      fontFamily: " 'Anton'" }}>
      <img style={{ width: "100px", height: "100px", marginRight: "-20px", marginBottom: "-30px" }}
          src={'../../logo.png'}
          alt={'amex'}
      ></img>RAGO
    </span>
  </div>
);
};
export default Brand;
