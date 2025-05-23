import { useMutation } from "convex/react";
import { useState } from "react";

export const useApiMutation = (mutationFunction: any) => {
    const [pending, setPending] = useState(false);
    const useApiMutation = useMutation(mutationFunction);

    const mutate = (payload: any) => {
        setPending(true);
        return useApiMutation(payload)
            .finally(() => setPending(false))
            .then((result) => {
                return result;
            })
            .catch ((error) => {
                throw error;
            });
    };
    return {
        mutate,
        pending,
    };
};