import axios from 'axios';

const API_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_8Wl1NUYFJhvYgeZls4YXPXSn1CRGnyvhRR4L69kQeeLTgPieF5v9ebYgSulmpN6r';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export const fetchBreeds = async () => {
  const { data } = await axios.get(`${API_URL}breeds`);

  return data;
};

export const fetchCatByBreed = async breedId => {
  const { data } = await axios.get(
    `${API_URL}images/search?breed_ids=${breedId}`
  );
  if (data.length === 0) {
    throw new Error('No cats found for this breed!');
  }

  return data;
};
