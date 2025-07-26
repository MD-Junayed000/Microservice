import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3004/trip/user/user123';

export default function TripList() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setTrips(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching trips:', err);
        setLoading(false);
      });
  }, []);

  const getStatusBadge = (status) => {
    const statusClass = `status-${status}`;
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
  };

  return (
    <div className="card">
      <h3>Your Trip History</h3>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          Loading your trips...
        </div>
      ) : trips.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          No trips found. Create your first trip!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {trips.map(trip => (
            <div key={trip.tripId} style={{ 
              padding: '16px', 
              border: '1px solid #e3f2fd', 
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.7)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <strong style={{ color: '#2d6cdf' }}>
                    {trip.pickupLocation?.address}
                  </strong>
                  <span style={{ margin: '0 8px', color: '#666' }}>→</span>
                  <strong style={{ color: '#2d6cdf' }}>
                    {trip.dropoffLocation?.address}
                  </strong>
                </div>
                {getStatusBadge(trip.status)}
              </div>
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.9rem', color: '#666' }}>
                <span>Fare: <strong>{trip.fare || 0} BDT</strong></span>
                {trip.duration && <span>Duration: <strong>{trip.duration} min</strong></span>}
                {trip.distance && <span>Distance: <strong>{trip.distance.toFixed(1)} km</strong></span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 