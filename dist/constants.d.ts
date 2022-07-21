export declare const LICENSES: string[][];
export declare const OEMBED_PROVIDERS: ({
    provider_name: string;
    provider_url: string;
    endpoints: {
        schemes: string[];
        url: string;
    }[];
} | {
    provider_name: string;
    provider_url: string;
    endpoints: {
        schemes: string[];
        url: string;
        discovery: boolean;
    }[];
} | {
    provider_name: string;
    provider_url: string;
    endpoints: {
        schemes: string[];
        url: string;
        discovery: boolean;
        formats: string[];
    }[];
} | {
    provider_name: string;
    provider_url: string;
    endpoints: {
        schemes: string[];
        url: string;
        formats: string[];
    }[];
} | {
    provider_name: string;
    provider_url: string;
    endpoints: {
        url: string;
        discovery: boolean;
    }[];
} | {
    provider_name: string;
    provider_url: string;
    endpoints: {
        url: string;
    }[];
} | {
    provider_name: string;
    provider_url: string;
    endpoints: {
        url: string;
        discovery: boolean;
        formats: string[];
    }[];
} | {
    provider_name: string;
    provider_url: string;
    endpoints: {
        url: string;
        formats: string[];
    }[];
})[];
