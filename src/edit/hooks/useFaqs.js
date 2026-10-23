import { useDataFile } from "./useDataFile.js";
import { createListActions } from "./createListActions.js";
import { DATA_FILES } from "../constants.js";

export const FAQ_PAGES = ["homepage", "about", "exterior", "interior"];

export function useFaqs() {
    const hook = useDataFile(DATA_FILES.faqs, { commitPrefix: "Update" });
    const lists = Object.fromEntries(
        FAQ_PAGES.map((page) => [page, createListActions(hook, (d) => d[page])]),
    );
    return { ...hook, lists };
}
