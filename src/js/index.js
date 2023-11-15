import SlimSelect from 'slim-select';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const refs = {
  select: document.querySelector('.js-breed-select'),
  catInfo: document.querySelector('.js-cat-info'),
  loader: document.querySelector('.js-loader'),
};

getBreeds();

async function getBreeds() {
  try {
    refs.loader.classList.remove('isHidden');
    const breeds = await fetchBreeds();

    const data = breeds.map(breed => {
      return {
        text: breed.name,
        value: breed.id,
      };
    });

    new SlimSelect({
      select: '#single',
      data,
      settings: {
        hideSelected: true,
      },
    });

    refs.select.classList.remove('isHidden');
    refs.select.addEventListener('change', onChange);
  } catch (error) {
    console.log('error', error);
    iziToast.show({
      message: 'Oops! Something went wrong! Try reloading the page!',
      color: 'red',
      position: 'topRight',
    });
  } finally {
    refs.loader.classList.add('isHidden');
  }
}

async function onChange(e) {
  const breedId = e.target.value;

  try {
    refs.catInfo.classList.add('isHidden');
    refs.loader.classList.remove('isHidden');
    const data = await fetchCatByBreed(breedId);
    const markup = data
      .map(cat => {
        const { name, description, life_span, temperament } = cat.breeds[0];

        return `
          <div class="block">
          <img src="${cat.url}" alt="${name}" width="300">
          <p><span class="title">Breed:</span> ${name}</p>
          <p><span class="title">Description:</span> ${description}</p>
          <p><span class="title">Life span:</span> ${life_span}</p>
          <p><span class="title">Temperament:</span> ${temperament}</p>
          </div>
          `;
      })
      .join('');

    refs.catInfo.innerHTML = markup;
    refs.catInfo.classList.remove('isHidden');
  } catch (error) {
    console.log('error', error);
    iziToast.show({
      message: 'Oops! Something went wrong! Try reloading the page!',
      color: 'red',
      position: 'topRight',
    });
  } finally {
    refs.loader.classList.add('isHidden');
  }
}
