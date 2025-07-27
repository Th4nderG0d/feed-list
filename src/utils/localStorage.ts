import AsyncStorage from '@react-native-async-storage/async-storage';

export const LocalStorage = {
  async setItemWithTTL(key: string, value: any, ttlHours: number) {
    try {
      const data = {
        value,
        timestamp: Date.now(),
        ttl: ttlHours * 3600 * 1000,
      };
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.log('Error saving data', e);
    }
  },

  async getItemWithTTL<T>(key: string): Promise<T | null> {
    try {
      const raw = await AsyncStorage.getItem(key);
      if (!raw) return null;

      const { value, timestamp, ttl } = JSON.parse(raw);
      if (Date.now() - timestamp > ttl) {
        await AsyncStorage.removeItem(key);
        return null;
      }
      return value as T;
    } catch (e) {
      console.log('Error reading cache', e);
      return null;
    }
  },
};
