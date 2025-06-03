export function queue() {
    const queue = [];
    let id = 0;

    return {
        enqueue(value, priority) {
            queue.push({
                id: id++,
                value,
                priority,
                timestamp: Date.now(),
            });
        },

        peek(mode = "highest") {
            if (queue.length === 0) return null;

            const sorted = [...queue];
            switch (mode) {
                case "highest":
                    return sorted.sort((a, b) => a.priority - b.priority)[0];
                case "lowest":
                    return sorted.sort((a, b) => b.priority - a.priority)[0];
                case "oldest":
                    return sorted.sort((a, b) => a.id - b.id)[0];
                case "newest":
                    return sorted.sort((a, b) => b.id - a.id)[0];
                default:
                    return null;
            }
        },

        clear() {
            queue.length = 0;
            id = 0;
        },
    };
}
