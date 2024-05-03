import graphqlDataProvider, { 
    GraphQLClient,
    liveProvider as graphqlLiveProvider
} from "@refinedev/nestjs-query";
import { customFetch, getGraphQLErrors } from "./fetch-wrapper";
import { createClient } from "graphql-ws";

export const API_BASE_URL = 'https://api.crm.refine.dev';
export const API_URL = `${API_BASE_URL}/graphql`;
export const WS_URL = 'wss://api.crm.refine.dev/graphql';

export const client = new GraphQLClient(API_URL, {
    fetch: (url: string, options: RequestInit) => {

        try {
            
            return fetchWrapper(url, options);

        } catch (error) {
            
            return Promise.reject(error as Error);
        }

    }
});

export const wsClient = typeof window !== "undefined" ? createClient({
    url: WS_URL,
    connectionParams: () => {
        const accessToken = localStorage.getItem('access_token');

        return {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }
    }
}): undefined;

const fetchWrapper = async(url: string, options: RequestInit) => {
    const response = await customFetch(url, options);
    const responseClone = response.clone();
    const body = await responseClone.json();
    const error = getGraphQLErrors(body);

    if(error) {
        throw error;
    }

    return response;
}

export const dataProvider = graphqlDataProvider(client);
export const liveProvider = wsClient ? graphqlLiveProvider(wsClient) : undefined;