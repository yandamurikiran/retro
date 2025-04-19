// Declaration file for navigator extensions

interface BatteryManager {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  onchargingchange: Event | null;
  onchargingtimechange: Event | null;
  ondischargingtimechange: Event | null;
  onlevelchange: Event | null;
}

interface NavigatorBattery {
  getBattery(): Promise<BatteryManager>;
}

interface NavigatorConnection {
  connection: {
    effectiveType?: string;
    type?: string;
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
  };
}

interface Navigator extends NavigatorBattery, NavigatorConnection {
  deviceMemory?: number;
}