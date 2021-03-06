import {
    UserRegisterReturnData,
    UserRegistrationData,
    UserLoginData,
    UserLoginReturnData,
    UserUpdateData,
    IUserWithRelationsIds,
    IUserProperties,
    IUserWithRelations,
    IUser,
    UserPasswordUpdate
} from '@energyweb/origin-backend-core';

import { IRequestClient, RequestClient } from './RequestClient';

type UpdateUserResponseReturnType = IUserWithRelationsIds;

export interface IUserClient {
    login(email: string, password: string): Promise<UserLoginReturnData>;
    logout(): Promise<void>;
    register(data: UserRegistrationData): Promise<UserRegisterReturnData>;
    me(): Promise<IUserWithRelationsIds>;
    getUserById(id: string): Promise<IUserWithRelationsIds>;
    attachSignedMessage(signedMessage: string): Promise<UpdateUserResponseReturnType>;
    updateAdditionalProperties(
        properties: Partial<Pick<IUserProperties, 'notifications'>>
    ): Promise<UpdateUserResponseReturnType>;
    updateProfile(formData: IUser): Promise<IUserWithRelations>;
    updatePassword(formData: UserPasswordUpdate): Promise<IUserWithRelations>;
    updateChainAddress(formData: IUser): Promise<IUserWithRelations>;
}

export class UserClient implements IUserClient {
    constructor(
        private readonly dataApiUrl: string,
        private readonly requestClient: IRequestClient = new RequestClient()
    ) {}

    private get authEndpoint() {
        return `${this.dataApiUrl}/auth`;
    }

    private get userEndpoint() {
        return `${this.dataApiUrl}/user`;
    }

    public async register(formData: UserRegistrationData): Promise<UserRegisterReturnData> {
        const url = `${this.userEndpoint}/register`;
        const { data } = await this.requestClient.post<
            UserRegistrationData,
            UserRegisterReturnData
        >(url, formData);

        return data;
    }

    public async login(email: string, password: string) {
        const url = `${this.authEndpoint}/login`;
        const { data } = await this.requestClient.post<UserLoginData, UserLoginReturnData>(url, {
            username: email,
            password
        });

        if (data?.accessToken) {
            this.requestClient.authenticationToken = data.accessToken;
        }

        return data;
    }

    public async logout() {
        this.requestClient.authenticationToken = null;
    }

    public async me(): Promise<IUserWithRelationsIds> {
        const url = `${this.userEndpoint}/me`;
        const { data } = await this.requestClient.get<unknown, IUserWithRelationsIds>(url);

        return data;
    }

    public async attachSignedMessage(signedMessage: string) {
        return this.updateUser({ blockchainAccountSignedMessage: signedMessage });
    }

    public async updateAdditionalProperties(
        properties: Partial<Pick<IUserProperties, 'notifications'>>
    ) {
        return this.updateUser(properties);
    }

    public async getUserById(id: string): Promise<IUserWithRelationsIds> {
        const url = `${this.userEndpoint}/${id}`;
        const { data } = await this.requestClient.get<unknown, IUserWithRelationsIds>(url);

        return data;
    }

    private async updateUser(updatedUserInfo: UserUpdateData): Promise<IUserWithRelationsIds> {
        const { data } = await this.requestClient.put<UserUpdateData, IUserWithRelationsIds>(
            this.userEndpoint,
            updatedUserInfo
        );

        return data;
    }

    public async updateProfile(formData: IUser): Promise<IUserWithRelations> {
        const response = await this.requestClient.put<UserUpdateData, IUserWithRelations>(
            `${this.userEndpoint}/profile`,
            formData
        );
        return response.data;
    }
    public async updatePassword(formData: UserPasswordUpdate): Promise<IUserWithRelations> {
        const response = await this.requestClient.put<UserPasswordUpdate, IUserWithRelations>(
            `${this.userEndpoint}/password`,
            formData
        );
        return response.data;   
    }
    public async updateChainAddress(formData: IUser): Promise<IUserWithRelations> {
        const response = await this.requestClient.put<UserUpdateData, IUserWithRelations>(
            `${this.userEndpoint}/chainAddress`,
            formData
        );
        return response.data;
    }
}
