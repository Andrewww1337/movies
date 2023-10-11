import axios from "axios";

export const getFavorite = async () => {
  const movies = JSON.parse(localStorage.getItem("favorite"));
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:5001/favorite`,
      params: { search: movies },
    });
    return response.data.objects;
  } catch (error) {
    console.log(error.message);
  }
};

export const getMovies = async (params) => {
  try {
    const parsedParams = {
      count: 4,
      page: 0,
    };
    const { keyword, catalogues, page } = params;
    if (keyword) {
      parsedParams.keyword = keyword;
    }
    if (catalogues) {
      parsedParams.catalogues = catalogues;
    }
    if (page) {
      parsedParams.page = page;
    }
    const response = await axios({
      method: "get",
      url: `http://localhost:5001/movies`,
      params: parsedParams,
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const addMovies = async (params) => {
  try {
    params.page = 0;
    const response = await axios({
      method: "post",
      url: `http://localhost:5001/movie`,
      params: params,
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const setNewGrade = async (grade, id) => {
  try {
    const response = await axios({
      method: "put",
      url: `http://localhost:5001/movies/${id}`,

      params: { grade },
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteMovie = async (params, page) => {
  try {
    const response = await axios({
      method: "delete",
      url: `http://localhost:5001/delete/${params}`,
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getGenres = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:5001/genres`,
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
