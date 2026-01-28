export declare const tools: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            limit: {
                type: string;
                description: string;
            };
        };
        required: never[];
    };
    execute: ({ limit }: {
        limit?: number;
    }) => Promise<{
        success: boolean;
        total: any;
        registros: any;
        error?: undefined;
        mensaje?: undefined;
    } | {
        success: boolean;
        error: any;
        mensaje: string;
        total?: undefined;
        registros?: undefined;
    }>;
}[];
