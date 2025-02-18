import transports from "../data/transports.json";
import descriptions from "../data/descriptions.json";
import Card from "./Card";
import styles from "../styles/Transport.module.css";
import { ChangeEvent, useContext } from "react";
import { AppContext } from "../App";
import { haversineDistance } from "../utils";

function Transport(props: {
  transport: { name: string; speed: number; emoji: string } | undefined;
  func: (arg0: string) => void;
}) {
  const context: any = useContext(AppContext);

  const updateValue = (e: ChangeEvent<HTMLSelectElement>) => {
    props.func(e.target.value);
    context.setDistance(
      haversineDistance(
        context.from.lat,
        context.from.lon,
        context.to.lat,
        context.to.lon
      )
    );
  };

  const speed =
    props.transport?.speed === 0 || !props.transport
      ? 0
      : props.transport?.speed;

  const time =
    speed <= 0 ? 0 : context.distance !== -1 ? context.distance / speed : 0;

  return (
    <Card>
      <div className={styles.transport}>
        <div className="select">
          <select onChange={(e) => updateValue(e)}>
            {[{ name: "Select...", speed: 0 }, ...transports].map((option) => {
              return <option>{option.name}</option>;
            })}
          </select>
        </div>
        <div className={styles.details}>
          {props.transport?.name && (
            <>
              <div className={styles.description}>
                <span className={styles.icon}>{props.transport?.emoji}</span>
                <div className={styles["description-data"]}>
                  <span className="text2">{props.transport?.speed} Km/h</span>
                  <span className="text2">
                    {Math.floor(time)}h{" "}
                    {Math.round((time - Math.floor(time)) * 60)}m
                  </span>
                </div>
              </div>
              <span className="text2">
                {time === 0
                  ? ""
                  : descriptions
                      .sort((a, b) => (a.time > b.time ? -1 : 1))
                      .find((description) => description?.time / 60 <= time)
                      ?.description}
              </span>
            </>
          )}

          {!props.transport?.name && (
            <>
              <div className={`${styles["new-transport"]} text2`}>
                Add a new transport...
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}

export default Transport;
