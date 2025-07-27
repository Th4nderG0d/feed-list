import { makeAutoObservable, runInAction, observable } from 'mobx';
import { Category, Movie } from './types';
import { MovieApi } from '../../services/movie/MovieApi';
import { MovieCache } from '../../services/movie/MovieCache';

class MovieStore {
  categories: Category[] = [];
  totalCategories = 0;
  isLoadingCategories = true;
  isOfflineFallback = false;

  moviesByCategoryId = observable.map<number, Movie[]>(new Map());
  totalMoviesByCategoryId = observable.map<number, number>(new Map());
  isLoadingMovies = observable.map<number, boolean>(new Map());

  constructor() {
    makeAutoObservable(this);
  }

  async loadCache() {
    const { cachedCategories, cachedMovies } = await MovieCache.load();
    if (cachedCategories.length) {
      runInAction(() => {
        this.categories = Array.from(
          new Map(cachedCategories.map(c => [c.id, c])).values(),
        );
        Object.entries(cachedMovies).forEach(([id, movies]) =>
          this.moviesByCategoryId.set(Number(id), movies),
        );
        this.isOfflineFallback = true;
      });
    }
  }

  async saveCache() {
    await MovieCache.save(this.categories, this.moviesByCategoryId);
  }

  async initialLoadCategories() {
    if (this.categories.length) return;
    try {
      const { data, count, error } = await MovieApi.fetchCategories();
      if (error) throw error;

      runInAction(() => {
        this.categories = data || [];
        this.totalCategories = count ?? data?.length ?? 0;
        this.isOfflineFallback = false;
        this.isLoadingCategories = false;
      });

      if (data?.length) await this.saveCache();
    } catch {
      await this.loadCache();
      runInAction(() => (this.isLoadingCategories = false));
    }
  }

  async initialLoadMovies(categoryId: number) {
    if (this.moviesByCategoryId.get(categoryId)?.length) return;
    this.isLoadingMovies.set(categoryId, true);

    try {
      const { data, count, error } = await MovieApi.fetchMovies(categoryId);
      if (error) throw error;

      runInAction(() => {
        this.moviesByCategoryId.set(categoryId, data || []);
        this.totalMoviesByCategoryId.set(
          categoryId,
          count ?? data?.length ?? 0,
        );
        this.isOfflineFallback = false;
        this.isLoadingMovies.set(categoryId, false);
      });

      if (data?.length) await this.saveCache();
    } catch {
      await this.loadCache();
      runInAction(() => this.isLoadingMovies.set(categoryId, false));
    }
  }

  fetchMoreCategories = async () => {
    if (this.isLoadingCategories || !this.canFetchMoreCategories()) return;
    try {
      const start = this.categories.length;
      const end = start + 1;
      const { data, count, error } = await MovieApi.fetchCategories(start, end);
      if (error) throw error;

      runInAction(() => {
        const existingIds = new Set(this.categories.map(c => c.id));
        const newCats = (data || []).filter(c => !existingIds.has(c.id));
        this.categories.push(...newCats);
        this.totalCategories = count ?? this.totalCategories;
        this.isOfflineFallback = false;
        this.isLoadingCategories = false;
      });
    } catch {
      runInAction(() => (this.isLoadingCategories = false));
    }
  };

  fetchMoreMoviesForCategory = async (categoryId: number) => {
    if (
      this.isLoadingMovies.get(categoryId) ||
      !this.canFetchMoreMovies(categoryId)
    )
      return;
    const existing = this.moviesByCategoryId.get(categoryId) || [];
    const start = existing.length;
    const end = start + 2;
    this.isLoadingMovies.set(categoryId, true);

    try {
      const { data, count, error } = await MovieApi.fetchMovies(
        categoryId,
        start,
        end,
      );
      if (error) throw error;

      runInAction(() => {
        const existingIds = new Set(existing.map(m => m.id));
        const newMovies = (data || []).filter(m => !existingIds.has(m.id));
        this.moviesByCategoryId.set(categoryId, [...existing, ...newMovies]);
        this.totalMoviesByCategoryId.set(categoryId, count ?? 0);
        this.isOfflineFallback = false;
        this.isLoadingMovies.set(categoryId, false);
      });
    } catch {
      runInAction(() => this.isLoadingMovies.set(categoryId, false));
    }
  };

  canFetchMoreCategories = () => this.categories.length < this.totalCategories;

  canFetchMoreMovies = (categoryId: number) => {
    const existing = this.moviesByCategoryId.get(categoryId)?.length || 0;
    const total = this.totalMoviesByCategoryId.get(categoryId) || 0;
    return existing < total;
  };
}

export const movieStore = new MovieStore();
