import React, { useRef } from 'react';

import Container from '../components/Container';
import Hero from '../components/Hero';
import ThemeLink from '../components/ThemeLink';
import Layout from '../components/Layout/Layout';

import * as styles from './about.module.css';
import { toOptimizedImage } from '../helpers/general';
const AboutPage = (props) => {
  let historyRef = useRef();
  let valuesRef = useRef();
  let sustainabilityRef = useRef();

  const handleScroll = (elementReference) => {
    if (elementReference) {
      window.scrollTo({
        behavior: 'smooth',
        top: elementReference.current.offsetTop - 280,
      });
    }
  };

  return (
    <Layout disablePaddingBottom>
      <div className={styles.root}>
        {/* Hero Container */}
        <Hero
          maxWidth={'1000px'}
          image={'/about.png'}
          title={`BUILT FOR STRENGTH `}
        />

        <div className={styles.navContainer}>
          <ThemeLink onClick={() => handleScroll(historyRef)} to={'#history'}>
            History
          </ThemeLink>
          <ThemeLink onClick={() => handleScroll(valuesRef)} to={'#values'}>
            Values
          </ThemeLink>
          <ThemeLink
            onClick={() => handleScroll(sustainabilityRef)}
            to={'#sustainability'}
          >
            Sustainability
          </ThemeLink>
        </div>

        <Container size={'large'} spacing={'min'}>
          <div className={styles.detailContainer} ref={historyRef}>
            <p>
              DRAGO is not clothing. 
              It’s a mindset. Built for strength. Driven by power.
             
            </p>
            <br />
            <br />
            <p>
              We design gear for those who push limits. 
              Every piece is built for performance, durability, and control — 
              so you can focus on becoming stronger every day.
            </p>
          </div>
        </Container>

        <div className={styles.imageContainer}>
          <img alt={'shirt brand'} src={toOptimizedImage('/about1.png')}></img>
        </div>

        <Container size={'large'} spacing={'min'}>
          <div className={styles.content}>
            <h3>Our Values</h3>
            <div ref={valuesRef}>
              <p>
               DRAGO is built for intensity. 
               Designed to perform under pressure and move with you through every rep. 
               No distractions. No compromises. Just power.
              </p>
              <ol>
                <li>Be Strong</li>
                <li>Powerful Presence</li>
                <li>Clean vibe</li>
              </ol>
              <img alt={'founder'} src={toOptimizedImage('/about2.png')}></img>
            </div>
            <h3>Sustainability</h3>
            <div id={'#sustainability'} ref={sustainabilityRef}>
              <p>
                Built for movement. 
                Breathable, flexible, and made to endure every rep.{' '}
              </p>
            </div>
          </div>
        </Container>

        <div className={styles.imageContainer}>
          <img alt={'shirt backwards'} src={toOptimizedImage('/about3.png')}></img>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
