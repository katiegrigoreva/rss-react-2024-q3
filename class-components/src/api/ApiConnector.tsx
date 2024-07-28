import { apiConstants } from './apiConstants';

export interface heroData {
  id: number;
  name: string;
  description: string;
  thumbnail?: {
    path: string;
    extension: string;
  };
  img?: string;
}

class ApiConnector {
  getData = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Cannot fetch ${url}. Status: ${res.status}`);
    }
    return await res.json();
  };

  transformHeroData = (hero: heroData) => {
    return {
      id: hero.id,
      name: hero.name,
      description: hero.description ? hero.description : 'Description is not found',
      img: `${hero.thumbnail?.path}.${hero.thumbnail?.extension}`,
    };
  };

  getAllHeroes = async (query: string) => {
    const res = await this.getData(`${apiConstants._apiBase}?${query}&${apiConstants._apiKey}`);
    return {
      heroesList: res.data.results.map(this.transformHeroData),
      totalHeroes: res.data.total,
    };
  };

  getHeroInfo = async (id: string) => {
    const res = await this.getData(`${apiConstants._apiBase}/${id}?${apiConstants._apiKey}`);
    return this.transformHeroData(res.data.results[0]);
  };

  getSearchData = async (searchValue: string, query: string) => {
    if (searchValue.length === 0) {
      return this.getAllHeroes(apiConstants._baseQuery);
    }

    const res = await this.getData(
      `${apiConstants._apiBase}?nameStartsWith=${searchValue}&${query}&${apiConstants._apiKey}`
    );
    return {
      heroesList: res.data.results.map(this.transformHeroData),
      totalHeroes: res.data.total,
    };
  };
}

export default ApiConnector;
