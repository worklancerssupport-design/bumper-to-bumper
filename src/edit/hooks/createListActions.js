/**
 * List operations on an editable array inside a useDataFile hook.
 * Works for top-level arrays (getList = (d) => d) and nested arrays
 * (getList = (d) => d.items). All changes go through hook.updateEditData,
 * so hasChanges / save / discard keep working.
 *
 * @param {ReturnType<typeof import("./useDataFile.js").useDataFile>} hook
 * @param {(draft: any) => any[]} getList
 */
export function createListActions(hook, getList) {
    const edit = (fn) => hook.updateEditData((draft) => fn(getList(draft)));

    return {
        add: (item) => edit((list) => { list.push(item); }),

        insert: (index, item) => edit((list) => { list.splice(index, 0, item); }),

        update: (index, patch) => edit((list) => {
            if (!list[index]) return;
            if (typeof patch === "object" && patch !== null) Object.assign(list[index], patch);
            else list[index] = patch;
        }),

        remove: (index) => edit((list) => { list.splice(index, 1); }),

        move: (from, to) => edit((list) => {
            if (from === to || from < 0 || to < 0 || from >= list.length || to >= list.length) return;
            const [item] = list.splice(from, 1);
            list.splice(to, 0, item);
        }),
    };
}
