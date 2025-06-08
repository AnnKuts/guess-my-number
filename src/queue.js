export function queue() {
    const queue = [];
    let highest = 0;
    let lowest = 0;

    return {
        enqueue(value, priority) {
            queue.push({
                value,
                priority,
            });

            if( highest === null || priority < queue[highest].priority) {
                highest = queue.length - 1;
            }
            else if (lowest === null || priority > queue[lowest].priority) {
                lowest = queue.length - 1;
            }
        },

        peek(mode = "highest") {
            if (queue.length === 0) return null;

            const sorted = [...queue];
            switch (mode) {
                case "highest":
                return queue[highest];
                case "lowest":
                    sorted.sort((a, b) => b.priority - a.priority);
                    return queue[lowest];
                case "oldest":
                    return queue[0];
                case "newest":
                    return queue[queue.length - 1];
                default:
                    return null;
            }
        },

        clear() {
            queue.length = 0;
        },
    };
}
