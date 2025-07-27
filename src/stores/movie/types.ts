export type Category = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  description: string;
  category_id: number;
};
