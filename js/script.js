const countriesList = document.getElementById('countries-list');

const getFlags = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,car,population,capital');
    if (!response.ok) {
      throw new Error('Ha surgido un error', response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error al obtener los datos', error);
    throw error
  }
};
getFlags().then(data => {
  console.log(data); // Aquí ves TODO
});


const createCountryCard = (country) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('country-card');

  const img = document.createElement('img');
  img.alt = `${country.name?.common} bandera`;
  img.src = country.flags?.png || country.flags?.svg;
  img.classList.add('flag-img');

  const name = document.createElement('p');
  name.classList.add('country-name');
  name.textContent = country.name?.common || 'Sin nombre';

  wrapper.appendChild(img);
  wrapper.appendChild(name);

  return wrapper;
};

getFlags().then((data) => {
  
    const dataAlpha = data.sort((a, b) =>
    (a.name.common).localeCompare(b.name.common)
  );

  data.forEach((country) => {
    const card = createCountryCard(country);
    countriesList.appendChild(card);
  });
});

