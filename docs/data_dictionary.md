# Data Dictionary

## roads.csv

| Column | Type | Description | Example |
|---|---|---|---|
| road_id | string | Unique identifier for each road | R001 |
| state | string | Indian state where the road is located | Assam |
| district | string | District where the road is located | Dibrugarh |
| start_node | string | Starting node of the road in the road network | N001 |
| end_node | string | Ending node of the road in the road network | N002 |
| distance_km | float | Length of the road segment in kilometers | 12.5 |
| road_condition | string | Current physical condition of the road | moderate |
| elevation | float | Elevation of the road segment in meters | 245 |
| slope | float | Road slope represented as a percentage | 8.2 |
| soil_risk | float | Normalized soil instability risk from 0 to 1 | 0.72 |
| historical_landslides | integer | Number of historically recorded landslides affecting the road segment | 4 |
| rainfall | float | Rainfall measurement in millimeters | 180 |
| flood_risk | float | Normalized flood risk from 0 to 1 | 0.65 |
| status | string | Current operational status of the road | open |

## incidents.csv

| Column | Type | Description | Example |
|---|---|---|---|
| incident_id | string | Unique identifier for each incident | I001 |
| road_id | string | Identifier of the road affected by the incident | R001 |
| type | string | Type of incident reported on the road | landslide |
| severity | string | Severity level of the incident | high |
| latitude | float | Latitude of the incident location in decimal degrees | 27.4728 |
| longitude | float | Longitude of the incident location in decimal degrees | 94.9120 |
| description | string | Short description of the incident | Heavy landslide blocking road |
| timestamp | datetime | Date and time when the incident occurred or was reported | 2026-08-26T14:30:00 |
| verified | boolean | Whether the incident has been verified | true |

### Allowed values

**type:**
- landslide
- flood
- road_damage
- bridge_damage
- weather
- accident
- other

**severity:**
- low
- medium
- high
- critical

**verified:**
- true
- false

### Data relationship

`road_id` must reference an existing `road_id` in `roads.csv`.

### Numeric conventions

- `latitude` → decimal degrees
- `longitude` → decimal degrees

## vehicles.csv

| Column | Type | Description | Example |
|---|---|---|---|
| vehicle_id | string | Unique identifier for each vehicle | V001 |
| cargo_type | string | Type of cargo the vehicle is carrying or can carry | medicine |
| priority | integer | Priority level of the vehicle's assigned cargo, where 1 is highest priority | 1 |
| origin | string | Starting node/location of the vehicle's current assignment | N001 |
| destination | string | Destination node/location of the vehicle's current assignment | N007 |
| current_node | string | Current node/location of the vehicle | N003 |
| speed | float | Current or expected vehicle speed in km/h | 45.0 |
| status | string | Current operational status of the vehicle | in_transit |

### Allowed values

**cargo_type:**
- medicine
- food
- construction_material
- agricultural_produce
- other

**priority:**
- 1 = highest priority
- 2 = high priority
- 3 = normal priority
- 4 = low priority

**status:**
- available
- assigned
- in_transit
- delayed
- maintenance

### Data conventions

- `vehicle_id` must be unique.
- `priority = 1` means the highest priority.
- `speed` is measured in km/h.
- `origin`, `destination`, and `current_node` must use the same node naming system as `roads.csv`.

## shipments.csv

| Column | Type | Description | Example |
|---|---|---|---|
| shipment_id | string | Unique identifier for each shipment | S001 |
| cargo | string | Type of cargo being transported | medicine |
| priority | integer | Priority level of the shipment, where 1 is highest priority | 1 |
| origin | string | Starting node/location of the shipment | N001 |
| destination | string | Destination node/location of the shipment | N007 |
| quantity | float | Quantity of cargo being transported | 500 |
| vehicle_id | string | Identifier of the vehicle assigned to the shipment | V001 |
| eta | datetime | Estimated time of arrival at the destination | 2026-08-26T18:30:00 |
| status | string | Current status of the shipment | in_transit |

### Allowed values

**cargo:**
- medicine
- food
- construction_material
- agricultural_produce
- other

**priority:**
- 1 = highest priority
- 2 = high priority
- 3 = normal priority
- 4 = low priority

**status:**
- pending
- assigned
- in_transit
- delayed
- delivered
- cancelled

### Data relationships

- `vehicle_id` must reference an existing `vehicle_id` in `vehicles.csv`.
- `origin` and `destination` must use the same node naming system as `roads.csv`.

### Data conventions

- `shipment_id` must be unique.
- `priority = 1` means the highest priority.
- `quantity` must be greater than 0.
- `eta` must use ISO 8601 datetime format.

### Allowed values

**road_condition:**
- good
- moderate
- poor
- critical

**status:**
- open
- restricted
- blocked
- unknown

### Numeric conventions

- `distance_km` → kilometers
- `elevation` → meters
- `slope` → percentage
- `rainfall` → millimeters
- `soil_risk` → 0.0 to 1.0
- `flood_risk` → 0.0 to 1.0