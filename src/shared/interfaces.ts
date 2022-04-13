export interface PaginatedData<T> {
    data: T[];
    pagination: {
        total: number;
        page: number;
        limit: number;
    }
}
