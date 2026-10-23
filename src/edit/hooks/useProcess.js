import { useDataFile } from "./useDataFile.js";
import { createListActions } from "./createListActions.js";
import { DATA_FILES } from "../constants.js";

export function useProcess() {
    const hook = useDataFile(DATA_FILES.process, { commitPrefix: "Update" });
    return {
        ...hook,
        lists: {
            steps: createListActions(hook, (d) => d),
        },
    };
}
