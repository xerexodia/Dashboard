import { toInteger } from 'lodash';

export const trans = (arg) => {
    return Boolean(arg).toString();
};
export const integer = (arg) => {
    return toInteger(arg);
};

export const roleChecker = (arg) => {
    switch (arg) {
        case 1:
            return 'admin';

        case 0:
            return 'user';

        default:
            break;
    }
};
