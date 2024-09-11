import { useCallback, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

type RequestType = { workspaceId: Id<"workspaces"> };
type ResponseType = Id<"workspaces"> | null;

type Options = {
    onSuccess?: (data: ResponseType) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    throwError?: boolean;
}

export const useNewJoinCode = () => {
    const [data, setData] = useState<ResponseType>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSettled, setIsSettled] = useState(false);


    const mutation = useMutation(api.workspaces.newJoinCode);
    const mutate = useCallback(async (values: RequestType, options?: Options) => {
        try{
            setIsPending(true);
            // Reset all
            setData(null);
            setError(null);
            setIsError(false);
            setIsSettled(false);
            setIsSuccess(false);
            const response = await mutation(values);
            options?.onSuccess?.(response);
            return response;
        } catch (error) {
            options?.onError?.(error as Error);
            if(options?.throwError){
                throw error;
            }
        } finally {
            setIsPending(false);
            setIsSettled(true);
            options?.onSettled?.();
        }
    }, [mutation]);

    return{
        mutate,
        data,
        error,
        isSettled,
        isPending,
        isError,
        isSuccess
    }
}