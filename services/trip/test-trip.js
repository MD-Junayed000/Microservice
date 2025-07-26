const axios = require('axios');

const BASE_URL = 'http://localhost:3004';

async function testTripService() {
  try {
    console.log('🧪 Testing Trip Service...\n');

    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data);
    console.log('');

    // Test 2: Create Trip
    console.log('2. Creating a new trip...');
    const tripData = {
      userId: 'user123',
      driverId: 'driver456',
      rideId: 'ride789',
      pickupLocation: {
        address: 'CUET Main Gate',
        coordinates: {
          lat: 22.4607,
          lng: 91.9690
        }
      },
      dropoffLocation: {
        address: 'CUET Library',
        coordinates: {
          lat: 22.4610,
          lng: 91.9695
        }
      }
    };

    const createResponse = await axios.post(`${BASE_URL}/trip`, tripData);
    console.log('✅ Trip Created:', createResponse.data);
    const tripId = createResponse.data.data.tripId;
    console.log('');

    // Test 3: Get Trip
    console.log('3. Getting trip details...');
    const getResponse = await axios.get(`${BASE_URL}/trip/${tripId}`);
    console.log('✅ Trip Details:', getResponse.data);
    console.log('');

    // Test 4: Start Trip
    console.log('4. Starting the trip...');
    const startResponse = await axios.put(`${BASE_URL}/trip/${tripId}/start`);
    console.log('✅ Trip Started:', startResponse.data);
    console.log('');

    // Test 5: End Trip
    console.log('5. Ending the trip...');
    const endResponse = await axios.put(`${BASE_URL}/trip/${tripId}/end`);
    console.log('✅ Trip Ended:', endResponse.data);
    console.log('');

    // Test 6: Rate Trip
    console.log('6. Rating the trip...');
    const ratingData = {
      rating: 5,
      review: 'Great ride experience! Very professional driver.'
    };
    const rateResponse = await axios.post(`${BASE_URL}/trip/${tripId}/rate`, ratingData);
    console.log('✅ Trip Rated:', rateResponse.data);
    console.log('');

    // Test 7: Get User Trips
    console.log('7. Getting user trip history...');
    const userTripsResponse = await axios.get(`${BASE_URL}/trip/user/user123`);
    console.log('✅ User Trips:', userTripsResponse.data);
    console.log('');

    console.log('🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run the test
testTripService(); 