import { useMutation, useSelf } from "../liveblocks.config"

export const useBringToFront = () => {
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
        for (let i = indicies.length - 1; i >= 0; i--){
            liveLayerIds.move(indicies[i], arr.length - 1 - (indicies.length - 1 - i));
        }
    }, [selection])
};

