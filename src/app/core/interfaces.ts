export interface IUserResponse {
    user: '';
    token: string;
}

export interface IStone {
    id: string;
    _id: string;
    name: string;
    color: string;
    x: number;
    y: number;
    background: ImageData;
    drag: boolean;
    email: string;
}

export interface IPixelPosition {
    x: number;
    y: number;
}
