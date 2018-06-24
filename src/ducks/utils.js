import { OrderedMap, Map } from 'immutable';

export function generateId() {
    return Date.now();
}

export function fbDataToEntities(data, recordModel = Map) {
    return (new OrderedMap(data)).mapEntries(([uid, values]) =>
        ([uid, (new recordModel(values)).set('uid', uid)])
    );
}
