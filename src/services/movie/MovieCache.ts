import { Category, Movie } from '../../stores/movie/types';
import { LocalStorage } from '../../utils/localStorage';

const CACHE_KEY_CATEGORIES = 'cached_categories';
const CACHE_KEY_MOVIES = 'cached_movies';
const CACHE_TTL_HOURS = 6;

export const MovieCache = {
  async load() {
    const cachedCategories = await LocalStorage.getItemWithTTL<Category[]>(
      CACHE_KEY_CATEGORIES,
    );
    const cachedMovies = await LocalStorage.getItemWithTTL<
      Record<number, Movie[]>
    >(CACHE_KEY_MOVIES);
    return {
      cachedCategories: cachedCategories || [],
      cachedMovies: cachedMovies || {},
    };
  },

  async save(categories: Category[], moviesByCategoryId: Map<number, Movie[]>) {
    const categoriesToCache = categories.slice(0, 4);
    const moviesToCache: Record<number, Movie[]> = {};
    categoriesToCache.forEach(cat => {
      moviesToCache[cat.id] = (moviesByCategoryId.get(cat.id) || []).slice(
        0,
        5,
      );
    });

    await LocalStorage.setItemWithTTL(
      CACHE_KEY_CATEGORIES,
      categoriesToCache,
      CACHE_TTL_HOURS,
    );
    await LocalStorage.setItemWithTTL(
      CACHE_KEY_MOVIES,
      moviesToCache,
      CACHE_TTL_HOURS,
    );
  },
};
