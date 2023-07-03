import {IRes} from "../types";
import {ICategoryData, IQuestData} from "../intarfaces";
import {axiosService} from "./axios.service";
import {urls} from "../constants";


const questService = {
    getAll: (): IRes<IQuestData> => axiosService.get(urls.question),
    filter: (category: number): IRes<IQuestData> => axiosService.get(`${urls.question}&category=${category}`)
};

const categoryService = {
    getAll: (): IRes<ICategoryData> => axiosService.get(urls.category)
}


export {questService, categoryService}