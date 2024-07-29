import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiConstants } from './apiConstants';
import { HeroesListProps } from '../components/heroesList/HeroesList';
import { transformHeroData } from '../helpers/getTransformedData';

export type ApiResponse = {
  data: {
    results: heroData[];
    total: number;
  };
};

export type heroData = {
  id: number;
  name: string;
  description: string;
  thumbnail?: {
    path: string;
    extension: string;
  };
  img?: string;
};

type HeroInfo = {
  heroInfo: heroData;
};

export const marvelApi = createApi({
  reducerPath: 'marvelApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiConstants._apiBase }),
  endpoints: (builder) => ({
    getAllHeroes: builder.query({
      query: (query = apiConstants._baseQuery) => `${query}&${apiConstants._apiKey}`,
      transformResponse: (response: ApiResponse): HeroesListProps => ({
        heroesList: response.data.results,
        totalHeroes: response.data.total,
      }),
    }),
    getSearchHeroes: builder.query({
      query: ({ searchValue, query = apiConstants._baseQuery }) =>
        searchValue === ''
          ? `?${query}&${apiConstants._apiKey}`
          : `?nameStartsWith=${searchValue}&${query}&${apiConstants._apiKey}`,
      transformResponse: (response: ApiResponse): HeroesListProps => ({
        heroesList: response.data.results,
        totalHeroes: response.data.total,
      }),
    }),
    getHeroInfo: builder.query({
      query: (id) => `${id}?${apiConstants._apiKey}`,
      transformResponse: (response: ApiResponse): HeroInfo => ({
        heroInfo: transformHeroData(response.data.results[0]),
      }),
    }),
  }),
});

export const { useGetHeroInfoQuery, useGetAllHeroesQuery, useGetSearchHeroesQuery } = marvelApi;
