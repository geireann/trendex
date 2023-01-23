import { IDataPoint } from "./components";
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

export const getFlagEmoji = (countryCode: string) => {
    if (countryCode === "All") return "All"
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  export const createDummyHistoricalData = (currentVal: number): IDataPoint[] => {
    const currentDataPoint:IDataPoint = {
        date: new Date(),
        numVal: currentVal
    }
    let data: IDataPoint[] = [currentDataPoint];
    let prevDataPoint: IDataPoint = currentDataPoint;
    // Math.round(Math.random())
    if (prevDataPoint.date && prevDataPoint.numVal) {
        const dateMs = prevDataPoint.date.getTime();
        let prevVal: number = prevDataPoint.numVal;
        // create a new data point for each day in the last year
        for (let i = 0; i < 365; i++) {
            const timeSinceMs = i * 86400000;
            const currMs = dateMs - timeSinceMs;
            let currDate: Date = new Date();
            currDate.setTime(currMs);
            let currVal = prevVal + ((Math.random() * 2) - 1);
            prevVal = currVal;
            data.push({
                date: currDate,
                numVal: currVal
            })
        }
    }
    return data;
}