import size from "lodash/size";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isLast = (items: any[], idx?: number): boolean => {
    if (!Array.isArray(items) || !size(items)) {
        return false;
    }

    return (size(items) - 1) === idx;
};

export { isLast };
