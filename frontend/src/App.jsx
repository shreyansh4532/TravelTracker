import { useEffect, useState } from 'react'
import './app.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import {format} from 'timeago.js';

function App() {

  const [pins, setPins] = useState([]);

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get('/pins');
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);


  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {pins.map(p => (
<>
      <Marker position={[p.lat, p.long]}>
        <Popup>
          <div className="card">
            <label>Place</label>
            <h4 className="place">{p.title}</h4>
            <label>Review</label>
            <p className='desc'>{p.desc}</p>
            <label>Rating</label>
            <div className="stars">
              <StarIcon className='star'/>
              <StarIcon className='star'/>
              <StarIcon className='star'/>
              <StarIcon className='star'/>
              <StarIcon className='star'/>
            </div>
            <label>Information</label>
            <span className="username">Created by <b>{p.username}</b></span>
            <span className="date">{format(p.createdAt)}</span>
          </div>
        </Popup>
      </Marker>
</>
      ))}
    </MapContainer>
  );
}

export default App;
