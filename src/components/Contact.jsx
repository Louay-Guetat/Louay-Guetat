import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../scss/components/Contact.scss';
import L from 'leaflet';
import marker from '../images/marker.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Define custom marker icon
const customMarker = L.icon({
    iconUrl: marker, // Path to your custom SVG marker
    iconSize: [32, 32], // Size of the icon [width, height]
    iconAnchor: [15, 30], // Position to anchor the icon (bottom center for most markers)
    popupAnchor: [0, -30], // Position of the popup relative to the marker
});

const Contact = ({data}) => {
    return (
        <div className="contact-container">
            <div className="map">
                <MapContainer
                    center={data.coordonates}
                    zoom={window.innerWidth < 768 ? 20 : 17}
                    style={{ height: "720px", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                    />
                    <Marker position={data.coordonates} icon={customMarker}>
                        <Popup>
                            {data.adress}<br />
                            <a href={`mailto:${data.email_esprit}`}>{data.email_esprit}</a>
                        </Popup>
                    </Marker>
                </MapContainer>
                {/* Modal */}
                <div className="contact-modal">
                    <p><strong>{data.adress}</strong></p>
                    <p><a href={`"mailto:${data.email_esprit}"`}>{data.email_esprit}</a></p>
                    <p><a href={`mailto:${data.email_perso}`}>{data.email_perso}</a></p>
                    <p><strong>{data.phone}</strong></p>
                    <div className="buttons">
                        <a className="github-btn" href={data.github} target='_blank' rel="noreferrer"> <FontAwesomeIcon icon={faGithub} /> Github</a>
                        <a className="linkedin-btn" href={data.linkedin} target='_blank' rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} /> LinkedIn</a>
                        <a className="whatsapp-btn" href={`https://wa.me/${data.whatsapp}`} target='_blank' rel="noreferrer"><FontAwesomeIcon icon={faWhatsapp} /> WhatsApp</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
