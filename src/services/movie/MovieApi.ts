import { supabase } from '../../services/supabase';

export const MovieApi = {
  async fetchCategories(start = 0, end = 3) {
    return supabase
      .from('categories')
      .select('*', { count: 'exact' })
      .order('id', { ascending: true })
      .range(start, end);
  },

  async fetchMovies(categoryId: number, start = 0, end = 4) {
    return supabase
      .from('movies')
      .select('*', { count: 'exact' })
      .eq('category_id', categoryId)
      .order('id', { ascending: true })
      .range(start, end);
  },
};
