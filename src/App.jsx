import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styles from "./App.module.css";
import BackgroundImage from "./assets/background.png";
import temp from "./assets/temp.svg";
import humidity from "./assets/humidity.svg";
import rain from "./assets/rain.svg";
import wind from "./assets/wind.svg";

import sunIcon from "./assets/sun.svg";
import cloudyIcon from "./assets/cloudy.svg";
import rainyIcon from "./assets/rainy.svg";
import lightningIcon from "./assets/lightning.svg";
import snowIcon from "./assets/snow.svg";
import mistIcon from "./assets/mist.svg";



const App = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState("");

  useEffect(() => {
    getLocation();
    showPosition();
    // handleFetchWeather();
  }, []);

  const handleFetchWeather = async (latitude, longitude) => {
    let responseReceived = false; // Flag to track if the response has been received
  
    try {
      
      const serverUrl = 'https://weather-app-server-p520.onrender.com/api/weather';// "http://localhost:4000/api/weather";
  
      const response = await axios.post(serverUrl, null, {
        headers: {
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        },
      });
  
      // Setting icon type
      const iconType = response.data.weatherData.current.weather[0].icon;
      const iconUrl = getWeatherIconUrl(iconType);
      setWeatherIcon(iconUrl);
  
      setWeatherData(response.data);
      responseReceived = true; // Set the flag to true when response is received
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  
    // Set a timeout to show the toast after 15 seconds if no response is received
    setTimeout(() => {
      if (!responseReceived) {
        toast.error("Unable to fetch data. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }, 15000);
  };
  
  // Function to map weather description to icon URL
  const getWeatherIconUrl = (iconType) => {
    switch (iconType) {
      case "01n":
        return sunIcon;
      case "02n":
      case "03n":
      case "04n":
        return cloudyIcon;
      case "09n":
      case "10n":
        return rainyIcon;
      case "11n":
        return lightningIcon;
      case "13n":
        return snowIcon;
      case "50n":
        return mistIcon;
      default:
        return sunIcon; // Default icon
    }
  };

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
          longitude +
          ", Longitude: " +
          latitude
      );


      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);

      handleFetchWeather(position.coords.latitude, position.coords.longitude);
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

  //for location string slicing
  let desiredLocation = "";
  if (weatherData && weatherData.location) {
    let locationParts = weatherData.location.split(", ");
    desiredLocation = locationParts.slice(-2).join(", ");
  }

  // console.log(Location);

  if (weatherData) {
    console.log(weatherData);
  }

  return (
    <>
      <div
        className={styles.mainContainer}
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        {!weatherData && <div className={styles.loading}>Loading...</div>}
        {weatherData && (
          <>
            {
              <div className={styles.subContainer}>
                <div className={styles.leftContainer}>
                  <div>
                    <div className={styles.weather}>
                      {weatherData
                        ? weatherData.weatherData.current.weather[0].description
                        : "Overcast Cloud"}
                    </div>
                    <div className={styles.location}>
                      {desiredLocation ? desiredLocation : "Toronto"}{" "}
                    </div>
                    <div className={styles.date}>
                      {formattedDate}
                      <div className={styles.time}>{formattedTime}</div>
                    </div>
                  </div>
                  <div className={styles.leftSubContainer}>
                    <div className={styles.temperature}>
                      {weatherData
                        ? Math.floor(
                            weatherData.weatherData.current.temp - 273
                          ) + "°C"
                        : "19 °C"}
                    </div>
                    <div
                      className={styles.temperatureIcon}
                      style={{ backgroundImage: `url(${weatherIcon})` }}
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
                        <div className={styles.rightvalue}>
                          {weatherData
                            ? Math.floor(
                                weatherData.weatherData.current.feels_like - 273
                              ) + "°C"
                            : "19 °C"}
                        </div>
                      </div>
                    </div>
                    <div className={styles.humidity}>
                      <div
                        className={styles.icon}
                        style={{ backgroundImage: `url(${humidity})` }}
                      ></div>
                      <div>
                        <div className={styles.rightHeading}>Humidity</div>
                        <div className={styles.rightvalue}>
                          {weatherData
                            ? weatherData.weatherData.current.humidity + "%"
                            : "40 %"}
                        </div>
                      </div>
                    </div>
                    <div className={styles.rain}>
                      <div
                        className={styles.icon}
                        style={{ backgroundImage: `url(${rain})` }}
                      ></div>
                      <div>
                        <div className={styles.rightHeading}>Rain</div>
                        <div className={styles.rightvalue}>
                          {weatherData
                            ? Math.floor(
                                weatherData.weatherData.current.clouds
                              ) + "%"
                            : "25%"}
                        </div>
                      </div>
                    </div>
                    <div className={styles.wind}>
                      <div
                        className={styles.icon}
                        style={{ backgroundImage: `url(${wind})` }}
                      ></div>
                      <div>
                        <div className={styles.rightHeading}>Wind Speed</div>
                        <div className={styles.rightvalue}>
                          {weatherData
                            ? Math.floor(
                                weatherData.weatherData.current.wind_speed
                              ) + "km/hr"
                            : "20 km/hr"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
