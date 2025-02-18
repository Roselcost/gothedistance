import { createContext, useState } from "react";
import Card from "./components/Card";
import Mapp from "./components/Mapp";
import transports from "./data/transports.json";
import Stop from "./components/Stop";
import Transport from "./components/Transport";

export const AppContext = createContext({});

function App() {
  const [showControls, setShowControls] = useState(true);
  const [from, setFrom] = useState({ lat: -1, lon: -1 });
  const [to, setTo] = useState({ lat: -1, lon: -1 });
  const [distance, setDistance] = useState(-1);
  const [transport1, setTransport1] = useState("");
  const [transport2, setTransport2] = useState("");

  const contextValue = {
    showControls,
    setShowControls,
    from,
    setFrom,
    to,
    setTo,
    distance,
    setDistance,
    transport1,
    setTransport1,
    transport2,
    setTransport2,
  };

  return (
    <>
      <AppContext.Provider value={contextValue}>
        <div className="map">
          <Mapp></Mapp>
          <div
            className="controls"
            style={{ height: showControls ? "" : "75px" }}
          >
            <div className="container">
              <Card>
                <header>
                  <h1>Go the Distance</h1>
                  <button onClick={() => setShowControls(!showControls)}>
                    {showControls ? "⬆" : "⬇"}
                  </button>
                </header>
              </Card>
              <div className="actual-controls">
                <Card>
                  <div className="stops">
                    <Stop kind="from"></Stop>
                    <Stop kind="to"></Stop>
                  </div>
                </Card>
                <div className="transports">
                  {[
                    {
                      transport: transports.find(
                        (transport) => transport.name === transport1
                      ),
                      func: setTransport1,
                    },
                    {
                      transport: transports.find(
                        (transport) => transport.name === transport2
                      ),
                      func: setTransport2,
                    },
                  ].map((trans) => {
                    return (
                      <Transport
                        transport={trans.transport}
                        func={trans.func}
                      ></Transport>
                    );
                  })}
                </div>
                <Card>
                  <footer>
                    <span className="text2">
                      This is an little app made just for fun. It assumes
                      straight routes with no stops, obstacles or traffic.
                    </span>
                    <div className="button-list">
                      <a
                        target="_blank"
                        href="http://github.com/roselcost/gothedistance"
                      >
                        😼 GitHub
                      </a>
                      <a target="_blank" href="http://x.com/roselcost">
                        🐥 Twitter
                      </a>
                      <a
                        target="_blank"
                        href="https://bsky.app/profile/roselcost.bsky.social"
                      >
                        🦋 Bluesky
                      </a>
                    </div>
                    <span className="text2">© Ross Designs '25</span>
                  </footer>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
