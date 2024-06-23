# Cop Vehicle Selection Backend

This is the backend for the Cop Vehicle Selection application. It provides endpoints to get the list of cities, vehicles, and handle the capture logic where cops select vehicles to travel to different cities.

## Directory Structure

project-root/
│
├── config/
│ ├── cities.js
│ ├── vehicles.js
│ └── config.js (optional for other configurations)
│
├── controllers/
│ ├── captureController.js
│ └── dataController.js
│
├── routes/
│ ├── captureRoutes.js
│ └── dataRoutes.js
│
├── .env
│
├── index.js
│
├── package.json
│
└── README.md


## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/priyesh0029/yocket-_assessment.git
    ```
2. Navigate to the project directory:
    ```sh
    cd your-repository
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Create a `.env` file in the root directory and add the following:
    ```plaintext
    PORT=3000
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```
2. The server will run on the port specified in the `.env` file (default is `3000`).

## API Endpoints

### Get Cities

- **URL**: `/cities`
- **Method**: `GET`
- **Description**: Returns a list of cities.

#### Response
```json
[
  { "name": "Yapkashnagar", "distance": 60 },
  { "name": "Lihaspur", "distance": 50 },
  { "name": "Narmis City", "distance": 40 },
  { "name": "Shekharvati", "distance": 30 },
  { "name": "Nuravgram", "distance": 20 }
]


### Get Vehicles

- **URL**: `/vehicles`
- **Method**: `GET`
- **Description**: Returns a list of vehicles.

#### Response
```json
[
  { "kind": "EV Bike", "range": 60, "count": 2 },
  { "kind": "EV Car", "range": 100, "count": 1 },
  { "kind": "EV SUV", "range": 120, "count": 1 }
]


### post Capture

- **URL**: `/capture`
- **Method**: `POST`
- **Description**: Captures the fugitive based on the cops' selections.

#### Request body
```json
[
  { "copName": "Cop1", "city": "Yapkashnagar","vehicle" :"EV SUV" },
  { "copName": "Cop2", "city": "Lihaspur","vehicle" :"EV CAR"  },
  { "copName": "Cop3", "city": "Nuravgram","vehicle" :"EV BIKE"  }
]

#### Response
```json
##### Success
{ "success": true, "cop": "Cop1" }
##### Failure
{ "success": false }



### Explanation:
1. **Title and Description**: Briefly explain the purpose of the project.
2. **Directory Structure**: Provide an overview of the project structure.
3. **Installation**: Step-by-step instructions to set up the project locally.
4. **Usage**: Instructions on how to run the application.
5. **API Endpoints**: Detailed descriptions of available endpoints, including request methods, URLs, descriptions, and example responses.

This structure ensures that the `README.md` is clear, concise, and provides all necessary information to understand, set up, and contribute to the project.

