import { useEffect, useState } from "react";
import "./app.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { format } from "timeago.js";

function App() {
  const currentUser = "Shreyansh";
  const [pins, setPins] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState("");

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

  const AddMarkerToClick = () => {
    useMapEvents({
      dblclick: (e) => {
        const { lat, lng } = e.latlng;
        console.log("Double Clicked:", lat, lng);
        console.log(e);
        setNewPlace({
          lat,
          lng,
        });
      },
    });
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating: Number(rating),
      lat: newPlace.lat,
      long: newPlace.lng,
    }

    try {
      const res = await axios.post("api/pins", newPin);
      setPins([...pins, res.data]);
    } catch(err) {
      console.log(err);
    }
  }

  // onclick of form --->
  // const handleFormClick = (e) => {
  //   e.stopPropagation();
  // }

  return (
    <div className="app">
      <MapContainer
        center={[22.6708, 71.5724]}
        zoom={8}
        scrollWheelZoom={true}
        doubleClickZoom={false}
      >
        <AddMarkerToClick />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pins.map((p) => (
          <>
            <Marker position={[p.lat, p.long]}>
              <Popup>
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    <StarIcon className="star" />
                    <StarIcon className="star" />
                    <StarIcon className="star" />
                    <StarIcon className="star" />
                    <StarIcon className="star" />
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            </Marker>
          </>
        ))}
        {newPlace && (
          <Popup position={[newPlace.lat, newPlace.lng]}>
            <div>
              <form onSubmit={handleSubmit}>
              <label htmlFor="">Title</label>
              <input type="text" placeholder="Enter a title" value={title} onChange={(e) => 
               setTitle(e.target.value) 
              }/>
              <label htmlFor="">Reviews</label>
              <textarea type="text" placeholder="Say something about this place..." value={desc} onChange={(e) => 
                setDesc(e.target.value)
              }/>
              <label htmlFor="">Rating</label>
              <select value={rating} onChange={(e) => 
                setRating(e.target.value)
              }>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button className="submitButton" type="submit">Add pin</button>
              </form>
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
}

export default App;
