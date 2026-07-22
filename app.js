"use strict";

var _jsxRuntime = require("/home/claude/.npm-global/lib/node_modules/playwright/jsx-runtime");
const {
  useState,
  useEffect,
  useRef,
  useCallback
} = React;

// ---------- Lightweight inline icon set (no external dependency) ----------
function Icon({
  children,
  size = 20,
  color,
  fill = "none",
  className = "",
  strokeWidth = 2
}) {
  return (0, _jsxRuntime.jsx)("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill,
    stroke: fill !== "none" ? "none" : color || "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className,
    style: {
      color: color || "currentColor"
    },
    children: children
  });
}
const Plus = p => (0, _jsxRuntime.jsxs)(Icon, {
  ...p,
  children: [(0, _jsxRuntime.jsx)("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), (0, _jsxRuntime.jsx)("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  })]
});
const X = p => (0, _jsxRuntime.jsxs)(Icon, {
  ...p,
  children: [(0, _jsxRuntime.jsx)("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), (0, _jsxRuntime.jsx)("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })]
});
const Radio = p => (0, _jsxRuntime.jsxs)(Icon, {
  ...p,
  children: [(0, _jsxRuntime.jsx)("circle", {
    cx: "12",
    cy: "12",
    r: "2"
  }), (0, _jsxRuntime.jsx)("path", {
    d: "M8.5 8.5a5 5 0 000 7M15.5 8.5a5 5 0 010 7M5.5 5.5a9 9 0 000 13M18.5 5.5a9 9 0 010 13"
  })]
});
const Users = p => (0, _jsxRuntime.jsxs)(Icon, {
  ...p,
  children: [(0, _jsxRuntime.jsx)("path", {
    d: "M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"
  }), (0, _jsxRuntime.jsx)("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), (0, _jsxRuntime.jsx)("path", {
    d: "M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
  })]
});
const Layers = p => (0, _jsxRuntime.jsxs)(Icon, {
  ...p,
  children: [(0, _jsxRuntime.jsx)("polygon", {
    points: "12,2 22,8 12,14 2,8"
  }), (0, _jsxRuntime.jsx)("polyline", {
    points: "2,15 12,21 22,15"
  }), (0, _jsxRuntime.jsx)("polyline", {
    points: "2,11.5 12,17.5 22,11.5"
  })]
});
const Droplet = p => (0, _jsxRuntime.jsx)(Icon, {
  ...p,
  children: (0, _jsxRuntime.jsx)("path", {
    d: "M12 2s7 7.5 7 12a7 7 0 01-14 0c0-4.5 7-12 7-12z"
  })
});
const ShieldCheck = p => (0, _jsxRuntime.jsxs)(Icon, {
  ...p,
  children: [(0, _jsxRuntime.jsx)("path", {
    d: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"
  }), (0, _jsxRuntime.jsx)("polyline", {
    points: "9,12 11,14 15,10"
  })]
});
const ClipboardList = p => (0, _jsxRuntime.jsxs)(Icon, {
  ...p,
  children: [(0, _jsxRuntime.jsx)("rect", {
    x: "5",
    y: "4",
    width: "14",
    height: "17",
    rx: "2"
  }), (0, _jsxRuntime.jsx)("rect", {
    x: "9",
    y: "2",
    width: "6",
    height: "4",
    rx: "1"
  }), (0, _jsxRuntime.jsx)("line", {
    x1: "8",
    y1: "11",
    x2: "16",
    y2: "11"
  }), (0, _jsxRuntime.jsx)("line", {
    x1: "8",
    y1: "15",
    x2: "16",
    y2: "15"
  })]
});
const Play = p => (0, _jsxRuntime.jsx)(Icon, {
  ...p,
  fill: p.fill || "currentColor",
  children: (0, _jsxRuntime.jsx)("polygon", {
    points: "6,3 20,12 6,21"
  })
});
const Square = p => (0, _jsxRuntime.jsx)(Icon, {
  ...p,
  children: (0, _jsxRuntime.jsx)("rect", {
    x: "4",
    y: "4",
    width: "16",
    height: "16",
    rx: "2"
  })
});
const Check = p => (0, _jsxRuntime.jsx)(Icon, {
  ...p,
  fill: "none",
  children: (0, _jsxRuntime.jsx)("polyline", {
    points: "20,6 9,17 4,12"
  })
});
const AlertTriangle = p => (0, _jsxRuntime.jsxs)(Icon, {
  ...p,
  children: [(0, _jsxRuntime.jsx)("path", {
    d: "M12 3l10 18H2z"
  }), (0, _jsxRuntime.jsx)("line", {
    x1: "12",
    y1: "9",
    x2: "12",
    y2: "14"
  }), (0, _jsxRuntime.jsx)("circle", {
    cx: "12",
    cy: "17.5",
    r: "0.5",
    fill: p.color || "currentColor"
  })]
});
const MapPin = p => (0, _jsxRuntime.jsxs)(Icon, {
  ...p,
  children: [(0, _jsxRuntime.jsx)("path", {
    d: "M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"
  }), (0, _jsxRuntime.jsx)("circle", {
    cx: "12",
    cy: "10",
    r: "2.5"
  })]
});

// ---------- Storage shim: localStorage instead of Claude's window.storage ----------
window.storage = {
  async get(key) {
    const raw = window.localStorage.getItem(key);
    if (raw === null) throw new Error("not found");
    return {
      key,
      value: raw
    };
  },
  async set(key, value) {
    window.localStorage.setItem(key, value);
    return {
      key,
      value
    };
  },
  async delete(key) {
    window.localStorage.removeItem(key);
    return {
      key,
      deleted: true
    };
  },
  async list(prefix) {
    const keys = Object.keys(window.localStorage).filter(k => !prefix || k.startsWith(prefix));
    return {
      keys,
      prefix
    };
  }
};

// ---------- Theme ----------
const theme = {
  bg: "#0a1530",
  panel: "#0e1c38",
  panelAlt: "#122a52",
  border: "#223a6a",
  borderSoft: "#1a2f5c",
  textPrimary: "#f3ede0",
  textSecondary: "#8fa3c9",
  textDim: "#5f7aa8",
  red: "#a72b2a",
  redDim: "#3a1f1f",
  amber: "#d98c2b",
  amberDim: "#3a2a16",
  green: "#3f9142",
  greenDim: "#16311c",
  blue: "#4a7fc0",
  blueDim: "#16305c",
  gold: "#e3b23c",
  goldDim: "#3a2f14"
};
const mono = "ui-monospace, 'SF Mono', 'Roboto Mono', monospace";
const CYFAIR_LOGO = "data:image/jpeg;base64,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";
const STRATEGIES = ["Investigative", "Offensive", "Defensive"];
const SIZE_OPTS = ["Small", "Medium", "Large", "Mega"];
const HEIGHT_OPTS = ["1 Story", "2 Story", "3 Story", "4 Story", "Other"];
const OCCUPANCY_OPTS = ["Residential", "Multi-Family", "Commercial", "Strip Mall", "Big Box"];
const PROBLEM_OPTS = ["Nothing Showing", "Smoke Showing", "Fire Showing"];
const SIDE_OPTS = ["A", "B", "C", "D"];
const UNIT_OPTIONS = ["CF09", "BC-07", "BC-09", "BC-11", "BC-14", "BC-15", "E-01", "E-02", "L-02", "E-03", "R-03", "E-04", "T-04", "E-05", "E-06", "R-06", "E-07", "TW-07", "E-08", "R-08", "E-09", "TW-09", "E-10", "E-11", "E-12", "T-12", "E-13", "L-13", "R-13", "L-14", "L-15", "L-16", "TW-17", "E-18", "E-19", "E-20", "E-21", "SF-1", "SF-2", "SF-3", "SF-4", "SF-5", "SF-6", "RH-1", "RH-2"];
const MEDIC_UNIT_OPTIONS = ["APP-02", "APP-05", "APP-09", "APP-15", "BC-13", "M-01", "M-02", "M-502", "M-03", "M-04", "M-05", "M-505", "M-06", "M-07", "M-08", "M-508", "M-09", "M-509", "M-10", "M-11", "M-12", "M-13", "M-14", "M-15", "M-16", "M-17", "M-18", "M-19", "M-20", "M-21"];
const TASK_CHECKLIST = [{
  key: "command",
  label: "Incident Command",
  type: "simple"
}, {
  key: "division",
  label: "Division",
  type: "segmented",
  options: ["Alpha", "Bravo", "Charlie", "Delta"]
}, {
  key: "investigating",
  label: "Investigating",
  type: "simple"
}, {
  key: "fireControl",
  label: "Fire Control",
  type: "simple"
}, {
  key: "primarySearch",
  label: "Primary Search",
  type: "segmented",
  options: ["In Progress", "All Clear", "Victim Found"]
}, {
  key: "ventilation",
  label: "Ventilation",
  type: "segmented",
  options: ["Vertical", "Horizontal"]
}, {
  key: "lossStopped",
  label: "Extension/Overhaul",
  type: "simple"
}, {
  key: "propertyConservation",
  label: "Property Conservation",
  type: "simple"
}, {
  key: "rit",
  label: "RIT",
  type: "simple"
}, {
  key: "secondarySearch",
  label: "Secondary Search",
  type: "segmented",
  options: ["In Progress", "All Clear", "Victim Found"]
}, {
  key: "par",
  label: "PAR",
  type: "simple"
}];
const ROOF_CHECKLIST = [{
  key: "roofLoads",
  label: "Roof Loads"
}, {
  key: "firewalls",
  label: "Firewalls"
}, {
  key: "ventComplete",
  label: "Ventilation Complete"
}, {
  key: "par",
  label: "PAR"
}];
const UTILITIES_ITEMS = [{
  key: "electric",
  label: "Electric"
}, {
  key: "gas",
  label: "Gas"
}, {
  key: "water",
  label: "Water"
}];
const MUTUAL_AID_ITEMS = [{
  key: "fire",
  label: "Fire"
}, {
  key: "hcfmo",
  label: "HCFMO"
}, {
  key: "lawEnforcement",
  label: "Law Enforcement"
}, {
  key: "hazmat",
  label: "HAZMAT"
}, {
  key: "buildingMaintenance",
  label: "Building Maintenance"
}, {
  key: "redCross",
  label: "Red Cross"
}];
const MUTUAL_AID_FIRE_DEPTS = ["HCESD 48", "WHESD 200", "Cypress Creek", "Jersey Village", "Houston", "Spring Creek"];
const SAFETY_ITEMS = [{
  key: "hazardId",
  label: "Hazard Identification"
}, {
  key: "utilitiesSecured",
  label: "Utilities Secured"
}, {
  key: "collapseZones",
  label: "Collapse Zones"
}, {
  key: "secondaryWaterSupply",
  label: "Secondary Water Supply"
}, {
  key: "meansOfEgress",
  label: "Means of Egress"
}, {
  key: "sceneLighting",
  label: "Scene Lighting"
}];
const RIT_ITEMS = [{
  key: "assess",
  label: "Assess"
}, {
  key: "equipment",
  label: "Equipment"
}, {
  key: "monitor",
  label: "Monitor"
}, {
  key: "softenEgress",
  label: "Soften Egress"
}, {
  key: "par",
  label: "PAR"
}];
const MEDICAL_REHAB_ITEMS = [{
  key: "medical",
  label: "Medical"
}, {
  key: "rehab",
  label: "Rehab"
}, {
  key: "par",
  label: "PAR"
}];
const COMMAND_TRANSFER_ITEMS = [{
  key: "confirmUnitAssignments",
  label: "Confirm Unit Assignments"
}, {
  key: "canReport",
  label: "CAN Report (1st Arriving)"
}, {
  key: "assumeCommand",
  label: "Assume Command"
}, {
  key: "strategyConfirmation",
  label: "Strategy Confirmation"
}, {
  key: "additionalResources",
  label: "Additional Resources"
}, {
  key: "electronicAccountability",
  label: "Electronic Accountability"
}];
const LIFE_FLIGHT_COMMAND_TRANSFER_ITEMS = COMMAND_TRANSFER_ITEMS.filter(it => it.key !== "strategyConfirmation" && it.key !== "electronicAccountability");
const RESOURCES_ITEMS = [{
  key: "hold",
  label: "Hold"
}, {
  key: "upgrade",
  label: "Upgrade"
}, {
  key: "return_",
  label: "Downgrade"
}];
const TABS = [{
  key: "worksheet",
  label: "Tactical Worksheet",
  icon: ClipboardList
}, {
  key: "mayday",
  label: "MAYDAY Checklist",
  icon: AlertTriangle
}, {
  key: "lifeflight",
  label: "Life Flight Operations",
  icon: MapPin
}, {
  key: "log",
  label: "Log",
  icon: Radio
}];
const MAYDAY_WHAT_OPTIONS = ["Lost", "Trapped", "Injured", "Out of Air", "SCBA Malfunction", "Other"];
const MAYDAY_DIVISION_OPTIONS = ["1", "2", "3", "4", "Other"];
const WIND_DIRECTION_OPTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
const TAC_CHANNEL_OPTIONS = ["TAC-03", "TAC-04", "TAC-05", "Other"];
const GROUND_CONTACT_CHANNEL_OPTIONS = ["HCMA-02", "Other"];
const LIFE_FLIGHT_UNIT_OPTIONS = ["LF-1", "LF-2", "LF-3", "LF-4", "LF-5", "LF-6", "Other"];
const LZ_HAZARDS_ITEMS = [{
  key: "wires",
  label: "Overhead Wires"
}, {
  key: "polesTowers",
  label: "Poles / Towers"
}, {
  key: "trees",
  label: "Trees"
}, {
  key: "debrisDust",
  label: "Loose Debris / Dust"
}, {
  key: "vehicles",
  label: "Vehicles"
}, {
  key: "personnel",
  label: "Personnel / Bystanders Clear (100 ft)"
}, {
  key: "livestockFencing",
  label: "Livestock / Fencing"
}];
const LZ_SURFACE_ITEMS = [{
  key: "firmLevel",
  label: "Firm & Level Surface"
}, {
  key: "freeOfDebris",
  label: "Free of Loose Debris"
}];
const LZ_LIGHTING_ITEMS = [{
  key: "cornersMarked",
  label: "Corners Marked (Cones/Flares/Personnel)"
}, {
  key: "windIndicator",
  label: "Windsock / Wind Indicator Visible"
}];
const SUPPRESSION_ASSIGNMENT_OPTIONS = ["Incident Command", "Ground Contact", "Rescue Group", "Medical Group", "Landing Zone", "Safety"];
const EMS_ASSIGNMENT_OPTIONS = ["Medical Group"];
const PATIENT_INTERVENTION_ITEMS = [{
  key: "bloodAdministration",
  label: "Blood Administration"
}, {
  key: "cpr",
  label: "CPR"
}, {
  key: "emergentAirway",
  label: "Emergent Airway"
}, {
  key: "tourniquet",
  label: "Tourniquet"
}, {
  key: "other",
  label: "Other"
}];
const STORAGE_KEY = "active-incident-v2";
function formatElapsed(ms) {
  if (ms == null || ms < 0) ms = 0;
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor(totalSec % 3600 / 60);
  const s = totalSec % 60;
  const pad = n => String(n).padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}
function uid() {
  return Math.random().toString(36).slice(2, 9);
}
const STREET_SUFFIXES = ["rd", "road", "st", "street", "ave", "avenue", "dr", "drive", "ln", "lane", "blvd", "boulevard", "ct", "court", "cir", "circle", "pkwy", "parkway", "way", "ter", "terrace", "pl", "place", "trl", "trail", "hwy", "highway", "cv", "cove", "xing", "crossing", "loop", "run", "pass", "sq", "square"];
function deriveCommandName(address) {
  if (!address) return "";
  const streetPart = address.split(",")[0];
  let tokens = streetPart.trim().split(/\s+/).filter(Boolean);
  tokens = tokens.filter(t => !/^#?\d+[a-zA-Z]?$/.test(t));
  if (tokens.length > 1) {
    const last = tokens[tokens.length - 1].toLowerCase().replace(/\./g, "");
    if (STREET_SUFFIXES.includes(last)) tokens = tokens.slice(0, -1);
  }
  if (tokens.length === 0) return "";
  const name = tokens.map(t => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()).join(" ");
  return `${name} Command`;
}
function emptyTaskSlot(n) {
  const checks = {};
  TASK_CHECKLIST.forEach(c => checks[c.key] = null);
  return {
    id: uid(),
    label: `Task ${n}`,
    unit: "",
    fireControlSide: null,
    fireControlDoor: null,
    checks
  };
}
function emptyBoolMap(items) {
  const m = {};
  items.forEach(i => m[i.key] = null);
  return m;
}
const emptyState = () => ({
  address: "",
  incidentType: "",
  startTime: null,
  sizeUp: {
    size: null,
    height: null,
    heightOther: "",
    occupancy: null,
    problem: null,
    smokeLevel: null,
    // Light / Heavy
    fireMode: null,
    // Working / Defensive
    floor: "",
    floorOther: "",
    side: null,
    centerUnit: null,
    endUnit: null,
    waterSupplyEstablished: null,
    waterSupplyUnitLocation: "",
    fdc: null,
    fdcSide: null
  },
  command: {
    strategy: null,
    name: "",
    location: ""
  },
  followUp: {
    threeSixty: null,
    threeSixtyStatus: null,
    // Complete / Incomplete
    threeSixtyIncompleteReason: null,
    threeSixtyIncompleteOther: "",
    hazards: "",
    exposures: null,
    exposureA: null,
    exposureB: null,
    exposureC: null,
    exposureD: null,
    ticReading: "",
    accountability: ""
  },
  resources: emptyBoolMap(RESOURCES_ITEMS),
  alarmLevel: "",
  alarmLevelOther: "",
  level2Staging: "",
  commandTransfer: emptyBoolMap(COMMAND_TRANSFER_ITEMS),
  strategyConfirmationMode: null,
  // Offensive / Defensive
  box: "",
  alarms: "",
  firstAlarmUnits: [],
  secondAlarmUnits: [],
  thirdAlarmUnits: [],
  fourthAlarmUnits: [],
  firstAlarmEmsUnits: [],
  secondAlarmEmsUnits: [],
  thirdAlarmEmsUnits: [],
  fourthAlarmEmsUnits: [],
  waterSupply: {
    unit: "",
    source: "",
    fdc: ""
  },
  utilities: emptyBoolMap(UTILITIES_ITEMS),
  mutualAid: {
    ...emptyBoolMap(MUTUAL_AID_ITEMS),
    fireDept: ""
  },
  safety: emptyBoolMap(SAFETY_ITEMS),
  rit: emptyBoolMap(RIT_ITEMS),
  medicalRehab: {
    ...emptyBoolMap(MEDICAL_REHAB_ITEMS),
    medicalUnit: "",
    medicalSide: null,
    rehabSide: null
  },
  taskSlots: [1, 2, 3, 4, 5, 6, 7, 8].map(emptyTaskSlot),
  roof: {
    type: null,
    condition: null,
    atticConditions: null,
    atticInvolvement: null,
    checks: emptyBoolMap(ROOF_CHECKLIST)
  },
  mayday: {
    sems: null,
    unitInAlarm: null,
    unitInAlarmId: "",
    airSupplyStep1: null,
    airSupplyStep1Value: "",
    mobileRadio: null,
    mobileRadioId: "",
    step2: null,
    step3: null,
    whoName: "",
    whoUnit: "",
    whoUnitManual: false,
    what: null,
    whatOther: "",
    whereSide: null,
    whereDivision: null,
    whereDivisionOther: "",
    airSupply: "",
    airSupplyManual: false,
    step4: null,
    step5: null,
    rescueGroup: [],
    rescueGroupOther: "",
    step6: null,
    step7: null,
    step8: null,
    step9AdditionalRit: null,
    step9AdditionalDivisionOfficer: null,
    step9Level2Staging: null,
    level2StagingLocation: "",
    managerType: null,
    managerDivision: null,
    managerOther: "",
    step10: null,
    step10Transmit: null
  },
  lifeFlight: {
    tacChannel: null,
    tacChannelOther: "",
    groundContactChannel: null,
    groundContactChannelOther: "",
    lifeFlightUnit: null,
    lifeFlightUnitOther: "",
    safelyOnGround: null,
    safelyOffGround: null,
    suppressionUnits: [],
    emsUnits: [],
    problem: null,
    problemOther: "",
    mvaEntrapment: null,
    mvaEjection: null,
    numberOfPatients: null,
    numberOfPatientsOther: "",
    landingZoneLocation: "",
    surface: emptyBoolMap(LZ_SURFACE_ITEMS),
    hazards: emptyBoolMap(LZ_HAZARDS_ITEMS),
    lighting: emptyBoolMap(LZ_LIGHTING_ITEMS),
    windDirection: null,
    windSpeed: "",
    patients: []
  },
  parLog: [],
  log: []
});

// ---------- Small reusable UI pieces ----------
function BadgeIcon({
  size = 28
}) {
  const h = size * 1.07;
  return (0, _jsxRuntime.jsx)("img", {
    src: CYFAIR_LOGO,
    alt: "Cy-Fair Fire Department",
    width: size,
    height: h,
    className: "shrink-0 rounded",
    style: {
      objectFit: "cover",
      border: `1px solid ${theme.gold}`
    }
  });
}
function CollapsibleSection({
  title,
  children,
  borderAccent,
  defaultOpen = false,
  forceOpen = false
}) {
  const [open, setOpen] = useState(defaultOpen || forceOpen);
  useEffect(() => {
    if (forceOpen) setOpen(true);
  }, [forceOpen]);
  return (0, _jsxRuntime.jsxs)("div", {
    className: "rounded-lg p-4",
    style: {
      background: theme.panel,
      border: `1px solid ${theme.border}`,
      borderLeft: borderAccent ? `3px solid ${borderAccent}` : undefined
    },
    children: [(0, _jsxRuntime.jsxs)("button", {
      onClick: () => setOpen(v => !v),
      className: "w-full flex items-center justify-between text-left",
      children: [(0, _jsxRuntime.jsx)("h3", {
        className: "text-xs font-bold uppercase tracking-wide",
        style: {
          color: theme.textSecondary
        },
        children: title
      }), (0, _jsxRuntime.jsx)("span", {
        className: "text-sm font-bold",
        style: {
          color: theme.textDim
        },
        children: open ? "−" : "+"
      })]
    }), open && (0, _jsxRuntime.jsx)("div", {
      className: "mt-3",
      children: children
    })]
  });
}
function GroupHeader({
  children
}) {
  return (0, _jsxRuntime.jsxs)("div", {
    className: "flex items-center gap-3",
    children: [(0, _jsxRuntime.jsx)("h2", {
      className: "text-sm font-bold uppercase tracking-widest shrink-0",
      style: {
        color: theme.textPrimary,
        letterSpacing: "0.08em"
      },
      children: children
    }), (0, _jsxRuntime.jsx)("div", {
      className: "flex-1 h-px",
      style: {
        background: theme.border
      }
    })]
  });
}
function Section({
  title,
  children,
  accent,
  glow,
  fill,
  borderAccent
}) {
  return (0, _jsxRuntime.jsxs)("div", {
    className: `rounded-lg p-4${fill ? " h-full flex flex-col" : ""}`,
    style: {
      background: glow ? theme.blueDim : theme.panel,
      border: `1px solid ${glow ? theme.blue : theme.border}`,
      borderLeft: borderAccent ? `3px solid ${borderAccent}` : undefined
    },
    children: [(0, _jsxRuntime.jsx)("h3", {
      className: "text-xs font-bold uppercase tracking-wide mb-3",
      style: {
        color: glow ? theme.blue : accent || theme.textSecondary
      },
      children: title
    }), children]
  });
}
function Pill({
  active,
  onClick,
  children,
  color
}) {
  return (0, _jsxRuntime.jsx)("button", {
    onClick: onClick,
    className: "px-3 py-2 rounded text-sm font-semibold mr-2 mb-2",
    style: {
      background: active ? color || theme.gold : theme.panelAlt,
      border: `1px solid ${active ? color || theme.gold : theme.border}`,
      color: active ? color ? "#fff" : theme.bg : theme.textSecondary
    },
    children: children
  });
}
function CheckRow({
  label,
  value,
  onToggle,
  disabled,
  hint,
  bold
}) {
  const checked = value != null;
  return (0, _jsxRuntime.jsxs)("button", {
    onClick: disabled ? undefined : onToggle,
    disabled: disabled,
    className: `w-full flex items-center justify-between px-3 py-2.5 rounded text-sm mb-1.5 text-left ${bold ? "font-bold" : "font-semibold"}`,
    style: {
      background: checked ? theme.greenDim : theme.panelAlt,
      border: `1px solid ${checked ? theme.green : theme.border}`,
      color: checked ? theme.green : disabled ? theme.textDim : theme.textPrimary,
      opacity: disabled ? 0.6 : 1,
      cursor: disabled ? "not-allowed" : "pointer"
    },
    children: [(0, _jsxRuntime.jsxs)("span", {
      className: "flex items-center gap-2",
      children: [(0, _jsxRuntime.jsx)("span", {
        className: "flex items-center justify-center rounded shrink-0",
        style: {
          width: 18,
          height: 18,
          border: `1.5px solid ${checked ? theme.green : theme.textDim}`,
          background: checked ? theme.green : "transparent"
        },
        children: checked && (0, _jsxRuntime.jsx)(Check, {
          size: 13,
          color: "#fff"
        })
      }), (0, _jsxRuntime.jsxs)("span", {
        className: "min-w-0",
        children: [label, disabled && hint && (0, _jsxRuntime.jsx)("span", {
          className: "block text-xs font-normal mt-0.5",
          style: {
            color: theme.textDim
          },
          children: hint
        })]
      })]
    }), checked && (0, _jsxRuntime.jsx)("span", {
      className: "text-xs tabular-nums",
      style: {
        fontFamily: mono
      },
      children: formatElapsed(value)
    })]
  });
}
function SegmentedCheckRow({
  label,
  value,
  options,
  onSelect
}) {
  const active = value != null;
  return (0, _jsxRuntime.jsxs)("div", {
    className: "w-full px-3 py-2.5 rounded mb-1.5",
    style: {
      background: active ? theme.greenDim : theme.panelAlt,
      border: `1px solid ${active ? theme.green : theme.border}`
    },
    children: [(0, _jsxRuntime.jsxs)("div", {
      className: "flex items-center justify-between mb-1.5",
      children: [(0, _jsxRuntime.jsxs)("span", {
        className: "text-sm font-semibold",
        style: {
          color: active ? theme.green : theme.textPrimary
        },
        children: [label, active && (0, _jsxRuntime.jsxs)("span", {
          className: "ml-1 font-normal",
          children: ["\u2014 ", value.mode]
        })]
      }), active && (0, _jsxRuntime.jsx)("span", {
        className: "text-xs tabular-nums",
        style: {
          fontFamily: mono,
          color: active ? theme.green : theme.textPrimary
        },
        children: formatElapsed(value.time)
      })]
    }), (0, _jsxRuntime.jsx)("div", {
      className: "flex gap-2",
      children: options.map(o => {
        const selected = value != null && value.mode === o;
        return (0, _jsxRuntime.jsx)("button", {
          onClick: () => onSelect(o),
          className: "flex-1 py-1.5 rounded text-xs font-bold",
          style: {
            background: selected ? theme.green : theme.bg,
            border: `1px solid ${selected ? theme.green : theme.border}`,
            color: selected ? "#fff" : theme.textSecondary
          },
          children: o
        }, o);
      })
    })]
  });
}
function TextField({
  label,
  value,
  onChange,
  placeholder,
  className = ""
}) {
  return (0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [label && (0, _jsxRuntime.jsx)("label", {
      className: "block text-xs uppercase tracking-wide mb-1",
      style: {
        color: theme.textDim
      },
      children: label
    }), (0, _jsxRuntime.jsx)("input", {
      value: value,
      onChange: e => onChange(e.target.value),
      placeholder: placeholder,
      className: "w-full px-3 py-2 rounded text-sm outline-none",
      style: {
        background: theme.panelAlt,
        border: `1px solid ${theme.border}`,
        color: theme.textPrimary
      }
    })]
  });
}
function ChecklistSection({
  title,
  items,
  data,
  onToggle,
  accent,
  glow,
  borderAccent
}) {
  return (0, _jsxRuntime.jsx)(Section, {
    title: title,
    accent: accent,
    glow: glow,
    borderAccent: borderAccent,
    children: items.map(it => (0, _jsxRuntime.jsx)(CheckRow, {
      label: it.label,
      value: data[it.key],
      onToggle: () => onToggle(it.key, it.label)
    }, it.key))
  });
}

// ---------- Main App ----------
function TacticalWorksheet() {
  const [state, setState] = useState(emptyState());
  const [now, setNow] = useState(Date.now());
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState("worksheet");
  const [parReminder, setParReminder] = useState(true);
  const [noteText, setNoteText] = useState("");
  const saveTimer = useRef(null);
  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get(STORAGE_KEY, false);
        if (result && result.value) setState(JSON.parse(result.value));
      } catch (e) {
        // nothing saved yet
      }
      setLoaded(true);
    })();
  }, []);
  useEffect(() => {
    if (!loaded) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await window.storage.set(STORAGE_KEY, JSON.stringify(state), false);
      } catch (e) {
        console.error("Autosave failed", e);
      }
    }, 400);
    return () => clearTimeout(saveTimer.current);
  }, [state, loaded]);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const elapsedSince = useCallback(() => state.startTime ? Math.max(0, now - state.startTime) : 0, [state.startTime, now]);
  const addLog = (draft, text) => {
    draft.log = [{
      id: uid(),
      time: elapsedSince(),
      text
    }, ...draft.log];
  };
  function startIncident() {
    setState(s => {
      const draft = {
        ...s,
        startTime: Date.now()
      };
      draft.log = [{
        id: uid(),
        time: 0,
        text: "Incident started"
      }];
      return draft;
    });
    if (state.incidentType === "Life Flight") {
      setTab("lifeflight");
    }
  }
  function endIncident() {
    if (!window.confirm("End this incident? The worksheet will be archived and cleared for the next call.")) return;
    (async () => {
      try {
        await window.storage.set(`incident-history:${Date.now()}`, JSON.stringify(state), false);
      } catch (e) {
        console.error("Archive failed", e);
      }
      try {
        await window.storage.delete(STORAGE_KEY, false);
      } catch (e) {
        // ignore
      }
      setState(emptyState());
      setTab("worksheet");
    })();
  }

  // Generic togglers -------------------------------------------------
  function toggleSimple(section, key, label) {
    setState(s => {
      const current = s[section][key];
      const value = current == null ? elapsedSince() : null;
      const draft = {
        ...s,
        [section]: {
          ...s[section],
          [key]: value
        }
      };
      addLog(draft, `${label} ${value == null ? "cleared" : "confirmed"}`);
      return draft;
    });
  }
  function toggleRoof(key, label) {
    setState(s => {
      const current = s.roof.checks[key];
      const value = current == null ? elapsedSince() : null;
      const draft = {
        ...s,
        roof: {
          ...s.roof,
          checks: {
            ...s.roof.checks,
            [key]: value
          }
        }
      };
      addLog(draft, `Roof — ${label} ${value == null ? "cleared" : "confirmed"}`);
      return draft;
    });
  }
  function setRoofField(key, value, logText) {
    setState(s => {
      const draft = {
        ...s,
        roof: {
          ...s.roof,
          [key]: value
        }
      };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }
  function setSizeUp(key, value, logText) {
    setState(s => {
      const draft = {
        ...s,
        sizeUp: {
          ...s.sizeUp,
          [key]: value
        }
      };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }
  function setCommand(key, value, logText) {
    setState(s => {
      const draft = {
        ...s,
        command: {
          ...s.command,
          [key]: value
        }
      };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }
  function setFollowUp(key, value, logText) {
    setState(s => {
      const draft = {
        ...s,
        followUp: {
          ...s.followUp,
          [key]: value
        }
      };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }
  function setMedicalRehabField(key, value, logText) {
    setState(s => {
      const draft = {
        ...s,
        medicalRehab: {
          ...s.medicalRehab,
          [key]: value
        }
      };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }
  function toggleRescueGroupUnit(unit) {
    setState(s => {
      const current = s.mayday.rescueGroup || [];
      const next = current.includes(unit) ? current.filter(u => u !== unit) : [...current, unit];
      const draft = {
        ...s,
        mayday: {
          ...s.mayday,
          rescueGroup: next
        }
      };
      addLog(draft, `Rescue Group: ${next.length ? next.join(", ") : "none"}`);
      return draft;
    });
  }
  function setMaydayLevel2Staging(value) {
    setState(s => ({
      ...s,
      mayday: {
        ...s.mayday,
        level2StagingLocation: value
      },
      level2Staging: value
    }));
  }
  function setMaydayField(key, value, logText) {
    setState(s => {
      const mayday = {
        ...s.mayday,
        [key]: value
      };
      if (key === "unitInAlarmId" && !s.mayday.whoUnitManual) mayday.whoUnit = value;
      if (key === "airSupplyStep1Value" && !s.mayday.airSupplyManual) mayday.airSupply = value;
      if (key === "whoUnit") mayday.whoUnitManual = true;
      if (key === "airSupply") mayday.airSupplyManual = true;
      const draft = {
        ...s,
        mayday
      };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }
  function setLifeFlightField(key, value, logText) {
    setState(s => {
      const draft = {
        ...s,
        lifeFlight: {
          ...s.lifeFlight,
          [key]: value
        }
      };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }
  function toggleLifeFlightNested(subsection, key, label) {
    setState(s => {
      const current = s.lifeFlight[subsection][key];
      const value = current == null ? elapsedSince() : null;
      const draft = {
        ...s,
        lifeFlight: {
          ...s.lifeFlight,
          [subsection]: {
            ...s.lifeFlight[subsection],
            [key]: value
          }
        }
      };
      addLog(draft, `${label} ${value == null ? "cleared" : "confirmed"}`);
      return draft;
    });
  }
  function toggleLifeFlightField(key, label) {
    setState(s => {
      const value = s.lifeFlight[key] == null ? elapsedSince() : null;
      const draft = {
        ...s,
        lifeFlight: {
          ...s.lifeFlight,
          [key]: value
        }
      };
      addLog(draft, `${label} ${value == null ? "cleared" : "confirmed"}`);
      return draft;
    });
  }
  function defaultPatient() {
    return {
      age: "",
      sex: null,
      weightKg: "",
      weightLbs: "",
      problemDescription: "",
      interventions: emptyBoolMap(PATIENT_INTERVENTION_ITEMS),
      interventionOther: ""
    };
  }
  function setPatientField(index, key, value, logText) {
    setState(s => {
      const patients = [...s.lifeFlight.patients];
      while (patients.length <= index) patients.push(defaultPatient());
      patients[index] = {
        ...patients[index],
        [key]: value
      };
      const draft = {
        ...s,
        lifeFlight: {
          ...s.lifeFlight,
          patients
        }
      };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }
  function togglePatientIntervention(index, key, label) {
    setState(s => {
      const patients = [...s.lifeFlight.patients];
      while (patients.length <= index) patients.push(defaultPatient());
      const current = patients[index].interventions[key];
      const value = current == null ? elapsedSince() : null;
      patients[index] = {
        ...patients[index],
        interventions: {
          ...patients[index].interventions,
          [key]: value
        }
      };
      const draft = {
        ...s,
        lifeFlight: {
          ...s.lifeFlight,
          patients
        }
      };
      addLog(draft, `Patient ${index + 1} — ${label} ${value == null ? "cleared" : "confirmed"}`);
      return draft;
    });
  }
  function handlePatientWeightChange(index, unit, value) {
    setState(s => {
      const patients = [...s.lifeFlight.patients];
      while (patients.length <= index) patients.push(defaultPatient());
      const num = parseFloat(value);
      let weightKg = patients[index].weightKg;
      let weightLbs = patients[index].weightLbs;
      if (unit === "kg") {
        weightKg = value;
        weightLbs = value === "" || isNaN(num) ? "" : (num * 2.20462).toFixed(1);
      } else {
        weightLbs = value;
        weightKg = value === "" || isNaN(num) ? "" : (num / 2.20462).toFixed(1);
      }
      patients[index] = {
        ...patients[index],
        weightKg,
        weightLbs
      };
      return {
        ...s,
        lifeFlight: {
          ...s.lifeFlight,
          patients
        }
      };
    });
  }
  function addLifeFlightUnit(listKey) {
    setState(s => ({
      ...s,
      lifeFlight: {
        ...s.lifeFlight,
        [listKey]: [...s.lifeFlight[listKey], {
          id: uid(),
          unit: "",
          assign: ""
        }]
      }
    }));
  }
  function updateLifeFlightUnit(listKey, id, field, value) {
    setState(s => {
      let list = s.lifeFlight[listKey].map(u => u.id === id ? {
        ...u,
        [field]: value
      } : u);
      if (field === "unit" && listKey === "emsUnits") {
        list = list.map(u => u.id === id && value && !u.assign ? {
          ...u,
          assign: "Medical Group"
        } : u);
      }
      const draft = {
        ...s,
        lifeFlight: {
          ...s.lifeFlight,
          [listKey]: list
        }
      };
      const u = list.find(x => x.id === id);
      if (field === "assign" && value || field === "unit" && listKey === "emsUnits" && value && u.assign) {
        addLog(draft, `${u.unit || "Unit"} assigned to ${u.assign}`);
      }
      return draft;
    });
  }
  function removeLifeFlightUnit(listKey, id) {
    setState(s => ({
      ...s,
      lifeFlight: {
        ...s.lifeFlight,
        [listKey]: s.lifeFlight[listKey].filter(u => u.id !== id)
      }
    }));
  }
  function toggleTaskCheck(slotId, key, label) {
    setState(s => {
      const taskSlots = s.taskSlots.map(slot => {
        if (slot.id !== slotId) return slot;
        const current = slot.checks[key];
        const value = current == null ? elapsedSince() : null;
        return {
          ...slot,
          checks: {
            ...slot.checks,
            [key]: value
          }
        };
      });
      const draft = {
        ...s,
        taskSlots
      };
      const slot = taskSlots.find(t => t.id === slotId);
      addLog(draft, `${slot.label}${slot.unit ? ` (${slot.unit})` : ""} — ${label} ${slot.checks[key] == null ? "cleared" : "confirmed"}`);
      return draft;
    });
  }
  function toggleTaskSegment(slotId, key, mode, label) {
    setState(s => {
      const taskSlots = s.taskSlots.map(slot => {
        if (slot.id !== slotId) return slot;
        const current = slot.checks[key];
        const value = current && current.mode === mode ? null : {
          mode,
          time: elapsedSince()
        };
        return {
          ...slot,
          checks: {
            ...slot.checks,
            [key]: value
          }
        };
      });
      const draft = {
        ...s,
        taskSlots
      };
      const slot = taskSlots.find(t => t.id === slotId);
      const newValue = slot.checks[key];
      addLog(draft, `${slot.label}${slot.unit ? ` (${slot.unit})` : ""} — ${label} ${newValue ? `set to ${newValue.mode}` : "cleared"}`);
      return draft;
    });
  }
  function setTaskField(slotId, field, value, logText) {
    setState(s => {
      const taskSlots = s.taskSlots.map(slot => slot.id === slotId ? {
        ...slot,
        [field]: value
      } : slot);
      const draft = {
        ...s,
        taskSlots
      };
      if (logText) addLog(draft, logText);
      return draft;
    });
  }
  function addAlarmUnit(listKey) {
    setState(s => ({
      ...s,
      [listKey]: [...s[listKey], {
        id: uid(),
        unit: "",
        staged: null,
        onDeck: null,
        onDeckSide: null,
        assign: ""
      }]
    }));
  }
  function syncTaskSlotFromAssignment(draft, unitDesignation, newAssignLabel, prevAssignLabel) {
    if (!unitDesignation) return draft;
    let taskSlots = draft.taskSlots;
    let slot = taskSlots.find(t => t.unit === unitDesignation);
    if (!slot) slot = taskSlots.find(t => t.unit === "");
    if (!slot) return draft; // no open task slot to claim

    const slotId = slot.id;
    taskSlots = taskSlots.map(t => {
      if (t.id !== slotId) return t;
      const checks = {
        ...t.checks
      };
      if (prevAssignLabel && prevAssignLabel !== newAssignLabel) {
        const prevItem = TASK_CHECKLIST.find(c => c.label === prevAssignLabel);
        if (prevItem) checks[prevItem.key] = null;
      }
      if (newAssignLabel) {
        const item = TASK_CHECKLIST.find(c => c.label === newAssignLabel);
        if (item) {
          checks[item.key] = item.type === "segmented" ? {
            mode: item.options[0],
            time: elapsedSince()
          } : elapsedSince();
        }
      }
      return {
        ...t,
        unit: unitDesignation,
        checks
      };
    });
    const draftOut = {
      ...draft,
      taskSlots
    };
    if (newAssignLabel) addLog(draftOut, `${slot.label} auto-set to ${unitDesignation} — ${newAssignLabel}`);
    return draftOut;
  }
  function updateAlarmUnit(listKey, id, field, value) {
    setState(s => {
      const row = s[listKey].find(u => u.id === id);
      if (!row) return s;
      const oldUnit = row.unit;
      const oldAssign = row.assign;
      const newList = s[listKey].map(u => u.id === id ? {
        ...u,
        [field]: value
      } : u);
      let draft = {
        ...s,
        [listKey]: newList
      };
      if (field === "unit") {
        const existingSlot = draft.taskSlots.find(t => t.unit === oldUnit && oldUnit !== "");
        if (existingSlot) {
          draft = {
            ...draft,
            taskSlots: draft.taskSlots.map(t => t.id === existingSlot.id ? {
              ...t,
              unit: value
            } : t)
          };
        } else if (oldAssign) {
          draft = syncTaskSlotFromAssignment(draft, value, oldAssign, null);
        }
      }
      if (field === "assign") {
        const currentUnit = newList.find(u => u.id === id).unit;
        draft = syncTaskSlotFromAssignment(draft, currentUnit, value, oldAssign);
      }
      return draft;
    });
  }
  function toggleAlarmStaged(listKey, id) {
    setState(s => {
      const list = s[listKey].map(u => u.id === id ? {
        ...u,
        staged: u.staged == null ? elapsedSince() : null
      } : u);
      const draft = {
        ...s,
        [listKey]: list
      };
      const u = list.find(x => x.id === id);
      addLog(draft, `${u.unit || "Unit"} ${u.staged == null ? "un-staged" : "staged"}`);
      return draft;
    });
  }
  const RH_UNITS = ["RH-1", "RH-2"];
  function toggleAlarmOnDeck(listKey, id) {
    setState(s => {
      const list = s[listKey].map(u => u.id === id ? {
        ...u,
        onDeck: u.onDeck == null ? elapsedSince() : null
      } : u);
      let draft = {
        ...s,
        [listKey]: list
      };
      const u = list.find(x => x.id === id);
      addLog(draft, `${u.unit || "Unit"} ${u.onDeck == null ? "off On-Deck" : "On-Deck"}`);
      if (RH_UNITS.includes(u.unit) && u.onDeck != null) {
        const medicalRehab = {
          ...draft.medicalRehab
        };
        if (medicalRehab.rehab == null) medicalRehab.rehab = elapsedSince();
        if (u.onDeckSide) medicalRehab.rehabSide = u.onDeckSide;
        draft = {
          ...draft,
          medicalRehab
        };
        addLog(draft, `${u.unit} On-Deck — Rehab confirmed`);
      }
      return draft;
    });
  }
  function setAlarmOnDeckSide(listKey, id, side) {
    setState(s => {
      const list = s[listKey].map(u => u.id === id ? {
        ...u,
        onDeckSide: side
      } : u);
      let draft = {
        ...s,
        [listKey]: list
      };
      const u = list.find(x => x.id === id);
      addLog(draft, `${u.unit || "Unit"} On-Deck Side: ${side}`);
      if (RH_UNITS.includes(u.unit) && u.onDeck != null) {
        const medicalRehab = {
          ...draft.medicalRehab,
          rehabSide: side
        };
        if (medicalRehab.rehab == null) medicalRehab.rehab = elapsedSince();
        draft = {
          ...draft,
          medicalRehab
        };
        addLog(draft, `${u.unit} Rehab Side: ${side}`);
      }
      return draft;
    });
  }
  function removeAlarmUnit(listKey, id) {
    setState(s => ({
      ...s,
      [listKey]: s[listKey].filter(u => u.id !== id)
    }));
  }
  function addEmsAlarmUnit(listKey) {
    setState(s => ({
      ...s,
      [listKey]: [...s[listKey], {
        id: uid(),
        unit: "",
        assign: ""
      }]
    }));
  }
  function updateEmsAlarmUnit(listKey, id, field, value) {
    setState(s => {
      let list = s[listKey].map(u => u.id === id ? {
        ...u,
        [field]: value
      } : u);
      if (field === "unit") {
        list = list.map(u => u.id === id && value && !u.assign ? {
          ...u,
          assign: "Medical Group"
        } : u);
      }
      let draft = {
        ...s,
        [listKey]: list
      };
      const u = list.find(x => x.id === id);
      if ((field === "assign" && value || field === "unit" && value) && u.assign) {
        const medicalRehab = {
          ...draft.medicalRehab
        };
        if (medicalRehab.medical == null) medicalRehab.medical = elapsedSince();
        draft = {
          ...draft,
          medicalRehab
        };
        addLog(draft, `${u.unit || "EMS unit"} assigned to ${u.assign} — Medical confirmed`);
      }
      return draft;
    });
  }
  function removeEmsAlarmUnit(listKey, id) {
    setState(s => ({
      ...s,
      [listKey]: s[listKey].filter(u => u.id !== id)
    }));
  }
  function callPAR() {
    setState(s => {
      const draft = {
        ...s,
        parLog: [elapsedSince(), ...s.parLog]
      };
      addLog(draft, "PAR called — all members accounted for");
      return draft;
    });
  }
  function addNote() {
    const text = noteText.trim();
    if (!text) return;
    setState(s => {
      const draft = {
        ...s
      };
      addLog(draft, text);
      return draft;
    });
    setNoteText("");
  }
  const lastPar = state.parLog[0];
  const parDue = parReminder && state.startTime && (lastPar == null ? elapsedSince() : elapsedSince() - lastPar) >= 600000;
  const assignedEmsUnits = [...state.firstAlarmEmsUnits, ...state.secondAlarmEmsUnits, ...state.thirdAlarmEmsUnits, ...state.fourthAlarmEmsUnits].filter(u => u.assign && u.unit).map(u => u.unit).filter((u, i, arr) => arr.indexOf(u) === i);
  const assignedRehabUnits = [...state.firstAlarmUnits, ...state.secondAlarmUnits, ...state.thirdAlarmUnits, ...state.fourthAlarmUnits].filter(u => ["RH-1", "RH-2"].includes(u.unit) && u.onDeck != null).map(u => u.unit).filter((u, i, arr) => arr.indexOf(u) === i);
  const patientCountRaw = parseInt(state.lifeFlight.numberOfPatients === "Other" ? state.lifeFlight.numberOfPatientsOther : state.lifeFlight.numberOfPatients, 10);
  const patientCount = patientCountRaw > 0 ? patientCountRaw : 1;
  const alarmLevelNum = parseInt(state.alarmLevel === "Other" ? state.alarmLevelOther : state.alarmLevel, 10);
  const alarmPanels = [{
    key: "firstAlarmUnits",
    emsKey: "firstAlarmEmsUnits",
    title: "First Alarm"
  }, {
    key: "secondAlarmUnits",
    emsKey: "secondAlarmEmsUnits",
    title: "Second Alarm"
  }];
  if (alarmLevelNum >= 3) alarmPanels.push({
    key: "thirdAlarmUnits",
    emsKey: "thirdAlarmEmsUnits",
    title: "Third Alarm"
  });
  if (alarmLevelNum >= 4) alarmPanels.push({
    key: "fourthAlarmUnits",
    emsKey: "fourthAlarmEmsUnits",
    title: "Fourth Alarm"
  });
  const allSuppressionUnits = [...state.firstAlarmUnits, ...state.secondAlarmUnits, ...state.thirdAlarmUnits, ...state.fourthAlarmUnits];
  const additionalRitAssigned = allSuppressionUnits.filter(u => u.assign === "RIT").length >= 2;
  const additionalDivisionAssigned = allSuppressionUnits.filter(u => u.assign === "Division").length >= 2;
  const activeTacticalUnits = allSuppressionUnits.filter(u => u.unit && (u.staged != null || u.onDeck != null || u.assign)).map(u => u.unit).filter((u, i, arr) => arr.indexOf(u) === i);
  const maydayManagerLabel = state.mayday.managerType === "Division" ? `Division${state.mayday.managerDivision ? " " + state.mayday.managerDivision : ""}` : state.mayday.managerType === "Other" ? state.mayday.managerOther || "Other" : state.mayday.managerType;
  const maydayUnitLabel = state.mayday.whoName || state.mayday.whoUnit ? `${state.mayday.whoName || "—"} / ${state.mayday.whoUnit || "—"}` : null;
  const maydayRescueGroupLabel = state.mayday.rescueGroup && state.mayday.rescueGroup.length > 0 ? state.mayday.rescueGroup.map(u => u === "Other" ? state.mayday.rescueGroupOther || "Other" : u).join(", ") : null;
  const tacticalIcUnit = allSuppressionUnits.find(u => u.assign === "Incident Command");
  const tacticalDivisionUnit = allSuppressionUnits.find(u => u.assign === "Division");
  const lifeFlightIcUnit = state.lifeFlight.suppressionUnits.find(u => u.assign === "Incident Command");
  const lifeFlightGroundContactUnit = state.lifeFlight.suppressionUnits.find(u => u.assign === "Ground Contact");
  const SF_UNITS = ["SF-1", "SF-2", "SF-3", "SF-4", "SF-5", "SF-6"];
  const safetyOnScene = [...state.firstAlarmUnits, ...state.secondAlarmUnits].some(u => SF_UNITS.includes(u.unit) && u.onDeck != null);
  const incidentActive = !!state.startTime;

  // ---------- Pre-start screen ----------
  if (!incidentActive) {
    return (0, _jsxRuntime.jsx)("div", {
      className: "w-full min-h-screen flex items-center justify-center p-6",
      style: {
        background: theme.bg,
        color: theme.textPrimary,
        fontFamily: "system-ui, -apple-system, sans-serif"
      },
      children: (0, _jsxRuntime.jsxs)("div", {
        className: "w-full max-w-md rounded-lg p-8",
        style: {
          background: theme.panel,
          border: `1px solid ${theme.border}`
        },
        children: [(0, _jsxRuntime.jsxs)("div", {
          className: "flex items-center gap-3 mb-1",
          children: [(0, _jsxRuntime.jsx)(BadgeIcon, {
            size: 32
          }), (0, _jsxRuntime.jsx)("h1", {
            className: "text-2xl font-bold tracking-tight",
            children: "Incident Command Board"
          })]
        }), (0, _jsxRuntime.jsx)("p", {
          className: "text-sm mb-6",
          style: {
            color: theme.textSecondary
          },
          children: "Cy-Fair Fire Department"
        }), (0, _jsxRuntime.jsx)(TextField, {
          label: "Address / Location",
          value: state.address,
          onChange: v => setState(s => ({
            ...s,
            address: v,
            command: {
              ...s.command,
              name: deriveCommandName(v)
            }
          })),
          placeholder: "123 Main St",
          className: "mb-4"
        }), (0, _jsxRuntime.jsxs)("div", {
          className: "mb-6",
          children: [(0, _jsxRuntime.jsx)("label", {
            className: "block text-xs uppercase tracking-wide mb-1",
            style: {
              color: theme.textDim
            },
            children: "Incident Type"
          }), (0, _jsxRuntime.jsxs)("select", {
            value: state.incidentType,
            onChange: e => setState(s => ({
              ...s,
              incidentType: e.target.value
            })),
            className: "w-full px-3 py-3 rounded outline-none text-base",
            style: {
              background: theme.panelAlt,
              border: `1px solid ${theme.border}`,
              color: theme.textPrimary
            },
            children: [(0, _jsxRuntime.jsx)("option", {
              value: "",
              children: "Select incident type"
            }), ["Residential Fire", "Apartment Fire", "Commercial Fire", "Life Flight", "Technical Rescue"].map(o => (0, _jsxRuntime.jsx)("option", {
              value: o,
              children: o
            }, o))]
          })]
        }), (0, _jsxRuntime.jsxs)("button", {
          onClick: startIncident,
          className: "w-full flex items-center justify-center gap-2 py-4 rounded font-bold text-base",
          style: {
            background: theme.red,
            color: "#fff"
          },
          children: [(0, _jsxRuntime.jsx)(Play, {
            size: 20,
            fill: "#fff"
          }), "START INCIDENT"]
        })]
      })
    });
  }
  return (0, _jsxRuntime.jsxs)("div", {
    className: "w-full min-h-screen flex flex-col",
    style: {
      background: theme.bg,
      color: theme.textPrimary,
      fontFamily: "system-ui, -apple-system, sans-serif"
    },
    children: [(0, _jsxRuntime.jsxs)("div", {
      style: {
        background: theme.panel,
        borderBottom: `1px solid ${theme.border}`
      },
      children: [(0, _jsxRuntime.jsxs)("div", {
        className: "flex items-center gap-3 px-4 py-2",
        children: [(0, _jsxRuntime.jsx)(BadgeIcon, {
          size: 24
        }), (0, _jsxRuntime.jsxs)("div", {
          className: "min-w-0",
          children: [(0, _jsxRuntime.jsx)("input", {
            value: state.address,
            onChange: e => setState(s => ({
              ...s,
              address: e.target.value
            })),
            placeholder: "Address",
            className: "font-bold text-sm bg-transparent outline-none w-40",
            style: {
              color: theme.textPrimary
            }
          }), (0, _jsxRuntime.jsx)("input", {
            value: state.incidentType,
            onChange: e => setState(s => ({
              ...s,
              incidentType: e.target.value
            })),
            placeholder: "Incident type",
            className: "text-xs bg-transparent outline-none w-40 block",
            style: {
              color: theme.textSecondary
            }
          })]
        }), (0, _jsxRuntime.jsxs)("div", {
          className: "flex items-center gap-2 ml-auto",
          children: [(0, _jsxRuntime.jsx)("div", {
            className: "px-3 py-1.5 rounded font-bold text-xl tabular-nums",
            style: {
              fontFamily: mono,
              background: theme.panelAlt,
              border: `1px solid ${theme.border}`
            },
            children: formatElapsed(elapsedSince())
          }), (0, _jsxRuntime.jsxs)("button", {
            onClick: endIncident,
            className: "flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold",
            style: {
              background: theme.panelAlt,
              border: `1px solid ${theme.border}`,
              color: theme.textSecondary
            },
            children: [(0, _jsxRuntime.jsx)(Square, {
              size: 12
            }), "END"]
          })]
        })]
      }), (0, _jsxRuntime.jsxs)("div", {
        className: "flex flex-wrap items-center gap-2 px-4 py-2",
        style: {
          borderTop: `1px solid ${theme.borderSoft}`
        },
        children: [tab === "mayday" ? (0, _jsxRuntime.jsxs)("div", {
          className: "flex flex-wrap items-center gap-2",
          children: [maydayUnitLabel && (0, _jsxRuntime.jsxs)("div", {
            className: "px-2 py-1.5 rounded text-xs font-bold",
            style: {
              background: theme.redDim,
              border: `1px solid ${theme.red}`,
              color: theme.red
            },
            children: ["MAYDAY Unit: ", maydayUnitLabel]
          }), maydayManagerLabel && (0, _jsxRuntime.jsxs)("div", {
            className: "px-2 py-1.5 rounded text-xs font-bold",
            style: {
              background: theme.redDim,
              border: `1px solid ${theme.red}`,
              color: theme.red
            },
            children: ["Mayday Manager: ", maydayManagerLabel]
          }), maydayRescueGroupLabel && (0, _jsxRuntime.jsxs)("div", {
            className: "px-2 py-1.5 rounded text-xs font-bold",
            style: {
              background: theme.redDim,
              border: `1px solid ${theme.red}`,
              color: theme.red
            },
            children: ["Rescue Group: ", maydayRescueGroupLabel]
          })]
        }) : tab !== "lifeflight" ? (0, _jsxRuntime.jsxs)("div", {
          className: "flex flex-wrap items-center gap-2",
          children: [tacticalIcUnit && (0, _jsxRuntime.jsxs)("div", {
            className: "px-2 py-1.5 rounded text-xs font-bold",
            style: {
              background: theme.redDim,
              border: `1px solid ${theme.red}`,
              color: theme.red
            },
            children: ["IC: ", tacticalIcUnit.unit || "—"]
          }), tacticalDivisionUnit && (0, _jsxRuntime.jsxs)("div", {
            className: "px-2 py-1.5 rounded text-xs font-bold",
            style: {
              background: theme.blueDim,
              border: `1px solid ${theme.blue}`,
              color: theme.blue
            },
            children: ["Division: ", tacticalDivisionUnit.unit || "—"]
          }), (0, _jsxRuntime.jsx)("div", {
            className: "flex items-center rounded overflow-hidden",
            style: {
              border: `1px solid ${theme.border}`
            },
            children: STRATEGIES.map(st => (0, _jsxRuntime.jsx)("button", {
              onClick: () => setCommand("strategy", st, `Strategy declared: ${st}`),
              className: "px-2.5 py-1.5 text-xs font-bold",
              style: {
                background: state.command.strategy === st ? st === "Offensive" ? theme.red : st === "Defensive" ? theme.blue : theme.amber : "transparent",
                color: state.command.strategy === st ? "#fff" : theme.textSecondary
              },
              children: st.toUpperCase()
            }, st))
          })]
        }) : (0, _jsxRuntime.jsxs)("div", {
          className: "flex flex-wrap items-center gap-2",
          children: [lifeFlightIcUnit && (0, _jsxRuntime.jsxs)("div", {
            className: "px-2 py-1.5 rounded text-xs font-bold",
            style: {
              background: theme.redDim,
              border: `1px solid ${theme.red}`,
              color: theme.red
            },
            children: ["IC: ", lifeFlightIcUnit.unit || "—"]
          }), lifeFlightGroundContactUnit && (0, _jsxRuntime.jsxs)("div", {
            className: "px-2 py-1.5 rounded text-xs font-bold",
            style: {
              background: theme.blueDim,
              border: `1px solid ${theme.blue}`,
              color: theme.blue
            },
            children: ["Ground Contact: ", lifeFlightGroundContactUnit.unit || "—"]
          }), (0, _jsxRuntime.jsxs)("div", {
            className: "flex items-center gap-1",
            children: [(0, _jsxRuntime.jsxs)("select", {
              value: state.lifeFlight.lifeFlightUnit || "",
              onChange: e => setLifeFlightField("lifeFlightUnit", e.target.value, `Life Flight Unit: ${e.target.value}`),
              className: "px-2 py-1.5 rounded text-xs outline-none",
              style: {
                background: theme.panelAlt,
                border: `1px solid ${theme.border}`,
                color: theme.textPrimary
              },
              children: [(0, _jsxRuntime.jsx)("option", {
                value: "",
                children: "Life Flight Unit"
              }), LIFE_FLIGHT_UNIT_OPTIONS.map(o => (0, _jsxRuntime.jsx)("option", {
                value: o,
                children: o
              }, o))]
            }), state.lifeFlight.lifeFlightUnit === "Other" && (0, _jsxRuntime.jsx)("input", {
              value: state.lifeFlight.lifeFlightUnitOther,
              onChange: e => setLifeFlightField("lifeFlightUnitOther", e.target.value),
              placeholder: "Specify",
              className: "w-20 px-2 py-1.5 rounded text-xs outline-none",
              style: {
                background: theme.panelAlt,
                border: `1px solid ${theme.border}`,
                color: theme.textPrimary
              }
            })]
          }), (0, _jsxRuntime.jsxs)("div", {
            className: "flex items-center gap-1",
            children: [(0, _jsxRuntime.jsx)("button", {
              onClick: () => toggleLifeFlightField("safelyOnGround", "SAFELY ON THE GROUND"),
              className: "px-2 py-1.5 rounded text-xs font-bold",
              style: {
                background: state.lifeFlight.safelyOnGround != null ? theme.green : theme.panelAlt,
                border: `1px solid ${state.lifeFlight.safelyOnGround != null ? theme.green : theme.border}`,
                color: state.lifeFlight.safelyOnGround != null ? "#fff" : theme.textSecondary
              },
              children: "SAFELY ON THE GROUND"
            }), (0, _jsxRuntime.jsx)("button", {
              onClick: () => toggleLifeFlightField("safelyOffGround", "SAFELY OFF THE GROUND"),
              className: "px-2 py-1.5 rounded text-xs font-bold",
              style: {
                background: state.lifeFlight.safelyOffGround != null ? theme.green : theme.panelAlt,
                border: `1px solid ${state.lifeFlight.safelyOffGround != null ? theme.green : theme.border}`,
                color: state.lifeFlight.safelyOffGround != null ? "#fff" : theme.textSecondary
              },
              children: "SAFELY OFF THE GROUND"
            })]
          })]
        }), (0, _jsxRuntime.jsxs)("button", {
          onClick: callPAR,
          className: `px-3 py-1.5 rounded text-xs font-bold ml-auto ${parDue ? "animate-pulse" : ""}`,
          style: {
            background: parDue ? theme.red : theme.panelAlt,
            border: `1px solid ${parDue ? theme.red : theme.border}`,
            color: parDue ? "#fff" : theme.textSecondary
          },
          children: ["CALL PAR ", lastPar != null ? `· ${formatElapsed(lastPar)}` : ""]
        })]
      })]
    }), (0, _jsxRuntime.jsxs)("div", {
      className: "flex flex-1 min-h-0 flex-col",
      children: [(0, _jsxRuntime.jsx)("div", {
        className: "flex items-center gap-2 px-4 py-2",
        style: {
          background: theme.panel,
          borderBottom: `1px solid ${theme.border}`
        },
        children: TABS.map(t => {
          const Icon = t.icon;
          const active = tab === t.key;
          const accentColor = theme.gold;
          const accentDim = theme.goldDim;
          return (0, _jsxRuntime.jsxs)("button", {
            onClick: () => setTab(t.key),
            className: "flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold",
            style: {
              background: active ? accentDim : "transparent",
              color: active ? accentColor : theme.textDim,
              border: `1px solid ${active ? accentColor : "transparent"}`
            },
            children: [(0, _jsxRuntime.jsx)(Icon, {
              size: 14
            }), t.label, t.key === "log" && state.log.length > 0 && (0, _jsxRuntime.jsx)("span", {
              className: "text-[10px] px-1.5 rounded-full",
              style: {
                background: theme.borderSoft,
                color: theme.textSecondary
              },
              children: state.log.length
            })]
          }, t.key);
        })
      }), (0, _jsxRuntime.jsxs)("div", {
        className: "flex-1 overflow-y-auto p-4",
        children: [tab === "worksheet" && (0, _jsxRuntime.jsxs)("div", {
          className: "flex flex-col gap-6",
          children: [(0, _jsxRuntime.jsx)(GroupHeader, {
            children: "Size-Up"
          }), (0, _jsxRuntime.jsxs)("div", {
            className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
            children: [(0, _jsxRuntime.jsx)(Section, {
              title: "Size",
              children: SIZE_OPTS.map(o => (0, _jsxRuntime.jsx)(Pill, {
                active: state.sizeUp.size === o,
                onClick: () => setSizeUp("size", o, `Size: ${o}`),
                children: o
              }, o))
            }), (0, _jsxRuntime.jsxs)(Section, {
              title: "Height",
              children: [HEIGHT_OPTS.map(o => (0, _jsxRuntime.jsx)(Pill, {
                active: state.sizeUp.height === o,
                onClick: () => setSizeUp("height", o, `Height: ${o}`),
                children: o
              }, o)), state.sizeUp.height === "Other" && (0, _jsxRuntime.jsx)(TextField, {
                className: "mt-2",
                value: state.sizeUp.heightOther,
                onChange: v => setSizeUp("heightOther", v),
                placeholder: "Specify story count"
              })]
            }), (0, _jsxRuntime.jsx)(Section, {
              title: "Occupancy",
              children: OCCUPANCY_OPTS.map(o => (0, _jsxRuntime.jsx)(Pill, {
                active: state.sizeUp.occupancy === o,
                onClick: () => setSizeUp("occupancy", o, `Occupancy: ${o}`),
                children: o
              }, o))
            }), (0, _jsxRuntime.jsxs)(Section, {
              title: "Problem",
              children: [PROBLEM_OPTS.map(o => (0, _jsxRuntime.jsx)(Pill, {
                active: state.sizeUp.problem === o,
                onClick: () => setSizeUp("problem", o, `Problem: ${o}`),
                children: o
              }, o)), state.sizeUp.problem === "Smoke Showing" && (0, _jsxRuntime.jsx)("div", {
                className: "mt-2",
                children: ["Light", "Heavy"].map(o => (0, _jsxRuntime.jsx)(Pill, {
                  active: state.sizeUp.smokeLevel === o,
                  onClick: () => setSizeUp("smokeLevel", o, `Smoke: ${o}`),
                  color: theme.amber,
                  children: o
                }, o))
              }), state.sizeUp.problem === "Fire Showing" && (0, _jsxRuntime.jsx)("div", {
                className: "mt-2",
                children: ["Working", "Defensive"].map(o => (0, _jsxRuntime.jsx)(Pill, {
                  active: state.sizeUp.fireMode === o,
                  onClick: () => setSizeUp("fireMode", o, `Fire: ${o}`),
                  color: theme.red,
                  children: o
                }, o))
              })]
            }), (0, _jsxRuntime.jsxs)(Section, {
              title: "Location",
              children: [(0, _jsxRuntime.jsxs)("div", {
                className: "mb-3",
                children: [(0, _jsxRuntime.jsx)("label", {
                  className: "block text-xs uppercase tracking-wide mb-1",
                  style: {
                    color: theme.textDim
                  },
                  children: "Floor"
                }), (0, _jsxRuntime.jsxs)("select", {
                  value: state.sizeUp.floor,
                  onChange: e => setSizeUp("floor", e.target.value, `Location: Floor ${e.target.value}`),
                  className: "px-3 py-2 rounded text-sm outline-none w-24",
                  style: {
                    background: theme.panelAlt,
                    border: `1px solid ${theme.border}`,
                    color: theme.textPrimary
                  },
                  children: [(0, _jsxRuntime.jsx)("option", {
                    value: "",
                    children: "\u2014"
                  }), ["1", "2", "3", "4", "Other"].map(o => (0, _jsxRuntime.jsx)("option", {
                    value: o,
                    children: o
                  }, o))]
                }), state.sizeUp.floor === "Other" && (0, _jsxRuntime.jsx)(TextField, {
                  className: "mt-2 w-24",
                  value: state.sizeUp.floorOther,
                  onChange: v => setSizeUp("floorOther", v),
                  placeholder: "Specify"
                })]
              }), (0, _jsxRuntime.jsxs)("div", {
                className: "mb-2",
                children: [(0, _jsxRuntime.jsx)("label", {
                  className: "block text-xs uppercase tracking-wide mb-1",
                  style: {
                    color: theme.textDim
                  },
                  children: "Side"
                }), SIDE_OPTS.map(o => (0, _jsxRuntime.jsx)(Pill, {
                  active: state.sizeUp.side === o,
                  onClick: () => setSizeUp("side", o, `Location: Side ${o}`),
                  children: o
                }, o))]
              }), state.sizeUp.occupancy === "Strip Mall" && (0, _jsxRuntime.jsxs)("div", {
                children: [(0, _jsxRuntime.jsx)("label", {
                  className: "block text-xs uppercase tracking-wide mb-1",
                  style: {
                    color: theme.textDim
                  },
                  children: "Unit Position"
                }), (0, _jsxRuntime.jsx)(Pill, {
                  active: state.sizeUp.centerUnit != null,
                  onClick: () => toggleSimple("sizeUp", "centerUnit", "Center Unit"),
                  children: "Center Unit"
                }), (0, _jsxRuntime.jsx)(Pill, {
                  active: state.sizeUp.endUnit != null,
                  onClick: () => toggleSimple("sizeUp", "endUnit", "End Unit"),
                  children: "End Unit"
                })]
              })]
            }), (0, _jsxRuntime.jsxs)(Section, {
              title: "Strategy",
              children: [STRATEGIES.map(st => (0, _jsxRuntime.jsx)(Pill, {
                active: state.command.strategy === st,
                onClick: () => setCommand("strategy", st, `Strategy declared: ${st}`),
                color: st === "Offensive" ? theme.red : st === "Defensive" ? theme.blue : theme.amber,
                children: st
              }, st)), (state.command.strategy === "Offensive" || state.command.strategy === "Defensive") && (0, _jsxRuntime.jsxs)("div", {
                className: "mt-3",
                children: [(0, _jsxRuntime.jsx)(CheckRow, {
                  label: "Water Supply Established",
                  value: state.sizeUp.waterSupplyEstablished,
                  onToggle: () => toggleSimple("sizeUp", "waterSupplyEstablished", "Water Supply Established")
                }), (0, _jsxRuntime.jsx)(TextField, {
                  label: "Unit & Location",
                  value: state.sizeUp.waterSupplyUnitLocation,
                  onChange: v => setSizeUp("waterSupplyUnitLocation", v),
                  placeholder: "Unit & Location",
                  className: "mt-2 mb-2"
                }), (0, _jsxRuntime.jsx)(CheckRow, {
                  label: "FDC",
                  value: state.sizeUp.fdc,
                  onToggle: () => toggleSimple("sizeUp", "fdc", "FDC")
                }), state.sizeUp.fdc != null && (0, _jsxRuntime.jsx)("div", {
                  className: "mt-2",
                  children: SIDE_OPTS.map(o => (0, _jsxRuntime.jsx)(Pill, {
                    active: state.sizeUp.fdcSide === o,
                    onClick: () => setSizeUp("fdcSide", o, `FDC Side: ${o}`),
                    children: o
                  }, o))
                })]
              })]
            })]
          }), (0, _jsxRuntime.jsx)(GroupHeader, {
            children: "Command"
          }), (0, _jsxRuntime.jsxs)("div", {
            className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
            children: [(0, _jsxRuntime.jsxs)(Section, {
              title: "Command",
              children: [(0, _jsxRuntime.jsx)(TextField, {
                label: "Command Name",
                value: state.command.name,
                onChange: v => setCommand("name", v),
                placeholder: "IC name",
                className: "mb-3"
              }), (0, _jsxRuntime.jsxs)("div", {
                className: "mb-3",
                children: [(0, _jsxRuntime.jsx)("label", {
                  className: "block text-xs uppercase tracking-wide mb-1",
                  style: {
                    color: theme.textDim
                  },
                  children: "Command Post Location"
                }), SIDE_OPTS.map(o => (0, _jsxRuntime.jsx)(Pill, {
                  active: state.command.location === o,
                  onClick: () => setCommand("location", o, `Command Post Location: ${o}`),
                  children: o
                }, o))]
              }), (0, _jsxRuntime.jsxs)("div", {
                children: [(0, _jsxRuntime.jsx)("label", {
                  className: "block text-xs uppercase tracking-wide mb-1",
                  style: {
                    color: theme.textDim
                  },
                  children: "TAC Channel"
                }), (0, _jsxRuntime.jsxs)("select", {
                  value: state.lifeFlight.tacChannel || "",
                  onChange: e => setLifeFlightField("tacChannel", e.target.value, `TAC Channel: ${e.target.value}`),
                  className: "px-3 py-2 rounded text-sm outline-none w-32",
                  style: {
                    background: theme.panelAlt,
                    border: `1px solid ${theme.border}`,
                    color: theme.textPrimary
                  },
                  children: [(0, _jsxRuntime.jsx)("option", {
                    value: "",
                    children: "\u2014"
                  }), TAC_CHANNEL_OPTIONS.map(o => (0, _jsxRuntime.jsx)("option", {
                    value: o,
                    children: o
                  }, o))]
                }), state.lifeFlight.tacChannel === "Other" && (0, _jsxRuntime.jsx)(TextField, {
                  className: "mt-2 w-32",
                  value: state.lifeFlight.tacChannelOther,
                  onChange: v => setLifeFlightField("tacChannelOther", v),
                  placeholder: "Specify"
                })]
              })]
            }), (0, _jsxRuntime.jsxs)(Section, {
              title: "Follow-Up",
              children: [(0, _jsxRuntime.jsx)(CheckRow, {
                label: "360\xB0",
                value: state.followUp.threeSixty,
                onToggle: () => toggleSimple("followUp", "threeSixty", "360°")
              }), state.followUp.threeSixty != null && (0, _jsxRuntime.jsxs)("div", {
                className: "mb-3",
                children: [["Complete", "Incomplete"].map(o => (0, _jsxRuntime.jsx)(Pill, {
                  active: state.followUp.threeSixtyStatus === o,
                  onClick: () => setFollowUp("threeSixtyStatus", o, `360° status: ${o}`),
                  children: o
                }, o)), state.followUp.threeSixtyStatus === "Incomplete" && (0, _jsxRuntime.jsxs)("div", {
                  className: "mt-2",
                  children: [["Size", "Accessibility", "Hazard", "Other"].map(o => (0, _jsxRuntime.jsx)(Pill, {
                    active: state.followUp.threeSixtyIncompleteReason === o,
                    onClick: () => setFollowUp("threeSixtyIncompleteReason", o, `360° Incomplete: ${o}`),
                    children: o
                  }, o)), state.followUp.threeSixtyIncompleteReason === "Other" && (0, _jsxRuntime.jsx)(TextField, {
                    className: "mt-2",
                    value: state.followUp.threeSixtyIncompleteOther,
                    onChange: v => setFollowUp("threeSixtyIncompleteOther", v),
                    placeholder: "Specify"
                  })]
                })]
              }), (0, _jsxRuntime.jsx)(TextField, {
                label: "Hazards",
                value: state.followUp.hazards,
                onChange: v => setFollowUp("hazards", v),
                placeholder: "Note any hazards",
                className: "mb-3"
              }), (0, _jsxRuntime.jsxs)("div", {
                className: "mb-3",
                children: [(0, _jsxRuntime.jsx)("label", {
                  className: "block text-xs uppercase tracking-wide mb-1",
                  style: {
                    color: theme.textDim
                  },
                  children: "Exposures"
                }), ["Yes", "No"].map(o => (0, _jsxRuntime.jsx)(Pill, {
                  active: state.followUp.exposures === o,
                  onClick: () => setFollowUp("exposures", o, `Exposures: ${o}`),
                  children: o
                }, o)), state.followUp.exposures === "Yes" && (0, _jsxRuntime.jsx)("div", {
                  className: "mt-2",
                  children: SIDE_OPTS.map(o => (0, _jsxRuntime.jsx)(Pill, {
                    active: state.followUp["exposure" + o] != null,
                    onClick: () => toggleSimple("followUp", "exposure" + o, `Exposure Side ${o}`),
                    children: o
                  }, o))
                })]
              }), (0, _jsxRuntime.jsx)(TextField, {
                label: "TIC Reading",
                value: state.followUp.ticReading,
                onChange: v => setFollowUp("ticReading", v),
                placeholder: "Reading",
                className: "mb-3"
              }), (0, _jsxRuntime.jsxs)("div", {
                children: [(0, _jsxRuntime.jsx)("label", {
                  className: "block text-xs uppercase tracking-wide mb-1",
                  style: {
                    color: theme.textDim
                  },
                  children: "Accountability"
                }), SIDE_OPTS.map(o => (0, _jsxRuntime.jsx)(Pill, {
                  active: state.followUp.accountability === o,
                  onClick: () => setFollowUp("accountability", o, `Accountability: ${o}`),
                  children: o
                }, o))]
              })]
            }), (0, _jsxRuntime.jsx)(Section, {
              title: "Command Transfer",
              children: COMMAND_TRANSFER_ITEMS.map(it => (0, _jsxRuntime.jsxs)(React.Fragment, {
                children: [(0, _jsxRuntime.jsx)(CheckRow, {
                  label: it.label,
                  value: state.commandTransfer[it.key],
                  onToggle: () => toggleSimple("commandTransfer", it.key, it.label)
                }), it.key === "strategyConfirmation" && state.commandTransfer.strategyConfirmation != null && (0, _jsxRuntime.jsx)("div", {
                  className: "mb-1.5 pl-1",
                  children: ["Investigative", "Offensive", "Defensive"].map(o => (0, _jsxRuntime.jsx)(Pill, {
                    active: state.strategyConfirmationMode === o,
                    onClick: () => setState(s => ({
                      ...s,
                      strategyConfirmationMode: o
                    })),
                    color: o === "Offensive" ? theme.red : o === "Defensive" ? theme.blue : theme.amber,
                    children: o
                  }, o))
                })]
              }, it.key))
            }), (0, _jsxRuntime.jsxs)(Section, {
              title: "Resources",
              children: [RESOURCES_ITEMS.map(it => (0, _jsxRuntime.jsx)(CheckRow, {
                label: it.label,
                value: state.resources[it.key],
                onToggle: () => toggleSimple("resources", it.key, it.label)
              }, it.key)), (0, _jsxRuntime.jsxs)("div", {
                className: "grid grid-cols-2 gap-2 mt-2",
                children: [(0, _jsxRuntime.jsxs)("div", {
                  children: [(0, _jsxRuntime.jsx)("label", {
                    className: "block text-xs uppercase tracking-wide mb-1",
                    style: {
                      color: theme.textDim
                    },
                    children: "Alarm Level"
                  }), (0, _jsxRuntime.jsxs)("select", {
                    value: state.alarmLevel,
                    onChange: e => setState(s => ({
                      ...s,
                      alarmLevel: e.target.value
                    })),
                    className: "w-full px-3 py-2 rounded text-sm outline-none",
                    style: {
                      background: theme.panelAlt,
                      border: `1px solid ${theme.border}`,
                      color: theme.textPrimary
                    },
                    children: [(0, _jsxRuntime.jsx)("option", {
                      value: "",
                      children: "\u2014"
                    }), ["1", "2", "3", "4", "Other"].map(o => (0, _jsxRuntime.jsx)("option", {
                      value: o,
                      children: o
                    }, o))]
                  }), state.alarmLevel === "Other" && (0, _jsxRuntime.jsx)(TextField, {
                    className: "mt-2",
                    value: state.alarmLevelOther,
                    onChange: v => setState(s => ({
                      ...s,
                      alarmLevelOther: v
                    })),
                    placeholder: "Specify"
                  })]
                }), (0, _jsxRuntime.jsx)(TextField, {
                  label: "Level 2 Staging",
                  value: state.level2Staging,
                  onChange: v => setState(s => ({
                    ...s,
                    level2Staging: v
                  })),
                  placeholder: "Location"
                })]
              })]
            })]
          }), (0, _jsxRuntime.jsx)(GroupHeader, {
            children: "Units"
          }), (0, _jsxRuntime.jsx)("div", {
            className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
            children: alarmPanels.map(({
              key,
              emsKey,
              title
            }) => (0, _jsxRuntime.jsxs)(Section, {
              title: title,
              children: [(0, _jsxRuntime.jsx)("div", {
                className: "text-[10px] font-bold uppercase tracking-wide mb-2",
                style: {
                  color: theme.textDim
                },
                children: "Suppression"
              }), (0, _jsxRuntime.jsxs)("div", {
                className: "flex flex-col gap-2 mb-4",
                children: [state[key].map(u => (0, _jsxRuntime.jsxs)("div", {
                  className: "rounded p-2",
                  style: {
                    background: theme.panelAlt,
                    border: `1px solid ${theme.border}`
                  },
                  children: [(0, _jsxRuntime.jsxs)("div", {
                    className: "flex items-center gap-2",
                    children: [(0, _jsxRuntime.jsxs)("select", {
                      value: u.unit,
                      onChange: e => updateAlarmUnit(key, u.id, "unit", e.target.value),
                      className: "w-24 px-2 py-1.5 rounded text-sm outline-none",
                      style: {
                        background: theme.bg,
                        border: `1px solid ${theme.border}`,
                        color: theme.textPrimary,
                        fontFamily: mono
                      },
                      children: [(0, _jsxRuntime.jsx)("option", {
                        value: "",
                        children: "Unit"
                      }), UNIT_OPTIONS.map(o => (0, _jsxRuntime.jsx)("option", {
                        value: o,
                        children: o
                      }, o))]
                    }), (0, _jsxRuntime.jsx)("button", {
                      onClick: () => toggleAlarmStaged(key, u.id),
                      className: "px-2 py-1.5 rounded text-xs font-bold",
                      style: {
                        background: u.staged != null ? theme.greenDim : theme.bg,
                        border: `1px solid ${u.staged != null ? theme.green : theme.border}`,
                        color: u.staged != null ? theme.green : theme.textSecondary
                      },
                      children: u.staged != null ? `Staged ${formatElapsed(u.staged)}` : "Staged"
                    }), (0, _jsxRuntime.jsx)("button", {
                      onClick: () => toggleAlarmOnDeck(key, u.id),
                      className: "px-2 py-1.5 rounded text-xs font-bold",
                      style: {
                        background: u.onDeck != null ? theme.amberDim : theme.bg,
                        border: `1px solid ${u.onDeck != null ? theme.amber : theme.border}`,
                        color: u.onDeck != null ? theme.amber : theme.textSecondary
                      },
                      children: u.onDeck != null ? `On-Deck ${formatElapsed(u.onDeck)}` : "On-Deck"
                    }), (0, _jsxRuntime.jsxs)("select", {
                      value: u.assign,
                      onChange: e => updateAlarmUnit(key, u.id, "assign", e.target.value),
                      className: "flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0",
                      style: {
                        background: theme.bg,
                        border: `1px solid ${theme.border}`,
                        color: theme.textPrimary
                      },
                      children: [(0, _jsxRuntime.jsx)("option", {
                        value: "",
                        children: "Assignment"
                      }), TASK_CHECKLIST.map(c => (0, _jsxRuntime.jsx)("option", {
                        value: c.label,
                        children: c.label
                      }, c.key))]
                    }), (0, _jsxRuntime.jsx)("button", {
                      onClick: () => removeAlarmUnit(key, u.id),
                      style: {
                        color: theme.textDim
                      },
                      children: (0, _jsxRuntime.jsx)(X, {
                        size: 16
                      })
                    })]
                  }), u.onDeck != null && (0, _jsxRuntime.jsx)("div", {
                    className: "mt-2 pl-1",
                    children: SIDE_OPTS.map(o => (0, _jsxRuntime.jsx)(Pill, {
                      active: u.onDeckSide === o,
                      onClick: () => setAlarmOnDeckSide(key, u.id, o),
                      children: o
                    }, o))
                  })]
                }, u.id)), (0, _jsxRuntime.jsxs)("button", {
                  onClick: () => addAlarmUnit(key),
                  className: "flex items-center justify-center gap-1 py-2 rounded text-xs font-bold",
                  style: {
                    background: theme.goldDim,
                    border: `1px solid ${theme.gold}`,
                    color: theme.gold
                  },
                  children: [(0, _jsxRuntime.jsx)(Plus, {
                    size: 14
                  }), " Add Unit"]
                })]
              }), (0, _jsxRuntime.jsx)("div", {
                className: "text-[10px] font-bold uppercase tracking-wide mb-2",
                style: {
                  color: theme.textDim
                },
                children: "EMS"
              }), (0, _jsxRuntime.jsxs)("div", {
                className: "flex flex-col gap-2",
                children: [state[emsKey].map(u => (0, _jsxRuntime.jsxs)("div", {
                  className: "flex items-center gap-2 p-2 rounded",
                  style: {
                    background: theme.panelAlt,
                    border: `1px solid ${theme.border}`
                  },
                  children: [(0, _jsxRuntime.jsxs)("select", {
                    value: u.unit,
                    onChange: e => updateEmsAlarmUnit(emsKey, u.id, "unit", e.target.value),
                    className: "w-24 px-2 py-1.5 rounded text-sm outline-none",
                    style: {
                      background: theme.bg,
                      border: `1px solid ${theme.border}`,
                      color: theme.textPrimary,
                      fontFamily: mono
                    },
                    children: [(0, _jsxRuntime.jsx)("option", {
                      value: "",
                      children: "Unit"
                    }), MEDIC_UNIT_OPTIONS.map(o => (0, _jsxRuntime.jsx)("option", {
                      value: o,
                      children: o
                    }, o))]
                  }), (0, _jsxRuntime.jsxs)("select", {
                    value: u.assign,
                    onChange: e => updateEmsAlarmUnit(emsKey, u.id, "assign", e.target.value),
                    className: "flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0",
                    style: {
                      background: theme.bg,
                      border: `1px solid ${theme.border}`,
                      color: theme.textPrimary
                    },
                    children: [(0, _jsxRuntime.jsx)("option", {
                      value: "",
                      children: "Assignment"
                    }), EMS_ASSIGNMENT_OPTIONS.map(o => (0, _jsxRuntime.jsx)("option", {
                      value: o,
                      children: o
                    }, o))]
                  }), (0, _jsxRuntime.jsx)("button", {
                    onClick: () => removeEmsAlarmUnit(emsKey, u.id),
                    style: {
                      color: theme.textDim
                    },
                    children: (0, _jsxRuntime.jsx)(X, {
                      size: 16
                    })
                  })]
                }, u.id)), (0, _jsxRuntime.jsxs)("button", {
                  onClick: () => addEmsAlarmUnit(emsKey),
                  className: "flex items-center justify-center gap-1 py-2 rounded text-xs font-bold",
                  style: {
                    background: theme.goldDim,
                    border: `1px solid ${theme.gold}`,
                    color: theme.gold
                  },
                  children: [(0, _jsxRuntime.jsx)(Plus, {
                    size: 14
                  }), " Add Unit"]
                })]
              })]
            }, key))
          }), (0, _jsxRuntime.jsx)(GroupHeader, {
            children: "Tactical Objectives"
          }), (0, _jsxRuntime.jsxs)("div", {
            className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
            children: [state.taskSlots.map(slot => {
              const hasAssignment = Object.values(slot.checks).some(v => v != null);
              return (0, _jsxRuntime.jsxs)(CollapsibleSection, {
                title: slot.label,
                forceOpen: hasAssignment,
                children: [(0, _jsxRuntime.jsx)("div", {
                  className: "mb-3",
                  children: (0, _jsxRuntime.jsx)(TextField, {
                    value: slot.unit,
                    onChange: v => setTaskField(slot.id, "unit", v),
                    placeholder: "Unit"
                  })
                }), TASK_CHECKLIST.map(c => (0, _jsxRuntime.jsxs)(React.Fragment, {
                  children: [c.type === "segmented" ? (0, _jsxRuntime.jsx)(SegmentedCheckRow, {
                    label: c.label,
                    value: slot.checks[c.key],
                    options: c.options,
                    onSelect: mode => toggleTaskSegment(slot.id, c.key, mode, c.label)
                  }) : (0, _jsxRuntime.jsx)(CheckRow, {
                    label: c.label,
                    value: slot.checks[c.key],
                    onToggle: () => toggleTaskCheck(slot.id, c.key, c.label)
                  }), c.key === "fireControl" && slot.checks.fireControl != null && (0, _jsxRuntime.jsxs)("div", {
                    className: "mb-1.5",
                    children: [(0, _jsxRuntime.jsx)("div", {
                      className: "flex flex-wrap",
                      children: SIDE_OPTS.map(o => (0, _jsxRuntime.jsx)(Pill, {
                        active: slot.fireControlSide === o,
                        onClick: () => setTaskField(slot.id, "fireControlSide", o, `${slot.label} — Fire Control Side: ${o}`),
                        children: o
                      }, o))
                    }), (0, _jsxRuntime.jsx)("div", {
                      className: "flex flex-wrap",
                      children: ["D1", "D2", "D3", "D4", "Other"].map(o => (0, _jsxRuntime.jsx)(Pill, {
                        active: slot.fireControlDoor === o,
                        onClick: () => setTaskField(slot.id, "fireControlDoor", o, `${slot.label} — Fire Control Door: ${o}`),
                        children: o
                      }, o))
                    })]
                  })]
                }, c.key))]
              }, slot.id);
            }), (0, _jsxRuntime.jsxs)(Section, {
              title: "Roof Report",
              children: [(0, _jsxRuntime.jsxs)("div", {
                className: "mb-3",
                children: [(0, _jsxRuntime.jsx)("label", {
                  className: "block text-xs uppercase tracking-wide mb-1",
                  style: {
                    color: theme.textDim
                  },
                  children: "Type"
                }), ["Pitched", "Flat"].map(o => (0, _jsxRuntime.jsx)(Pill, {
                  active: state.roof.type === o,
                  onClick: () => setRoofField("type", o, `Roof Type: ${o}`),
                  children: o
                }, o))]
              }), (0, _jsxRuntime.jsxs)("div", {
                className: "mb-3",
                children: [(0, _jsxRuntime.jsx)("label", {
                  className: "block text-xs uppercase tracking-wide mb-1",
                  style: {
                    color: theme.textDim
                  },
                  children: "Condition"
                }), ["Stable", "Unstable"].map(o => (0, _jsxRuntime.jsx)(Pill, {
                  active: state.roof.condition === o,
                  onClick: () => setRoofField("condition", o, `Roof Condition: ${o}`),
                  color: o === "Unstable" ? theme.red : theme.green,
                  children: o
                }, o))]
              }), (0, _jsxRuntime.jsxs)("div", {
                className: "mb-3",
                children: [(0, _jsxRuntime.jsx)("label", {
                  className: "block text-xs uppercase tracking-wide mb-1",
                  style: {
                    color: theme.textDim
                  },
                  children: "Attic"
                }), ["Involved", "No Involvement"].map(o => (0, _jsxRuntime.jsx)(Pill, {
                  active: state.roof.atticConditions === o,
                  onClick: () => setRoofField("atticConditions", o, `Attic: ${o}`),
                  color: o === "Involved" ? theme.red : theme.green,
                  children: o
                }, o)), state.roof.atticConditions === "Involved" && (0, _jsxRuntime.jsx)("div", {
                  className: "mt-2",
                  children: ["Fire", "Smoke"].map(o => (0, _jsxRuntime.jsx)(Pill, {
                    active: state.roof.atticInvolvement === o,
                    onClick: () => setRoofField("atticInvolvement", o, `Attic Involvement: ${o}`),
                    color: theme.red,
                    children: o
                  }, o))
                })]
              }), ROOF_CHECKLIST.map(c => (0, _jsxRuntime.jsx)(CheckRow, {
                label: c.label,
                value: state.roof.checks[c.key],
                onToggle: () => toggleRoof(c.key, c.label)
              }, c.key))]
            }), (0, _jsxRuntime.jsx)(ChecklistSection, {
              title: "RIT",
              items: RIT_ITEMS,
              data: state.rit,
              onToggle: (k, l) => toggleSimple("rit", k, l)
            }), (0, _jsxRuntime.jsxs)(Section, {
              title: "Medical / Rehab",
              children: [(0, _jsxRuntime.jsx)(CheckRow, {
                label: "Medical",
                value: state.medicalRehab.medical,
                onToggle: () => toggleSimple("medicalRehab", "medical", "Medical")
              }), state.medicalRehab.medical != null && (0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
                children: [assignedEmsUnits.length > 0 ? (0, _jsxRuntime.jsx)("div", {
                  className: "flex flex-wrap gap-1.5 mb-1.5",
                  children: assignedEmsUnits.map(u => (0, _jsxRuntime.jsx)("span", {
                    className: "px-2 py-1.5 rounded text-xs font-bold",
                    style: {
                      background: theme.goldDim,
                      border: `1px solid ${theme.gold}`,
                      color: theme.gold,
                      fontFamily: mono
                    },
                    children: u
                  }, u))
                }) : (0, _jsxRuntime.jsxs)("select", {
                  value: state.medicalRehab.medicalUnit,
                  onChange: e => setMedicalRehabField("medicalUnit", e.target.value, `Medical Unit: ${e.target.value}`),
                  className: "w-full px-3 py-2 rounded text-sm outline-none mb-1.5",
                  style: {
                    background: theme.panelAlt,
                    border: `1px solid ${theme.border}`,
                    color: theme.textPrimary,
                    fontFamily: mono
                  },
                  children: [(0, _jsxRuntime.jsx)("option", {
                    value: "",
                    children: "Select unit"
                  }), MEDIC_UNIT_OPTIONS.map(o => (0, _jsxRuntime.jsx)("option", {
                    value: o,
                    children: o
                  }, o))]
                }), (0, _jsxRuntime.jsx)("div", {
                  className: "mb-1.5",
                  children: SIDE_OPTS.map(o => (0, _jsxRuntime.jsx)(Pill, {
                    active: state.medicalRehab.medicalSide === o,
                    onClick: () => setMedicalRehabField("medicalSide", o, `Medical: Side ${o}`),
                    children: o
                  }, o))
                })]
              }), (0, _jsxRuntime.jsx)(CheckRow, {
                label: "Rehab",
                value: state.medicalRehab.rehab,
                onToggle: () => toggleSimple("medicalRehab", "rehab", "Rehab")
              }), state.medicalRehab.rehab != null && (0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
                children: [assignedRehabUnits.length > 0 && (0, _jsxRuntime.jsx)("div", {
                  className: "flex flex-wrap gap-1.5 mb-1.5",
                  children: assignedRehabUnits.map(u => (0, _jsxRuntime.jsx)("span", {
                    className: "px-2 py-1.5 rounded text-xs font-bold",
                    style: {
                      background: theme.goldDim,
                      border: `1px solid ${theme.gold}`,
                      color: theme.gold,
                      fontFamily: mono
                    },
                    children: u
                  }, u))
                }), (0, _jsxRuntime.jsx)("div", {
                  className: "mb-1.5",
                  children: SIDE_OPTS.map(o => (0, _jsxRuntime.jsx)(Pill, {
                    active: state.medicalRehab.rehabSide === o,
                    onClick: () => setMedicalRehabField("rehabSide", o, `Rehab: Side ${o}`),
                    children: o
                  }, o))
                })]
              }), (0, _jsxRuntime.jsx)(CheckRow, {
                label: "PAR",
                value: state.medicalRehab.par,
                onToggle: () => toggleSimple("medicalRehab", "par", "PAR")
              })]
            }), (0, _jsxRuntime.jsx)(ChecklistSection, {
              title: "Safety",
              items: SAFETY_ITEMS,
              data: state.safety,
              onToggle: (k, l) => toggleSimple("safety", k, l),
              glow: safetyOnScene
            })]
          }), (0, _jsxRuntime.jsx)(GroupHeader, {
            children: "Support"
          }), (0, _jsxRuntime.jsxs)("div", {
            className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
            children: [(0, _jsxRuntime.jsx)(CollapsibleSection, {
              title: "Utilities",
              children: UTILITIES_ITEMS.map(it => (0, _jsxRuntime.jsx)(CheckRow, {
                label: it.label,
                value: state.utilities[it.key],
                onToggle: () => toggleSimple("utilities", it.key, it.label)
              }, it.key))
            }), (0, _jsxRuntime.jsxs)(CollapsibleSection, {
              title: "Mutual Aid",
              children: [(0, _jsxRuntime.jsx)(CheckRow, {
                label: "Fire",
                value: state.mutualAid.fire,
                onToggle: () => toggleSimple("mutualAid", "fire", "Fire")
              }), state.mutualAid.fire != null && (0, _jsxRuntime.jsxs)("select", {
                value: state.mutualAid.fireDept,
                onChange: e => setState(s => ({
                  ...s,
                  mutualAid: {
                    ...s.mutualAid,
                    fireDept: e.target.value
                  }
                })),
                className: "w-full px-3 py-2 rounded text-sm outline-none mb-1.5",
                style: {
                  background: theme.panelAlt,
                  border: `1px solid ${theme.border}`,
                  color: theme.textPrimary
                },
                children: [(0, _jsxRuntime.jsx)("option", {
                  value: "",
                  children: "Select department"
                }), MUTUAL_AID_FIRE_DEPTS.map(d => (0, _jsxRuntime.jsx)("option", {
                  value: d,
                  children: d
                }, d))]
              }), MUTUAL_AID_ITEMS.filter(it => it.key !== "fire").map(it => (0, _jsxRuntime.jsx)(CheckRow, {
                label: it.label,
                value: state.mutualAid[it.key],
                onToggle: () => toggleSimple("mutualAid", it.key, it.label)
              }, it.key))]
            })]
          })]
        }), tab === "lifeflight" && (0, _jsxRuntime.jsxs)("div", {
          className: "flex flex-col gap-6",
          children: [(0, _jsxRuntime.jsxs)("div", {
            className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
            children: [(0, _jsxRuntime.jsxs)("div", {
              className: "flex flex-col gap-4",
              children: [(0, _jsxRuntime.jsxs)(Section, {
                title: "Problem",
                children: [(0, _jsxRuntime.jsx)("div", {
                  className: "mb-1.5",
                  children: ["MVA", "Medical", "Trauma"].map(o => (0, _jsxRuntime.jsx)(Pill, {
                    active: state.lifeFlight.problem === o,
                    onClick: () => setLifeFlightField("problem", o, `Life Flight Problem: ${o}`),
                    children: o
                  }, o))
                }), state.lifeFlight.problem === "MVA" && (0, _jsxRuntime.jsxs)("div", {
                  className: "mb-1.5",
                  children: [(0, _jsxRuntime.jsx)(Pill, {
                    active: state.lifeFlight.mvaEntrapment != null,
                    onClick: () => toggleLifeFlightField("mvaEntrapment", "Entrapment"),
                    color: theme.red,
                    children: "Entrapment"
                  }), (0, _jsxRuntime.jsx)(Pill, {
                    active: state.lifeFlight.mvaEjection != null,
                    onClick: () => toggleLifeFlightField("mvaEjection", "Ejection"),
                    color: theme.red,
                    children: "Ejection"
                  })]
                }), (state.lifeFlight.problem === "Medical" || state.lifeFlight.problem === "Trauma") && (0, _jsxRuntime.jsx)(TextField, {
                  className: "mb-1.5",
                  value: state.lifeFlight.problemOther,
                  onChange: v => setLifeFlightField("problemOther", v),
                  placeholder: "Problem Description"
                }), (0, _jsxRuntime.jsxs)("div", {
                  className: "mt-2",
                  children: [(0, _jsxRuntime.jsx)("label", {
                    className: "block text-xs uppercase tracking-wide mb-1",
                    style: {
                      color: theme.textDim
                    },
                    children: "Number of Patients"
                  }), (0, _jsxRuntime.jsxs)("select", {
                    value: state.lifeFlight.numberOfPatients || "",
                    onChange: e => setLifeFlightField("numberOfPatients", e.target.value, `Number of Patients: ${e.target.value}`),
                    className: "px-3 py-2 rounded text-sm outline-none w-28",
                    style: {
                      background: theme.panelAlt,
                      border: `1px solid ${theme.border}`,
                      color: theme.textPrimary
                    },
                    children: [(0, _jsxRuntime.jsx)("option", {
                      value: "",
                      children: "\u2014"
                    }), ["1", "2", "3", "4", "Other"].map(o => (0, _jsxRuntime.jsx)("option", {
                      value: o,
                      children: o
                    }, o))]
                  }), state.lifeFlight.numberOfPatients === "Other" && (0, _jsxRuntime.jsx)(TextField, {
                    className: "mt-2 w-28",
                    value: state.lifeFlight.numberOfPatientsOther,
                    onChange: v => setLifeFlightField("numberOfPatientsOther", v),
                    placeholder: "Specify"
                  })]
                })]
              }), (0, _jsxRuntime.jsxs)(Section, {
                title: "Command",
                children: [(0, _jsxRuntime.jsx)(TextField, {
                  label: "Command Name",
                  value: state.command.name,
                  onChange: v => setCommand("name", v),
                  placeholder: "IC name",
                  className: "mb-2"
                }), (0, _jsxRuntime.jsxs)("div", {
                  children: [(0, _jsxRuntime.jsx)("label", {
                    className: "block text-xs uppercase tracking-wide mb-1",
                    style: {
                      color: theme.textDim
                    },
                    children: "Command Post Location"
                  }), SIDE_OPTS.map(o => (0, _jsxRuntime.jsx)(Pill, {
                    active: state.command.location === o,
                    onClick: () => setCommand("location", o, `Command Post Location: ${o}`),
                    children: o
                  }, o))]
                })]
              }), (0, _jsxRuntime.jsx)("div", {
                className: "flex-1",
                children: (0, _jsxRuntime.jsxs)(Section, {
                  title: "Communications",
                  fill: true,
                  children: [(0, _jsxRuntime.jsxs)("div", {
                    className: "mb-3",
                    children: [(0, _jsxRuntime.jsx)("label", {
                      className: "block text-xs uppercase tracking-wide mb-1",
                      style: {
                        color: theme.textDim
                      },
                      children: "TAC Channel"
                    }), (0, _jsxRuntime.jsxs)("select", {
                      value: state.lifeFlight.tacChannel || "",
                      onChange: e => setLifeFlightField("tacChannel", e.target.value, `TAC Channel: ${e.target.value}`),
                      className: "px-3 py-2 rounded text-sm outline-none w-32",
                      style: {
                        background: theme.panelAlt,
                        border: `1px solid ${theme.border}`,
                        color: theme.textPrimary
                      },
                      children: [(0, _jsxRuntime.jsx)("option", {
                        value: "",
                        children: "\u2014"
                      }), TAC_CHANNEL_OPTIONS.map(o => (0, _jsxRuntime.jsx)("option", {
                        value: o,
                        children: o
                      }, o))]
                    }), state.lifeFlight.tacChannel === "Other" && (0, _jsxRuntime.jsx)(TextField, {
                      className: "mt-2 w-32",
                      value: state.lifeFlight.tacChannelOther,
                      onChange: v => setLifeFlightField("tacChannelOther", v),
                      placeholder: "Specify"
                    })]
                  }), (0, _jsxRuntime.jsxs)("div", {
                    children: [(0, _jsxRuntime.jsx)("label", {
                      className: "block text-xs uppercase tracking-wide mb-1",
                      style: {
                        color: theme.textDim
                      },
                      children: "Ground Contact Channel"
                    }), GROUND_CONTACT_CHANNEL_OPTIONS.map(o => (0, _jsxRuntime.jsx)(Pill, {
                      active: state.lifeFlight.groundContactChannel === o,
                      onClick: () => setLifeFlightField("groundContactChannel", o, `Ground Contact Channel: ${o}`),
                      children: o
                    }, o)), state.lifeFlight.groundContactChannel === "Other" && (0, _jsxRuntime.jsx)(TextField, {
                      className: "mt-2 w-32",
                      value: state.lifeFlight.groundContactChannelOther,
                      onChange: v => setLifeFlightField("groundContactChannelOther", v),
                      placeholder: "Specify"
                    })]
                  })]
                })
              })]
            }), Array.from({
              length: patientCount
            }).map((_, i) => {
              const patient = state.lifeFlight.patients[i] || defaultPatient();
              return (0, _jsxRuntime.jsxs)(Section, {
                title: patientCount > 1 ? `Patient ${i + 1}` : "Patient Information",
                children: [(0, _jsxRuntime.jsxs)("div", {
                  className: "grid grid-cols-2 gap-2 mb-3",
                  children: [(0, _jsxRuntime.jsx)(TextField, {
                    label: "Age",
                    value: patient.age,
                    onChange: v => setPatientField(i, "age", v),
                    placeholder: "Age"
                  }), (0, _jsxRuntime.jsxs)("div", {
                    children: [(0, _jsxRuntime.jsx)("label", {
                      className: "block text-xs uppercase tracking-wide mb-1",
                      style: {
                        color: theme.textDim
                      },
                      children: "Sex"
                    }), ["Male", "Female"].map(o => (0, _jsxRuntime.jsx)(Pill, {
                      active: patient.sex === o,
                      onClick: () => setPatientField(i, "sex", o, `Patient ${i + 1} Sex: ${o}`),
                      children: o
                    }, o))]
                  })]
                }), (0, _jsxRuntime.jsxs)("div", {
                  className: "mb-3",
                  children: [(0, _jsxRuntime.jsx)("label", {
                    className: "block text-xs uppercase tracking-wide mb-1",
                    style: {
                      color: theme.textDim
                    },
                    children: "Weight"
                  }), (0, _jsxRuntime.jsxs)("div", {
                    className: "grid grid-cols-2 gap-2",
                    children: [(0, _jsxRuntime.jsx)(TextField, {
                      value: patient.weightKg,
                      onChange: v => handlePatientWeightChange(i, "kg", v),
                      placeholder: "kgs"
                    }), (0, _jsxRuntime.jsx)(TextField, {
                      value: patient.weightLbs,
                      onChange: v => handlePatientWeightChange(i, "lbs", v),
                      placeholder: "lbs"
                    })]
                  })]
                }), (0, _jsxRuntime.jsx)(TextField, {
                  label: "Problem Description",
                  value: patient.problemDescription,
                  onChange: v => setPatientField(i, "problemDescription", v),
                  placeholder: "Problem Description",
                  className: "mb-3"
                }), (0, _jsxRuntime.jsxs)("div", {
                  children: [(0, _jsxRuntime.jsx)("label", {
                    className: "block text-xs uppercase tracking-wide mb-1",
                    style: {
                      color: theme.textDim
                    },
                    children: "Interventions"
                  }), PATIENT_INTERVENTION_ITEMS.map(it => (0, _jsxRuntime.jsx)(CheckRow, {
                    label: it.label,
                    value: patient.interventions[it.key],
                    onToggle: () => togglePatientIntervention(i, it.key, it.label)
                  }, it.key)), patient.interventions.other != null && (0, _jsxRuntime.jsx)(TextField, {
                    className: "mt-1",
                    value: patient.interventionOther,
                    onChange: v => setPatientField(i, "interventionOther", v),
                    placeholder: "Intervention"
                  })]
                })]
              }, i);
            }), (0, _jsxRuntime.jsx)(ChecklistSection, {
              title: "Command Transfer",
              items: LIFE_FLIGHT_COMMAND_TRANSFER_ITEMS,
              data: state.commandTransfer,
              onToggle: (key, label) => toggleSimple("commandTransfer", key, label)
            }), (0, _jsxRuntime.jsxs)(Section, {
              title: "Landing Zone",
              children: [(0, _jsxRuntime.jsx)(TextField, {
                className: "mb-3",
                value: state.lifeFlight.landingZoneLocation,
                onChange: v => setLifeFlightField("landingZoneLocation", v),
                placeholder: "Landing Zone Location"
              }), LZ_SURFACE_ITEMS.map(it => (0, _jsxRuntime.jsx)(CheckRow, {
                label: it.label,
                value: state.lifeFlight.surface[it.key],
                onToggle: () => toggleLifeFlightNested("surface", it.key, it.label)
              }, it.key)), LZ_LIGHTING_ITEMS.map(it => (0, _jsxRuntime.jsx)(CheckRow, {
                label: it.label,
                value: state.lifeFlight.lighting[it.key],
                onToggle: () => toggleLifeFlightNested("lighting", it.key, it.label)
              }, it.key))]
            }), (0, _jsxRuntime.jsxs)(Section, {
              title: "Safety",
              children: [LZ_HAZARDS_ITEMS.map(it => (0, _jsxRuntime.jsx)(CheckRow, {
                label: it.label,
                value: state.lifeFlight.hazards[it.key],
                onToggle: () => toggleLifeFlightNested("hazards", it.key, it.label)
              }, it.key)), (0, _jsxRuntime.jsxs)("div", {
                className: "mt-3 mb-2",
                children: [(0, _jsxRuntime.jsx)("label", {
                  className: "block text-xs uppercase tracking-wide mb-1",
                  style: {
                    color: theme.textDim
                  },
                  children: "Wind Direction"
                }), WIND_DIRECTION_OPTIONS.map(o => (0, _jsxRuntime.jsx)(Pill, {
                  active: state.lifeFlight.windDirection === o,
                  onClick: () => setLifeFlightField("windDirection", o, `Wind Direction: ${o}`),
                  children: o
                }, o))]
              }), (0, _jsxRuntime.jsx)(TextField, {
                label: "Wind Speed",
                value: state.lifeFlight.windSpeed,
                onChange: v => setLifeFlightField("windSpeed", v),
                placeholder: "mph"
              })]
            }), (0, _jsxRuntime.jsxs)(CollapsibleSection, {
              title: "Mutual Aid",
              children: [(0, _jsxRuntime.jsx)(CheckRow, {
                label: "Fire",
                value: state.mutualAid.fire,
                onToggle: () => toggleSimple("mutualAid", "fire", "Fire")
              }), state.mutualAid.fire != null && (0, _jsxRuntime.jsxs)("select", {
                value: state.mutualAid.fireDept,
                onChange: e => setState(s => ({
                  ...s,
                  mutualAid: {
                    ...s.mutualAid,
                    fireDept: e.target.value
                  }
                })),
                className: "w-full px-3 py-2 rounded text-sm outline-none mb-1.5",
                style: {
                  background: theme.panelAlt,
                  border: `1px solid ${theme.border}`,
                  color: theme.textPrimary
                },
                children: [(0, _jsxRuntime.jsx)("option", {
                  value: "",
                  children: "Select department"
                }), MUTUAL_AID_FIRE_DEPTS.map(d => (0, _jsxRuntime.jsx)("option", {
                  value: d,
                  children: d
                }, d))]
              }), MUTUAL_AID_ITEMS.filter(it => it.key !== "fire").map(it => (0, _jsxRuntime.jsx)(CheckRow, {
                label: it.label,
                value: state.mutualAid[it.key],
                onToggle: () => toggleSimple("mutualAid", it.key, it.label)
              }, it.key))]
            })]
          }), (0, _jsxRuntime.jsx)(GroupHeader, {
            children: "Units & Assignments"
          }), (0, _jsxRuntime.jsx)("div", {
            className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
            children: [{
              key: "suppressionUnits",
              title: "Suppression",
              unitOptions: UNIT_OPTIONS,
              assignOptions: SUPPRESSION_ASSIGNMENT_OPTIONS
            }, {
              key: "emsUnits",
              title: "EMS",
              unitOptions: MEDIC_UNIT_OPTIONS,
              assignOptions: EMS_ASSIGNMENT_OPTIONS
            }].map(({
              key,
              title,
              unitOptions,
              assignOptions
            }) => (0, _jsxRuntime.jsx)(Section, {
              title: title,
              children: (0, _jsxRuntime.jsxs)("div", {
                className: "flex flex-col gap-2",
                children: [state.lifeFlight[key].map(u => (0, _jsxRuntime.jsxs)("div", {
                  className: "flex items-center gap-2 p-2 rounded",
                  style: {
                    background: theme.panelAlt,
                    border: `1px solid ${theme.border}`
                  },
                  children: [(0, _jsxRuntime.jsxs)("select", {
                    value: u.unit,
                    onChange: e => updateLifeFlightUnit(key, u.id, "unit", e.target.value),
                    className: "w-24 px-2 py-1.5 rounded text-sm outline-none",
                    style: {
                      background: theme.bg,
                      border: `1px solid ${theme.border}`,
                      color: theme.textPrimary,
                      fontFamily: mono
                    },
                    children: [(0, _jsxRuntime.jsx)("option", {
                      value: "",
                      children: "Unit"
                    }), unitOptions.map(o => (0, _jsxRuntime.jsx)("option", {
                      value: o,
                      children: o
                    }, o))]
                  }), (0, _jsxRuntime.jsxs)("select", {
                    value: u.assign,
                    onChange: e => updateLifeFlightUnit(key, u.id, "assign", e.target.value),
                    className: "flex-1 px-2 py-1.5 rounded text-sm outline-none min-w-0",
                    style: {
                      background: theme.bg,
                      border: `1px solid ${theme.border}`,
                      color: theme.textPrimary
                    },
                    children: [(0, _jsxRuntime.jsx)("option", {
                      value: "",
                      children: "Assignment"
                    }), assignOptions.map(o => (0, _jsxRuntime.jsx)("option", {
                      value: o,
                      children: o
                    }, o))]
                  }), (0, _jsxRuntime.jsx)("button", {
                    onClick: () => removeLifeFlightUnit(key, u.id),
                    style: {
                      color: theme.textDim
                    },
                    children: (0, _jsxRuntime.jsx)(X, {
                      size: 16
                    })
                  })]
                }, u.id)), (0, _jsxRuntime.jsxs)("button", {
                  onClick: () => addLifeFlightUnit(key),
                  className: "flex items-center justify-center gap-1 py-2 rounded text-xs font-bold",
                  style: {
                    background: theme.goldDim,
                    border: `1px solid ${theme.gold}`,
                    color: theme.gold
                  },
                  children: [(0, _jsxRuntime.jsx)(Plus, {
                    size: 14
                  }), " Add Unit"]
                })]
              })
            }, key))
          })]
        }), tab === "mayday" && (0, _jsxRuntime.jsxs)("div", {
          className: "flex flex-col gap-4",
          children: [(0, _jsxRuntime.jsxs)(Section, {
            title: "1. Initial Actions",
            children: [(0, _jsxRuntime.jsx)(CheckRow, {
              label: "SEMS",
              value: state.mayday.sems,
              onToggle: () => toggleSimple("mayday", "sems", "Step 1: SEMS")
            }), (0, _jsxRuntime.jsxs)("div", {
              className: "grid grid-cols-2 gap-2 mb-1.5",
              children: [(0, _jsxRuntime.jsx)(CheckRow, {
                label: "Unit in Alarm",
                value: state.mayday.unitInAlarm,
                onToggle: () => toggleSimple("mayday", "unitInAlarm", "Step 1: Unit in Alarm")
              }), (0, _jsxRuntime.jsx)(TextField, {
                value: state.mayday.unitInAlarmId,
                onChange: v => setMaydayField("unitInAlarmId", v),
                placeholder: "Unit ID"
              })]
            }), (0, _jsxRuntime.jsxs)("div", {
              className: "grid grid-cols-2 gap-2 mb-1.5",
              children: [(0, _jsxRuntime.jsx)(CheckRow, {
                label: "Air Supply",
                value: state.mayday.airSupplyStep1,
                onToggle: () => toggleSimple("mayday", "airSupplyStep1", "Step 1: Air Supply")
              }), (0, _jsxRuntime.jsx)(TextField, {
                value: state.mayday.airSupplyStep1Value,
                onChange: v => setMaydayField("airSupplyStep1Value", v),
                placeholder: "Air Supply"
              })]
            }), (0, _jsxRuntime.jsxs)("div", {
              className: "grid grid-cols-2 gap-2",
              children: [(0, _jsxRuntime.jsx)(CheckRow, {
                label: "Mobile Radio",
                value: state.mayday.mobileRadio,
                onToggle: () => toggleSimple("mayday", "mobileRadio", "Step 1: Mobile Radio")
              }), (0, _jsxRuntime.jsx)(TextField, {
                value: state.mayday.mobileRadioId,
                onChange: v => setMaydayField("mobileRadioId", v),
                placeholder: "Radio ID"
              })]
            })]
          }), (0, _jsxRuntime.jsx)(Section, {
            title: "2. Transmit",
            children: (0, _jsxRuntime.jsx)(CheckRow, {
              label: `"Command to all units, clear this channel for a Mayday. Unit calling a Mayday, go ahead with your CAN Report."`,
              value: state.mayday.step2,
              onToggle: () => toggleSimple("mayday", "step2", "Step 2: Transmit — clear channel for Mayday")
            })
          }), (0, _jsxRuntime.jsxs)(Section, {
            title: "3. Listen & Document",
            children: [(0, _jsxRuntime.jsx)(CheckRow, {
              label: "Listen & Document",
              value: state.mayday.step3,
              onToggle: () => toggleSimple("mayday", "step3", "Step 3: Listen & Document")
            }), (0, _jsxRuntime.jsxs)("div", {
              className: "mt-3 mb-1",
              children: [(0, _jsxRuntime.jsx)("label", {
                className: "block text-xs uppercase tracking-wide mb-1",
                style: {
                  color: theme.textDim
                },
                children: "Who"
              }), (0, _jsxRuntime.jsxs)("div", {
                className: "grid grid-cols-2 gap-2",
                children: [(0, _jsxRuntime.jsx)(TextField, {
                  value: state.mayday.whoName,
                  onChange: v => setMaydayField("whoName", v),
                  placeholder: "Name"
                }), (0, _jsxRuntime.jsx)(TextField, {
                  value: state.mayday.whoUnit,
                  onChange: v => setMaydayField("whoUnit", v),
                  placeholder: "Unit ID"
                })]
              })]
            }), (0, _jsxRuntime.jsxs)("div", {
              className: "mt-3 mb-1",
              children: [(0, _jsxRuntime.jsx)("label", {
                className: "block text-xs uppercase tracking-wide mb-1",
                style: {
                  color: theme.textDim
                },
                children: "What"
              }), (0, _jsxRuntime.jsx)("div", {
                className: "flex flex-wrap",
                children: MAYDAY_WHAT_OPTIONS.map(o => (0, _jsxRuntime.jsx)(Pill, {
                  active: state.mayday.what === o,
                  onClick: () => setMaydayField("what", o, `Mayday What: ${o}`),
                  color: theme.red,
                  children: o
                }, o))
              }), state.mayday.what === "Other" && (0, _jsxRuntime.jsx)(TextField, {
                className: "mt-2",
                value: state.mayday.whatOther,
                onChange: v => setMaydayField("whatOther", v),
                placeholder: "Specify"
              })]
            }), (0, _jsxRuntime.jsxs)("div", {
              className: "mt-3 mb-1",
              children: [(0, _jsxRuntime.jsx)("label", {
                className: "block text-xs uppercase tracking-wide mb-1",
                style: {
                  color: theme.textDim
                },
                children: "Where \u2014 Side"
              }), (0, _jsxRuntime.jsx)("div", {
                className: "flex flex-wrap",
                children: SIDE_OPTS.map(o => (0, _jsxRuntime.jsx)(Pill, {
                  active: state.mayday.whereSide === o,
                  onClick: () => setMaydayField("whereSide", o, `Mayday Side: ${o}`),
                  children: o
                }, o))
              })]
            }), (0, _jsxRuntime.jsxs)("div", {
              className: "mt-3 mb-1",
              children: [(0, _jsxRuntime.jsx)("label", {
                className: "block text-xs uppercase tracking-wide mb-1",
                style: {
                  color: theme.textDim
                },
                children: "Where \u2014 Division"
              }), (0, _jsxRuntime.jsx)("div", {
                className: "flex flex-wrap",
                children: MAYDAY_DIVISION_OPTIONS.map(o => (0, _jsxRuntime.jsx)(Pill, {
                  active: state.mayday.whereDivision === o,
                  onClick: () => setMaydayField("whereDivision", o, `Mayday Division: ${o}`),
                  children: o
                }, o))
              }), state.mayday.whereDivision === "Other" && (0, _jsxRuntime.jsx)(TextField, {
                className: "mt-2",
                value: state.mayday.whereDivisionOther,
                onChange: v => setMaydayField("whereDivisionOther", v),
                placeholder: "Specify"
              })]
            }), (0, _jsxRuntime.jsx)(TextField, {
              label: "Air Supply",
              value: state.mayday.airSupply,
              onChange: v => setMaydayField("airSupply", v),
              placeholder: "Air Supply",
              className: "mt-3"
            })]
          }), (0, _jsxRuntime.jsx)(Section, {
            title: "4. Transmit",
            children: (0, _jsxRuntime.jsx)(CheckRow, {
              label: `"NAME, I copy your Mayday. (Repeat Who, What, Where); RIT is being deployed, initiate your GRAB-LIVES procedure. Remain calm & control your breathing."`,
              value: state.mayday.step4,
              onToggle: () => toggleSimple("mayday", "step4", "Step 4: Transmit — copy Mayday / deploy RIT / GRAB-LIVES")
            })
          }), (0, _jsxRuntime.jsxs)(Section, {
            title: "5. Deploy",
            children: [(0, _jsxRuntime.jsx)(CheckRow, {
              label: "Deploy units to address the Mayday. (Help Order) \u2014 Continue to PUT THE FIRE OUT!",
              value: state.mayday.step5,
              onToggle: () => toggleSimple("mayday", "step5", "Step 5: Deploy units to address the Mayday")
            }), (0, _jsxRuntime.jsxs)("div", {
              className: "mt-2",
              children: [(0, _jsxRuntime.jsx)("label", {
                className: "block text-xs uppercase tracking-wide mb-1",
                style: {
                  color: theme.textDim
                },
                children: "Rescue Group"
              }), (0, _jsxRuntime.jsxs)("div", {
                className: "flex flex-wrap",
                children: [activeTacticalUnits.map(o => (0, _jsxRuntime.jsx)(Pill, {
                  active: state.mayday.rescueGroup.includes(o),
                  onClick: () => toggleRescueGroupUnit(o),
                  children: o
                }, o)), (0, _jsxRuntime.jsx)(Pill, {
                  active: state.mayday.rescueGroup.includes("Other"),
                  onClick: () => toggleRescueGroupUnit("Other"),
                  children: "Other"
                })]
              }), state.mayday.rescueGroup.includes("Other") && (0, _jsxRuntime.jsx)(TextField, {
                className: "mt-2",
                value: state.mayday.rescueGroupOther,
                onChange: v => setMaydayField("rescueGroupOther", v),
                placeholder: "Unit"
              })]
            })]
          }), (0, _jsxRuntime.jsx)(Section, {
            title: "6. Transmit",
            children: (0, _jsxRuntime.jsx)(CheckRow, {
              label: `"Command to Dispatch, give me Emergency Traffic Tones and an additional alarm; we have an active Mayday event."`,
              value: state.mayday.step6,
              onToggle: () => toggleSimple("mayday", "step6", "Step 6: Transmit — Emergency Traffic Tones / additional alarm")
            })
          }), (0, _jsxRuntime.jsx)(Section, {
            title: "7. CAN Report",
            children: (0, _jsxRuntime.jsx)(CheckRow, {
              label: "Once Emergency Traffic Tones clear, provide a brief Mayday CAN Report",
              value: state.mayday.step7,
              onToggle: () => toggleSimple("mayday", "step7", "Step 7: Brief Mayday CAN Report")
            })
          }), (0, _jsxRuntime.jsx)(Section, {
            title: "8. Transmit",
            children: (0, _jsxRuntime.jsx)(CheckRow, {
              label: `"Command to all units, we have a Mayday in progress, (Who, What, Where); maintain radio silence."`,
              value: state.mayday.step8,
              onToggle: () => toggleSimple("mayday", "step8", "Step 8: Transmit — Mayday in progress to all units")
            })
          }), (0, _jsxRuntime.jsxs)(Section, {
            title: "9. Assign",
            children: [(0, _jsxRuntime.jsx)(CheckRow, {
              label: "Assign additional company to RIT",
              value: state.mayday.step9AdditionalRit,
              onToggle: () => toggleSimple("mayday", "step9AdditionalRit", "Step 9: Assign additional company to RIT"),
              disabled: !additionalRitAssigned,
              hint: "Requires two units assigned RIT on the Tactical Worksheet"
            }), (0, _jsxRuntime.jsx)(CheckRow, {
              label: "Assign additional Division Officer",
              value: state.mayday.step9AdditionalDivisionOfficer,
              onToggle: () => toggleSimple("mayday", "step9AdditionalDivisionOfficer", "Step 9: Assign additional Division Officer"),
              disabled: !additionalDivisionAssigned,
              hint: "Requires two units assigned Division on the Tactical Worksheet"
            }), (0, _jsxRuntime.jsx)(CheckRow, {
              label: "Assign Level 2 Staging location for additional alarm units",
              value: state.mayday.step9Level2Staging,
              onToggle: () => toggleSimple("mayday", "step9Level2Staging", "Step 9: Assign Level 2 Staging location for additional alarm units")
            }), (0, _jsxRuntime.jsx)(TextField, {
              value: state.mayday.level2StagingLocation,
              onChange: v => setMaydayLevel2Staging(v),
              placeholder: "Location"
            })]
          }), (0, _jsxRuntime.jsxs)(Section, {
            title: "Mayday Manager",
            children: [["IC", "Division", "Other"].map(o => (0, _jsxRuntime.jsx)(Pill, {
              active: state.mayday.managerType === o,
              onClick: () => setMaydayField("managerType", o, `Mayday Manager: ${o}`),
              children: o
            }, o)), state.mayday.managerType === "Division" && (0, _jsxRuntime.jsx)("div", {
              className: "mt-2",
              children: SIDE_OPTS.map(o => (0, _jsxRuntime.jsx)(Pill, {
                active: state.mayday.managerDivision === o,
                onClick: () => setMaydayField("managerDivision", o, `Mayday Manager Division: ${o}`),
                children: o
              }, o))
            }), state.mayday.managerType === "Other" && (0, _jsxRuntime.jsx)(TextField, {
              className: "mt-2",
              value: state.mayday.managerOther,
              onChange: v => setMaydayField("managerOther", v),
              placeholder: "Unit"
            })]
          }), (0, _jsxRuntime.jsxs)(Section, {
            title: "10. Clearing the Mayday",
            children: [(0, _jsxRuntime.jsx)(CheckRow, {
              label: "Conduct a PAR prior to clearing the MAYDAY",
              value: state.mayday.step10,
              onToggle: () => toggleSimple("mayday", "step10", "Step 10: Conduct a PAR prior to clearing the MAYDAY"),
              bold: true
            }), (0, _jsxRuntime.jsx)(CheckRow, {
              label: `Transmit: "Command to Dispatch, the Mayday firefighter has been extricated from the building and is currently in treatment with EMS. I have a PAR on all units. Discontinue the Mayday event at (Command Location). All units, resume normal radio traffic. We will remain in the Offensive/Defensive Strategy; I am holding the current assignment."`,
              value: state.mayday.step10Transmit,
              onToggle: () => toggleSimple("mayday", "step10Transmit", "Step 10: Transmit — discontinue Mayday event"),
              bold: true
            })]
          })]
        }), tab === "log" && (0, _jsxRuntime.jsxs)(Section, {
          title: "Incident Log",
          children: [(0, _jsxRuntime.jsxs)("div", {
            className: "flex gap-2 mb-4",
            children: [(0, _jsxRuntime.jsx)("input", {
              value: noteText,
              onChange: e => setNoteText(e.target.value),
              onKeyDown: e => e.key === "Enter" && addNote(),
              placeholder: "Add a note...",
              className: "flex-1 px-3 py-2 rounded text-sm outline-none min-w-0",
              style: {
                background: theme.panelAlt,
                border: `1px solid ${theme.border}`,
                color: theme.textPrimary
              }
            }), (0, _jsxRuntime.jsxs)("button", {
              onClick: addNote,
              className: "flex items-center gap-1 px-3 py-2 rounded text-sm font-bold shrink-0",
              style: {
                background: theme.gold,
                color: "#fff"
              },
              children: [(0, _jsxRuntime.jsx)(Plus, {
                size: 14
              }), " Add"]
            })]
          }), (0, _jsxRuntime.jsxs)("div", {
            className: "flex flex-col gap-1.5",
            children: [state.log.length === 0 && (0, _jsxRuntime.jsx)("div", {
              className: "text-sm py-6 text-center",
              style: {
                color: theme.textDim
              },
              children: "Nothing logged yet."
            }), state.log.map(entry => (0, _jsxRuntime.jsxs)("div", {
              className: "flex gap-3 text-sm",
              children: [(0, _jsxRuntime.jsx)("span", {
                className: "tabular-nums shrink-0",
                style: {
                  color: theme.textDim,
                  fontFamily: mono
                },
                children: formatElapsed(entry.time)
              }), (0, _jsxRuntime.jsx)("span", {
                children: entry.text
              })]
            }, entry.id))]
          })]
        })]
      })]
    })]
  });
}
ReactDOM.createRoot(document.getElementById('root')).render((0, _jsxRuntime.jsx)(TacticalWorksheet, {}));