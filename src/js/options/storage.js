import { getFromStorage, saveToStorage } from '../utils/storage';

const KEY = 'options';

export const getStore = async () => await getFromStorage(KEY);

export const saveToStore = async (data) => await saveToStorage(KEY, data);
