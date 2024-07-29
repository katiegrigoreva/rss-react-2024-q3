import { heroData } from '../api/apiSlice';
import { HeroesListProps } from '../components/heroesList/HeroesList';

export const transformHeroData = (hero: heroData) => {
  return {
    id: hero.id,
    name: hero.name,
    description: hero.description ? hero.description : 'Description is not found',
    img: `${hero.thumbnail?.path}.${hero.thumbnail?.extension}`,
  };
};

export const getTransformedData = (heroesListData: HeroesListProps | undefined) => {
  const maxTotalHeroes: number = 100;

  return {
    heroesList: heroesListData?.heroesList ? heroesListData.heroesList.map(transformHeroData) : [],
    totalHeroes:
      heroesListData?.totalHeroes && heroesListData?.totalHeroes < maxTotalHeroes
        ? heroesListData?.totalHeroes
        : maxTotalHeroes,
  };
};
