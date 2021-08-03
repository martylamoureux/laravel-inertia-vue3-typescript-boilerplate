export interface PaginatorLink {
    url?: string
    label: string
    active: boolean
}

export default interface Paginator<T> {
    current_page: number;
    from: number;
    to: number;
    total: number;
    per_page: number;
    last_page: number;
    path: string;
    first_page_url: string;
    prev_page_url?: string;
    next_page_url?: string;
    last_page_url: string;
    links: PaginatorLink[];
    data: T[];
}
