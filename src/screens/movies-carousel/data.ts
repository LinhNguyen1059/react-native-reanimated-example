import {ImageURISource} from 'react-native';

export interface MoviesProps {
  id: string;
  name: string;
  image: ImageURISource;
  backdrop: ImageURISource;
  rating: number;
  genres: string[];
}

export const movies: MoviesProps[] = [
  {
    id: '0',
    name: '',
    image: null,
    backdrop: null,
    rating: 0,
    genres: [],
  },
  {
    id: '1',
    name: 'Godzilla vs. Kong',
    image: require('./images/godzilla-kong.jpeg'),
    backdrop: require('./images/godzilla-kong-backdrop.jpeg'),
    rating: 2,
    genres: ['Sci-fi', 'Horror', 'Drama'],
  },
  {
    id: '2',
    name: 'No time to Die',
    image: require('./images/nttd.jpeg'),
    backdrop: require('./images/nttd-backdrop.jpeg'),
    rating: 4,
    genres: ['Sci-fi', 'Fantasy', 'Adventure'],
  },
  {
    id: '3',
    name: 'Luca',
    image: require('./images/luca.jpeg'),
    backdrop: require('./images/luca-backdrop.jpeg'),
    rating: 3,
    genres: ['Sci-fi', 'Fantasy', 'Animation'],
  },
  {
    id: '4',
    name: 'Dune "2021"',
    image: require('./images/dune.jpeg'),
    backdrop: require('./images/dune-backdrop.jpeg'),
    rating: 4,
    genres: ['Sci-fi', 'Fantasy', 'Drama'],
  },
  {
    id: '5',
    name: '',
    image: null,
    backdrop: null,
    rating: 0,
    genres: [],
  },
];
