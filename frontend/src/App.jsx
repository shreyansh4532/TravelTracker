import { useEffect, useState } from "react";
import "./app.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import StarIcon from "@mui/icons-material/Star";
import RoomIcon from "@mui/icons-material/Room";
import axios from "axios";
import { format } from "timeago.js";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const myStorage = window.localStorage;
  const [currUser, setCurrUser] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: 77.1025,
    latitude: 28.7041,
    zoom: 4,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/api/pins");
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    console.log(`Arguments: ${id}, ${lat}, ${long}`);
    console.log("Current place id before: ", currentPlaceId);
    setCurrentPlaceId(id);
    console.log("Current place id after: ", currentPlaceId);
    setViewState({ ...viewState, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const lat = e.lngLat.lat;
    const lng = e.lngLat.lng;
    setNewPlace({
      lat,
      lng,
    });
  };

const handleLogout = () => {
  myStorage.removeItem("user");
  setCurrUser(null);
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPin = {
      username: currUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.lng,
    };

    try {
      const res = await axios.post("/api/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactMapGL
        {...viewState}
        width="100%"
        height="100%"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        transitionDuration="200"
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
        onDblClick={handleAddClick}
        doubleClickZoom={false}
      >
        {pins.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-3.5 * viewState.zoom}
              offsetTop={-7 * viewState.zoom}
            >
              <RoomIcon
                style={{
                  fontSize: viewState.zoom * 7,
                  color: p.username === currUser ? "tomato" : "purple",
                }}
                cursor="pointer"
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                longitude={p.long}
                latitude={p.lat}
                anchor="left"
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<StarIcon className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
            {newPlace && (
              <Popup
                latitude={newPlace.lat}
                longitude={newPlace.lng}
                onClose={() => setNewPlace(null)}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
              >
                <div>
                  <form onSubmit={handleSubmit}>
                    <label>Title</label>
                    <input
                      placeholder="Enter a title"
                      autoFocus
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Description</label>
                    <textarea
                      placeholder="Say something about this place."
                      onChange={(e) => setDesc(e.target.value)}
                    />
                    <label>Rating</label>
                    <select onChange={(e) => setRating(e.target.value)}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <button type="submit" className="submitButton">
                      Add Pin
                    </button>
                  </form>
                </div>
              </Popup>
            )}
          </>
        ))}

        {currUser ? (
          <button className="button logout" onClick={handleLogout}>Log out</button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>Login</button>
            <button className="button register" onClick={() => setShowRegister(true)}>Register</button>
          </div>
        )}

        {showRegister && <Register setShowRegister={setShowRegister}/>}
        {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrUser={setCurrUser}/>}    
        
      </ReactMapGL>
    </div>
  );
}

export default App;
