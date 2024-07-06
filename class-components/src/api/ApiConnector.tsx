export interface heroData {
  name: string;
  description: string;
  thumbnail?: {
    path: string;
    extension: string;
  };
  img?: string;
}

class ApiConnector {
  _apiKey = 'apikey=ede7c87b314e4253d2fa3cc4c3e4b962';

  getData = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Cannot fetch ${url}. Status: ${res.status}`);
    }
    return await res.json();
  };

  transformHeroData = (hero: heroData) => {
    return {
      name: hero.name,
      description: hero.description ? hero.description : 'Description is not found',
      img: `${hero.thumbnail?.path}.${hero.thumbnail?.extension}`,
    };
  };

  getAllHeroes = async () => {
    const res = await this.getData(
      `https://gateway.marvel.com:443/v1/public/characters?limit=12&offset=80&${this._apiKey}`
    );
    return res.data.results.map(this.transformHeroData);
  };
}

export default ApiConnector;
