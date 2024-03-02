//import { useState } from 'react'
import './app.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import StarIcon from '@mui/icons-material/Star';

function App() {
  return (
    <MapContainer center={[48.8584, 2.2945]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[48.8584, 2.2945]}>
        <Popup>
          {/* A pretty CSS3 popup. <br /> Easily customizable. */}
          <div className="card">
            <label>Place</label>
            <h4 className="place">Eiffel Tower</h4>
            <label>Review</label>
            <p className='desc'>Beautiful place. I like it</p>
            <label>Rating</label>
            <div className="stars">
              <StarIcon className='star'/>
              <StarIcon className='star'/>
              <StarIcon className='star'/>
              <StarIcon className='star'/>
              <StarIcon className='star'/>
            </div>
            <label>Information</label>
            <span className="username">Created by <b>xyz</b></span>
            <span className="date">1 hour ago</span>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default App;
