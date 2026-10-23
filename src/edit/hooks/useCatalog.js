import { useDataFile } from "./useDataFile.js";
import { createListActions } from "./createListActions.js";
import { DATA_FILES } from "../constants.js";

export function useCatalog() {
    const hook = useDataFile(DATA_FILES.catalog, { commitPrefix: "Update" });
    return {
        ...hook,
        lists: {
            categories: createListActions(hook, (d) => d.categories),
            carBrands: createListActions(hook, (d) => d.carBrands),
            showcaseVehicles: createListActions(hook, (d) => d.showcaseVehicles),
        },
    };
}
