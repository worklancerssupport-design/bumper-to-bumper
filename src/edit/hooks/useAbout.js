import { useDataFile } from "./useDataFile.js";
import { createListActions } from "./createListActions.js";
import { DATA_FILES } from "../constants.js";

export function useAbout() {
    const hook = useDataFile(DATA_FILES.about, { commitPrefix: "Update" });
    return {
        ...hook,
        lists: {
            standards: createListActions(hook, (d) => d.standards),
            rangeGroups: createListActions(hook, (d) => d.rangeGroups),
            storyParagraphs: createListActions(hook, (d) => d.story.paragraphs),
        },
    };
}
