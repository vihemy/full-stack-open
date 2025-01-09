import { useEffect } from "react";

const SingleLineResult = ({ country, handleShowFullResult }) => {
  return (
    <p>
      {country.name.common}{" "}
      <button onClick={() => handleShowFullResult(country)}>show</button>
    </p>
  );
};

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <p>
        <b>languages:</b>
      </p>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={country.flags.alt}
        width={150}
        height={150}
      />
    </div>
  );
};

const WeatherDetails = ({ weather, getWeather, country }) => {
  useEffect(() => {
    getWeather(country);
  }, [country, getWeather]);
  if (!weather) return null;

  return (
    <div>
      <h1>Weather in {country.capital}</h1>
      <p>temperature: {weather.temperature_2m} Celcius</p>
      <p>wind: {weather.wind_speed_10m} m/s</p>
    </div>
  );
};

const FullResult = ({ country, getWeather, weather }) => {
  return (
    <div>
      <CountryDetails country={country} />
      <WeatherDetails
        weather={weather}
        getWeather={getWeather}
        country={country}
      />
    </div>
  );
};

const Result = ({
  filteredCountries,
  handleShowFullResult,
  getWeather,
  weather,
}) => {
  let content;

  switch (true) {
    case !filteredCountries.length:
      content = <div>No country with this name.</div>;
      break;
    case filteredCountries.length > 10:
      content = <div>Too many matches, specify another filter</div>;
      break;
    case filteredCountries.length > 1:
      content = (
        <div>
          {filteredCountries.map((c) => (
            <SingleLineResult
              key={c.cca3}
              country={c}
              handleShowFullResult={handleShowFullResult}
            />
          ))}
        </div>
      );
      break;
    default:
      content = (
        <FullResult
          country={filteredCountries[0]}
          getWeather={getWeather}
          weather={weather}
        />
      );
  }

  return <div>{content}</div>;
};

export default Result;
