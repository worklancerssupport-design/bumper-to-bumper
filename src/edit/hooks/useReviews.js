import { useDataFile } from "./useDataFile.js";
import { createListActions } from "./createListActions.js";
import { DATA_FILES } from "../constants.js";

export function useReviews() {
    const hook = useDataFile(DATA_FILES.reviews, { commitPrefix: "Update" });
    return {
        ...hook,
        lists: {
            reviews: createListActions(hook, (d) => d.reviews),
            highlights: createListActions(hook, (d) => d.highlights),
        },
    };
}
