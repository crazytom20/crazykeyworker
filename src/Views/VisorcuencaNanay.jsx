import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker, LayersControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import 'flowbite/dist/flowbite.css';

const center = {

  lat: -3.7491200,
  lng: -73.2538300,
};

const Visorcuencananay = () => {
  const googleApiKey = "AIzaSyA68xOsLic_QKxD4EcnwZDrtv-iE09-95M";
  const mapStyles = {
    Aubergine: require("./Stylemaps/aubergine-map-style.json"),
    Dark: require("./Stylemaps/dark-map-style.json"),
    Retro: require("./Stylemaps/retro-map-style.json"),
    Night: require("./Stylemaps/night-map-style.json"),
    Estandar: require("./Stylemaps/standard-map-style.json"),
  };

  const [selectedStyle, setSelectedStyle] = useState("Aubergine");
  const [markers, setMarkers] = useState([]);
  const [heatMapData, setHeatMapData] = useState([]);
  const [filteredParIntId, setFilteredParIntId] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://108.181.166.127/identiarbol/identiarbolbackend/public/api/datos');
        console.log('API Response:', response.data);

        if (response.data && typeof response.data === 'object') {
          const datos = response.data.datos;

          if (datos && Array.isArray(datos)) {
            const newMarkers = datos.map(item => ({
              position: [parseFloat(item.dat_txt_latitude), parseFloat(item.dat_txt_longitude)],
              name: `${item.dat_txt_latitude}, ${item.dat_txt_longitude}`,
              par_int_id: item.par_int_id,
            }));
            setMarkers(newMarkers);

            const groupedData = {};
            newMarkers.forEach(marker => {
              const key = marker.par_int_id;
              if (!groupedData[key]) groupedData[key] = [];
              groupedData[key].push(marker.position);
            });

            const heatMapData = Object.entries(groupedData).map(([key, value]) => ({
              id: key,
              positions: value,
            }));

            setHeatMapData(heatMapData);
          } else {
            console.error('La propiedad "datos" no es un array:', datos);
          }
        } else {
          console.error('La respuesta de la API no es un objeto JSON:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleStyleChange = newStyle => {
    setSelectedStyle(newStyle);
  };

  const handleParIntIdChange = event => {
    const newParIntId = event.target.value === "all" ? null : event.target.value || "default-value";
    setFilteredParIntId(newParIntId);
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <MapContainer center={center} zoom={9} style={{ width: '100%', height: '1000px' }}>
            <LayersControl position="topright">
              {Object.keys(mapStyles).map(style => (
                <LayersControl.BaseLayer
                  key={style}
                  checked={style === selectedStyle}
                  name={style + ' Map'}
                >
                  <ReactLeafletGoogleLayer apiKey={googleApiKey} type="roadmap" styles={mapStyles[style]} />
                </LayersControl.BaseLayer>
              ))}
            </LayersControl>

            <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1001 }}>
              <select onChange={handleParIntIdChange} value={filteredParIntId || ""}>
                <option value="all">All</option>
                {markers.map((marker, index) => (
                  <option key={index} value={marker.par_int_id}>
                    {marker.par_int_id}
                  </option>
                ))}
              </select>
              {/* Nuevo select para seleccionar números */}
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                {/* Agrega más opciones según sea necesario */}
              </select>
            </div>

            {markers.map((marker, index) => (
              <Marker key={index} position={marker.position}>
                <Popup>{marker.name}</Popup>
              </Marker>
            ))}
            <MapHeatLayer heatMapData={heatMapData} selectedParIntId={filteredParIntId} />
          </MapContainer>
        </div>
      </div>
    </>
  );
};

const MapHeatLayer = ({ heatMapData, selectedParIntId }) => {
  const map = useMap();

  useEffect(() => {
    const filteredHeatMapData = heatMapData
      .filter(data => selectedParIntId === "all" || String(data.id) === selectedParIntId)
      .flatMap(data => data.positions);

    const heatLayer = L.heatLayer(filteredHeatMapData).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [heatMapData, map, selectedParIntId]);

  return null;
};

export default Visorcuencananay;
