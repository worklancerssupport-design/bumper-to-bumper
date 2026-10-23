import { useDataFile } from "./useDataFile.js";
import { createListActions } from "./createListActions.js";
import { DATA_FILES } from "../constants.js";

/**
 * @param {"exterior" | "interior"} category
 */
export function useProducts(category) {
    const file = category === "interior" ? DATA_FILES.productsInterior : DATA_FILES.productsExterior;
    const hook = useDataFile(file, { commitPrefix: "Update" });
    return {
        ...hook,
        lists: {
            items: createListActions(hook, (d) => d.items),
            groups: createListActions(hook, (d) => d.groups),
            filterTags: createListActions(hook, (d) => d.filterTags),
        },
    };
}
