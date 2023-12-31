import React, { useEffect } from "react";
import styles from "./App.module.css";
import BackgroundImage from "./assets/background.jpeg";
import temp from "./assets/temp.svg";

const App = () => {
  useEffect(() => {
    getLocation();
    showPosition();
  }, []);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, handleError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function handleError(error) {
    console.log("Error getting location: ", error);
  }

  function showPosition(position) {
    if (position && position.coords) {
      console.log(
        "Latitude: " +
          position.coords.latitude +
          ", Longitude: " +
          position.coords.longitude
      );
    } else {
      console.log("Position object is undefined.");
    }
  }

  return (
    <>
      <div
        className={styles.mainContainer}
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className={styles.subContainer}>
          <div className={styles.leftContainer}></div>
          <div className={styles.rightContainer}>
            <div>
              <div className={styles.temp}>
                <div
                  className={styles.icon}
                  style={{ backgroundImage: `url(${temp})` }}
                ></div>
              </div>
              <div className={styles.humidity}>
                <div className={styles.icon}></div>
              </div>
              <div className={styles.rain}>
                <div className={styles.icon}></div>
              </div>
              <div className={styles.wind}>
                <div className={styles.icon}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
