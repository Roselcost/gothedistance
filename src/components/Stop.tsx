import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/Stop.module.css";
import { AppContext } from "../App";
import { haversineDistance } from "../utils";

function Stop(props: { kind: string }) {
  const context: any = useContext(AppContext);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<
    { display_name: string; lat: number; lon: number }[]
  >([]);
  const debounceTimer = useRef<number>();

  useEffect(() => {
    context.setDistance(
      haversineDistance(
        context.from.lat,
        context.from.lon,
        context.to.lat,
        context.to.lon
      )
    );
  }, [context.from, context.to]);

  const fetchCities = async (input: string) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${input}&format=json&limit=5`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchCities(inputValue);
    }, 500);
  };

  const handleSelectCity = (city: {
    display_name: string;
    lat: number;
    lon: number;
  }) => {
    setValue(city.display_name);
    props.kind === "from"
      ? context.setFrom({ lat: city.lat, lon: city.lon })
      : context.setTo({ lat: city.lat, lon: city.lon });

    setSuggestions([]);
  };

  return (
    <>
      <div className={styles.stop}>
        <label htmlFor={props.kind}>
          {props.kind === "from" ? "🛫 From" : "🛬 To"}
        </label>
        <input
          placeholder={props.kind === "from" ? "Barcelona" : "Tokyo"}
          id={props.kind}
          autoComplete="off"
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e)}
        ></input>
        {suggestions.length > 0 && (
          <ul className={styles.suggestions}>
            {suggestions.map((city, index) => (
              <li key={index} onClick={() => handleSelectCity(city)}>
                {city.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Stop;
