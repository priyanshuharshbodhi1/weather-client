import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./App.module.css";
import BackgroundImage from "./assets/background.jpeg";
import temp from "./assets/temp.svg";
import humidity from "./assets/humidity.svg";
import rain from "./assets/rain.svg";
import wind from "./assets/wind.svg";

const App = () => {
  useEffect(() => {
    getLocation();
    showPosition();
    handleFetchWeather();
  }, []);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weatherData, setWeatherData] = useState(null);

  const handleFetchWeather = async () => {
    try {
      // Replace 'YOUR_SERVER_URL' with the actual URL of your Express server
      const serverUrl = 'http://localhost:4000/api/weather';

      const response = await axios.post(serverUrl, {
        latitude: latitude,
        longitude: longitude,
      });

      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };



  console.log(weatherData.main);

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

      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
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
          <div className={styles.leftContainer}>
            <div className={styles.weather}>Overcast Clound</div>
            <div className={styles.location}>Toronto</div>
            <div className={styles.date}>
              22/22/22
              <div className={styles.date}></div>
            </div>

            <div className={styles.temperature}>19 &deg;C</div>
            <div
              className={styles.temperatureIcon}
              style={{ backgroundImage: `url(${rain})` }}
            ></div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.rightSubContainer}>
              <div className={styles.temp}>
                <div
                  className={styles.icon}
                  style={{ backgroundImage: `url(${temp})` }}
                ></div>
                <div>
                  <div className={styles.rightHeading}>Feels like</div>
                  <div className={styles.rightvalue}>19&deg;C</div>
                </div>
              </div>
              <div className={styles.humidity}>
                <div
                  className={styles.icon}
                  style={{ backgroundImage: `url(${humidity})` }}
                ></div>
                <div>
                  <div className={styles.rightHeading}>Humidity</div>
                  <div className={styles.rightvalue}>40%</div>
                </div>
              </div>
              <div className={styles.rain}>
                <div
                  className={styles.icon}
                  style={{ backgroundImage: `url(${rain})` }}
                ></div>
                <div>
                  <div className={styles.rightHeading}>Rain</div>
                  <div className={styles.rightvalue}>76%</div>
                </div>
              </div>
              <div className={styles.wind}>
                <div
                  className={styles.icon}
                  style={{ backgroundImage: `url(${wind})` }}
                ></div>
                <div>
                  <div className={styles.rightHeading}>Wind Speed</div>
                  <div className={styles.rightvalue}>20 km/hr</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
