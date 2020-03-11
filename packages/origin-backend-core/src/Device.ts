export enum DeviceStatus {
    Submitted,
    Denied,
    Active
}

export interface ISmartMeterRead {
    meterReading: number;
    timestamp: number;
}

export interface IEnergyGenerated {
    energy: number;
    timestamp: number;
}

export interface ISmartMeterReadingsAdapter {
    get(device: IDeviceWithId): Promise<ISmartMeterRead[]>;
    save(device: IDeviceWithId, smRead: ISmartMeterRead): Promise<void>;
}

export interface IDevice {
    status: DeviceStatus;
    facilityName: string;
    description: string;
    images: string;
    address: string;
    region: string;
    province: string;
    country: string;
    operationalSince: number;
    capacityInW: number;
    gpsLatitude: string;
    gpsLongitude: string;
    timezone: string;
    deviceType: string;
    complianceRegistry: string;
    otherGreenAttributes: string;
    typeOfPublicSupport: string;
    smartMeterReads: ISmartMeterRead[];
    deviceGroup?: string;
    idInRegistry?: string;
    generationRealTimeId?: string;
    generationProductionId?: string;
}

export interface IDeviceWithId extends IDevice {
    id: number;
}

export type DeviceUpdateData = Pick<IDevice, 'status'>;
