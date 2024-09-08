import { useParams } from "next/navigation";

export const useApplicationName = () => {
    const params = useParams();
    return params.app as string;
};