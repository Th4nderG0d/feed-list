import { Movie } from '../../stores/movie/types';

export type sectionType = {
  title: string;
  data: {}[];
  movies: Movie[] | [];
  categoryId: number;
};
