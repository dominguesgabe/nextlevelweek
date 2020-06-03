function populateUfs() {
  const ufSelect = document.querySelector("select[name=uf");
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUfs();

function getCities(event) {
  const citySelect = document.querySelector("[name=city]");
  const stateInput = document.querySelector("[name=state]");

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  console.log(event.target.value);

  const ufValue = event.target.value;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = "<option value>Select the city</option>";
  citySelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }
      citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf").addEventListener("change", getCities);
