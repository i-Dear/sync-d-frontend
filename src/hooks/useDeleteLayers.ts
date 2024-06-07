import { useSelf, useMutation } from "~/liveblocks.config";
import { VoteLayer } from "@/lib/types";
/**
 * Delete all the selected layers.
 */
export default function useDeleteLayers() {
  const selection = useSelf((me) => me.presence.selection);
  return useMutation(
    ({ storage, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const liveLayerIds = storage.get("layerIds");
      for (const id of selection) {
        // Delete the layer from the layers LiveMap
        const layerData = liveLayers.get(id);
        const layerType = layerData?.get("type");
        if (layerType === 8) {
          const layerDataObject = layerData?.toObject() as VoteLayer;
          const number = layerDataObject.number;
          storage.get("voteList").get("voteMap").set(number, false);
        }
        liveLayers.delete(id);

        // Find the layer index in the z-index list and remove it
        const index = liveLayerIds.indexOf(id);
        if (index !== -1) {
          liveLayerIds.delete(index);
        }
      }
      setMyPresence({ selection: [] }, { addToHistory: true });
    },
    [selection],
  );
}
