const filters = document.querySelectorAll('select');
const coverallsList = document.querySelector('#coveralls-list');

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    populateFilterOptions(data);
    populateCoveralls(data);
    filters.forEach(filter => {
      filter.addEventListener('change', () => {
        const filteredData = filterData(data);
        populateCoveralls(filteredData);
      });
    });
  });

  function populateFilterOptions(data) {
    const colors = new Set();
    const schools = new Set();
    const cities = new Set();
  
    data.forEach(coverall => {
      colors.add(coverall.maincolor);
      schools.add(coverall.school);
      cities.add(coverall.city);
    });
  
    const citySelect = document.querySelector('#city');
    cities.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  
    citySelect.addEventListener('change', (event) => {
      const selectedCity = event.target.value;
      const colorSelect = document.querySelector('#color');
      colorSelect.innerHTML = '<option value="">Kaikki</option>'; // clear previous options
  
      if (selectedCity === '') { // if 'Kaikki' is selected, show all colors
        colors.forEach(color => {
          const option = document.createElement('option');
          option.value = color;
          option.textContent = color;
          colorSelect.appendChild(option);
        });
      } else { // filter colors based on the selected city
        const filteredColors = new Set();
        data.forEach(coverall => {
          if (coverall.city === selectedCity) {
            filteredColors.add(coverall.maincolor);
          }
        });
        filteredColors.forEach(color => {
          const option = document.createElement('option');
          option.value = color;
          option.textContent = color;
          colorSelect.appendChild(option);
        });
      }
    });
  }

// filter-listan värittäminen



  function populateCoveralls(data) {
    coverallsList.innerHTML = '';
    data.forEach(coverall => {
      const coverallItem = document.createElement('div');
      coverallItem.classList.add('coverall-item');
  
      const colorBox = document.createElement('div');
      colorBox.classList.add('coverall-item-color');
      colorBox.style.backgroundColor = coverall.maincoloreng;
      const colorBoxInner = document.createElement('div');
      colorBoxInner.classList.add('coverall-item-color-inner');
      colorBox.appendChild(colorBoxInner);
  
      const contentBox = document.createElement('div');
      contentBox.classList.add('coverall-item-content');
      contentBox.innerHTML = `
        <h4>${coverall.color}:</h4>
        <h5>${coverall.studyProgram}, ${coverall.org}</h5>
        <p>${coverall.school} - ${coverall.city}</p>
      `;
  
      coverallItem.appendChild(colorBox);
      coverallItem.appendChild(contentBox);
      coverallsList.appendChild(coverallItem);
    });
  }
  
  


function filterData(data) {
  const maincolorFilter = document.querySelector('#color').value;
  const cityFilter = document.querySelector('#city').value;
  console.log(maincolorFilter, cityFilter);

  return data.filter(coverall => {
    if (maincolorFilter && coverall.maincolor !== maincolorFilter) return false;
    if (cityFilter && coverall.city !== cityFilter) return false;
    return true;
  });
}


