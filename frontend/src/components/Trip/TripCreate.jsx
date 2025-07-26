import React, { useState } from 'react';

const API_URL = 'http://localhost:3004/trip';

export default function TripCreate() {
  const [pickup, setPickup] = useState('CUET Main Gate');
  const [dropoff, setDropoff] = useState('CUET Library');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'user123',
          driverId: 'driver456',
          rideId: 'ride789',
          pickupLocation: {
            address: pickup,
            coordinates: { lat: 22.4607, lng: 91.9690 }
          },
          dropoffLocation: {
            address: dropoff,
            coordinates: { lat: 22.4610, lng: 91.9695 }
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        setMessage('✅ Trip created successfully!');
        setPickup('CUET Main Gate');
        setDropoff('CUET Library');
      } else {
        setMessage('❌ ' + (data.message || 'Failed to create trip'));
      }
    } catch (err) {
      setMessage('❌ Error creating trip. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h3>🚗 Book Your Ride</h3>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Enter your pickup and dropoff locations to book a ride.
      </p>
      
      <form className="flex-col" onSubmit={handleSubmit}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d6cdf' }}>
            Pickup Location
          </label>
          <input
            type="text"
            placeholder="e.g., CUET Main Gate"
            value={pickup}
            onChange={e => setPickup(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d6cdf' }}>
            Dropoff Location
          </label>
          <input
            type="text"
            placeholder="e.g., CUET Library"
            value={dropoff}
            onChange={e => setDropoff(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Trip...' : '🚀 Book Now'}
        </button>
        
        {message && (
          <div style={{ 
            padding: '12px', 
            borderRadius: '8px', 
            textAlign: 'center',
            fontWeight: '600',
            background: message.includes('✅') ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
            color: message.includes('✅') ? '#2e7d32' : '#d32f2f',
            border: `1px solid ${message.includes('✅') ? '#4caf50' : '#f44336'}`
          }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
} 