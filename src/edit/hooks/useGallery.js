import { useDataFile } from "./useDataFile.js";
import { createListActions } from "./createListActions.js";
import { DATA_FILES } from "../constants.js";

export function useGallery() {
    const hook = useDataFile(DATA_FILES.gallery, { commitPrefix: "Update" });
    return {
        ...hook,
        lists: {
            items: createListActions(hook, (d) => d.items),
            categories: createListActions(hook, (d) => d.categories),
        },
    };
}
