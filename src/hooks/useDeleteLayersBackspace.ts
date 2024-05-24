import { useSelf, useMutation } from "~/liveblocks.config";

/**
 * Delete all the selected layers.
 */
export default function useDeleteLayersBackspace(key?: string) {
  const selection = useSelf((me) => me.presence.selection);
  return useMutation(
    ({ storage, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const liveLayerIds = storage.get("layerIds");
      for (const id of selection) {
        // Delete the layer from the layers LiveMap
        const layerData = liveLayers.get(id);

        const layerType = layerData?.get("type");
        if (
          (layerType === 3 && selection.length === 1) ||
          (layerType === 4 && selection.length === 1) ||
          (layerType === 6 && selection.length === 1) ||
          (layerType === 7 && selection.length === 1) ||
          (layerType === 8 && selection.length === 1)
        ) {
          continue;
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
