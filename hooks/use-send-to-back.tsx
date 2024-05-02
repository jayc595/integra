import { useMutation, useSelf } from "../liveblocks.config"

export const useSendToBack = () => {
    const selection = useSelf((me) => me.presence.selection);

    return useMutation((
        { storage }
    ) => {
        const liveLayerIds = storage.get("layerIds");
        const indicies: number[] = [];

        const arr = liveLayerIds.toArray();
        for(let i = 0; i < arr.length; i++){
            if(selection.includes(arr[i])){
                indicies.push(i);
            }
        }
        for (let i = 0; i < indicies.length; i++){
            liveLayerIds.move(indicies[i], i);
        }
    }, [selection])
};

