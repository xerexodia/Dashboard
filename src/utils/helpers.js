import { toInteger } from 'lodash';

export const trans = (arg) => {
    return Boolean(arg).toString();
};
export const integer = (arg) => {
    return toInteger(arg);
};
