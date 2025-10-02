
export interface IResponse {
    success: boolean;
    error?: number;
    errorMessage?: string;
    errorDescription?:string;
}


export interface IFindAllResponse <T> extends IResponse{
    response: {
        count: number
        rows: Array<T>
    };
}

export interface IFindResponse <T> extends IResponse{
    response: T;
}

export interface ICreateResponse <T> extends IResponse{
    response: T;
}