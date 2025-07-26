# Trip Service

The Trip Service is a microservice responsible for managing trip lifecycle in the RickshawX platform. It handles trip creation, starting/ending trips, fare calculation, and trip ratings.

## Features

- **Trip Lifecycle Management**: Create, start, end, and cancel trips
- **Fare Calculation**: Automatic fare calculation based on distance and duration
- **Caching**: Redis-based caching for improved performance
- **Event-Driven Architecture**: RabbitMQ integration for inter-service communication
- **Rating System**: Allow users to rate and review completed trips
- **Pagination**: Support for paginated trip history

## API Endpoints

### Create Trip
```
POST /trip
```
Creates a new trip with pending status.

**Request Body:**
```json
{
  "userId": "user123",
  "driverId": "driver456",
  "rideId": "ride789",
  "pickupLocation": {
    "address": "CUET Main Gate",
    "coordinates": {
      "lat": 22.4607,
      "lng": 91.9690
    }
  },
  "dropoffLocation": {
    "address": "CUET Library",
    "coordinates": {
      "lat": 22.4610,
      "lng": 91.9695
    }
  }
}
```

### Start Trip
```
PUT /trip/:tripId/start
```
Starts a pending trip and records the start time.

### End Trip
```
PUT /trip/:tripId/end
```
Ends a started trip, calculates fare, and records end time.

**Request Body (optional):**
```json
{
  "endLocation": {
    "address": "CUET Library",
    "coordinates": {
      "lat": 22.4610,
      "lng": 91.9695
    }
  }
}
```

### Get Trip
```
GET /trip/:tripId
```
Retrieves trip details by trip ID.

### Get User Trips
```
GET /trip/user/:userId?page=1&limit=10&status=completed
```
Retrieves paginated trip history for a user.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `status`: Filter by trip status (optional)

### Rate Trip
```
POST /trip/:tripId/rate
```
Rate and review a completed trip.

**Request Body:**
```json
{
  "rating": 5,
  "review": "Great ride experience!"
}
```

### Cancel Trip
```
PUT /trip/:tripId/cancel
```
Cancels a pending trip.

## Trip Status Flow

1. **pending** → **started** → **completed**
2. **pending** → **cancelled**

## Fare Calculation

Fare is calculated using the formula:
```
Fare = Base Fare + (Distance × Per Km Rate) + (Duration × Per Minute Rate)
```

Where:
- Base Fare: 20 BDT
- Per Km Rate: 15 BDT
- Per Minute Rate: 2 BDT

## Environment Variables

- `PORT`: Service port (default: 3004)
- `MONGO_URL`: MongoDB connection string
- `REDIS_URL`: Redis connection string
- `RABBITMQ_URL`: RabbitMQ connection string
- `JWT_SECRET`: JWT secret for authentication

## Dependencies

- **Express.js**: Web framework
- **Mongoose**: MongoDB ODM
- **Redis**: Caching layer
- **RabbitMQ**: Message broker
- **Joi**: Request validation
- **CORS**: Cross-origin resource sharing

## Running the Service

### Development
```bash
cd services/trip
npm install
npm run dev
```

### Production
```bash
cd services/trip
npm install
npm start
```

### Docker
```bash
docker-compose up trip
```

## Event Publishing

The service publishes the following events to RabbitMQ:

- `trip.created`: When a new trip is created
- `trip.started`: When a trip is started
- `trip.completed`: When a trip is completed
- `trip.rated`: When a trip is rated
- `trip.cancelled`: When a trip is cancelled

## Event Consumption

The service consumes events from:

- `payment_queue`: Payment-related events
- `ride_queue`: Ride-related events

## Health Check

```
GET /health
```

Returns service status and health information. 