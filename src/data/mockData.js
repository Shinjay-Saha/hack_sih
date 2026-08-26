export const roads = [
  {
    id: "R001",
    name: "Main Market Road",
    score: 59.44,
    level: "MEDIUM",
    status: "OPEN",
    incidents: 12,
  },
  {
    id: "R002",
    name: "Station Road",
    score: 21.31,
    level: "LOW",
    status: "OPEN",
    incidents: 3,
  },
  {
    id: "R003",
    name: "NH-320 Junction",
    score: 65.8,
    level: "HIGH",
    status: "RESTRICTED",
    incidents: 18,
  },
  {
    id: "R004",
    name: "College Road",
    score: 42.15,
    level: "MEDIUM",
    status: "OPEN",
    incidents: 6,
  },
  {
    id: "R005",
    name: "Industrial Area Road",
    score: 74.2,
    level: "HIGH",
    status: "RESTRICTED",
    incidents: 21,
  },
];

export const stats = {
  totalRoads: 25,
  highRisk: 6,
  mediumRisk: 9,
  lowRisk: 10,
  incidents: 42,
};

export const incidents = [
  {
    type: "Accident",
    location: "NH-320 Junction",
    severity: "HIGH",
    time: "10 min ago",
  },
  {
    type: "Road Damage",
    location: "Industrial Area Road",
    severity: "HIGH",
    time: "35 min ago",
  },
  {
    type: "Traffic Congestion",
    location: "Main Market Road",
    severity: "MEDIUM",
    time: "1 hour ago",
  },
  {
    type: "Minor Collision",
    location: "College Road",
    severity: "LOW",
    time: "2 hours ago",
  },
];