import { load } from '@tauri-apps/plugin-store';

export async function addToStore(key: string, value: any) {

    const store = await load('store.json', { autoSave: false });
    await store.set(key, { value });
    await store.save();
}
    
export async function getFromStore(key: string) {
    const store = await load('store.json', { autoSave: false });

    const val = await store.get<{ value: number }>(key); 
    
    await store.save();
    return val;    
}  