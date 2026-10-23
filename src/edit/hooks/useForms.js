import { useDataFile } from "./useDataFile.js";
import { createListActions } from "./createListActions.js";
import { DATA_FILES } from "../constants.js";

export function useForms() {
    const hook = useDataFile(DATA_FILES.forms, { commitPrefix: "Update" });
    return {
        ...hook,
        lists: {
            contactServices: createListActions(hook, (d) => d.contactServices),
            quickEnquiryServices: createListActions(hook, (d) => d.quickEnquiryServices),
            franchiseInvestments: createListActions(hook, (d) => d.franchiseInvestments),
        },
    };
}
