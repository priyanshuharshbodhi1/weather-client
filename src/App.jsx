import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./App.module.css";
import BackgroundImage from "./assets/background.jpeg";
import temp from "./assets/temp.svg";
import humidity from "./assets/humidity.svg";
import rain from "./assets/rain.svg";
import wind from "./assets/wind.svg";
import cloudy from "./assets/cloudy.svg";

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
      const serverUrl = "http://localhost:4000/api/weather";

      const response = await axios.post(serverUrl, {
        latitude: latitude,
        longitude: longitude,
      });

      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  console.log(weatherData.location);

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

      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    } else {
      console.log("Position object is undefined.");
    }
  }

  //For Time and Date on UI
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60000); // update every minute

    return () => {
      clearInterval(timer); // cleanup on component unmount
    };
  }, []);

  const dateToString = date.toString();
  const dateString = dateToString.slice(0, dateToString.indexOf("GMT"));

  const dateParts = dateString.split(" ");
  const formattedDate = `${dateParts.slice(0, 4).join(" ")}`;
  const formattedTime = `${dateParts.slice(4).join(" ")}`;

  return (
    <>
      <div
        className={styles.mainContainer}
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className={styles.subContainer}>
          <div className={styles.leftContainer}>
            <div>
              <div className={styles.weather}>{weatherData?weatherData.weatherData.current.weather[0].description :"Overcast Cloud"}</div>
              <div className={styles.location}>Toronto</div>
              <div className={styles.date}>
                {formattedDate}
                <div className={styles.time}>{formattedTime}</div>
              </div>
            </div>
            <div className={styles.leftSubContainer}>
              <div className={styles.temperature}>{weatherData?Math.floor(weatherData.weatherData.current.temp-273)+ '°C' :"19 °C"}</div>
              <div
                className={styles.temperatureIcon}
                style={{ backgroundImage: `url(${cloudy})` }}
              ></div>
            </div>
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
                  <div className={styles.rightvalue}>{weatherData?Math.floor(weatherData.weatherData.current.feels_like-273) + '°C' :"19 °C"}</div>
                </div>
              </div>
              <div className={styles.humidity}>
                <div
                  className={styles.icon}
                  style={{ backgroundImage: `url(${humidity})` }}
                ></div>
                <div>
                  <div className={styles.rightHeading}>Humidity</div>
                  <div className={styles.rightvalue}>{weatherData?weatherData.weatherData.current.humidity +'%':"40 %"}</div>
                </div>
              </div>
              <div className={styles.rain}>
                <div
                  className={styles.icon}
                  style={{ backgroundImage: `url(${rain})` }}
                ></div>
                <div>
                  <div className={styles.rightHeading}>Rain</div>
                  <div className={styles.rightvalue}>{weatherData?Math.floor(weatherData.weatherData.current.clouds) +'%':"25%"}</div>
                </div>
              </div>
              <div className={styles.wind}>
                <div
                  className={styles.icon}
                  style={{ backgroundImage: `url(${wind})` }}
                ></div>
                <div>
                  <div className={styles.rightHeading}>Wind Speed</div>
                  <div className={styles.rightvalue}>{weatherData?Math.floor(weatherData.weatherData.current.wind_speed) +'km/hr':"20 km/hr"}</div>
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
