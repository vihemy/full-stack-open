import axios from "axios";

const get = (coordinates) => {
  const request = axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${coordinates[0]}&longitude=${coordinates[1]}&current=temperature_2m,wind_speed_10m&wind_speed_unit=ms`
  );
  return request.then((response) => response.data.current);
};

export default { get };
