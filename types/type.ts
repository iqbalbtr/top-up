export type ApiResponse<T> = {
    message: string;
    result: T
}

export type TriPayApiResponse<T> = {
    message: string;
    data: T,
    success?: boolean
}