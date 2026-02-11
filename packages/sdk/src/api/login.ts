import type { UserInput } from "@drum-scheduler/contracts";
import { ApiClient } from "../api-client";



export const login = async ({email, password}: UserInput, baseUrl: string) => {

    const client = new ApiClient(baseUrl);
    const result = await client.post("/auth/login", { email, password });

    if("error" in result) {
        throw new Error(result.error.message);
    }

    return result.data;

}