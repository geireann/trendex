import { NewsCategory, NewsCountry } from "./globalEnums";
// const newsApiKey: string = '81b033a8db1d43e5abbd205e9160480e';
const newsApiKey: string = '18fffe68b3e342a683e8c9f2f6da113c';


export const getNews = async (everything: boolean, query?: string, newsCategory?: NewsCategory, newsCountry?: NewsCountry) => {
    console.log(query, newsCategory, newsCountry)
    var url = `https://newsapi.org/v2/${everything ? 'everything' : 'top-headlines'}?` +
            `${query !== undefined ? `q=${query}&` : ``}` +
            `${newsCategory !== undefined ? `category=${newsCategory}&` : ``}` +
            `${newsCountry !== undefined ? `country=${newsCountry}&` : ``}` +
            `apiKey=${newsApiKey}`;

    console.log(url);

    var req = new Request(url);

    const response = await fetch(req)

    if (!response.ok) {
        throw new Error('Data coud not be fetched!')
    } else {
        return response.json()
    }
  }

export const getCurrencyVal = (val: number): string => {
    return "$" + val.toFixed(2);
}