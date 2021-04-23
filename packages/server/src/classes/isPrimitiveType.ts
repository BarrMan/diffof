const primitiveTypes = ['string', 'number']

export const isPrimitiveType = (value: unknown): boolean => {
    return primitiveTypes.indexOf(typeof value) !== -1;
};