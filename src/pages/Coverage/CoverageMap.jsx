import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const defaultIcon = L.icon({
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const FocusMap = ({ coords }) => {
    const map = useMap();

    useEffect(() => {
        if (coords) {
            map.flyTo(coords, 14, {
                animate: true,
                duration: 1.5, // duration in seconds
            });
        }
    }, [coords, map]);

    return null;
};

const CoverageMap = ({ serviceCenters, searchTerm }) => {
    const matchedDistrict =
    searchTerm.trim() !== ""
      ? serviceCenters.find((d) =>
          d.district.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : null;
    return (
        <div className="min-h-screen px-4 py-10">


            {/* MAP */}
            <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
                <MapContainer
                    center={[23.685, 90.3563]}
                    zoom={8}
                    scrollWheelZoom={true}
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Focus map if search matches */}
                    {matchedDistrict && (
                        <FocusMap coords={[matchedDistrict.latitude, matchedDistrict.longitude]} />
                    )}

                    {serviceCenters.map((d, i) => (
                        <Marker key={i} position={[d.latitude, d.longitude]} icon={defaultIcon}>
                            <Popup>
                                <div className="w-72 space-y-3 font-sans">
                                    <div className="border-b pb-2">
                                        <h2 className="text-lg font-bold text-primary">{d.district}</h2>
                                        <p className="text-sm text-gray-500">{d.region} Region</p>
                                    </div>
                                    <div>
                                        <span className="badge badge-success badge-sm">{d.status.toUpperCase()}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-1">Covered Areas:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {d.covered_area.map((area, idx) => (
                                                <span key={idx} className="badge badge-outline badge-sm">{area}</span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default CoverageMap;
