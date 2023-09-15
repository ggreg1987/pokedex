const mainn = document.createElement('main');
const section = document.createElement('section');
const divUl = document.createElement('div');
const ulPokemons = document.createElement('ul');

const ulStyle = () => {
    const ulStyle = ulPokemons.style;
    ulPokemons.className = 'pokemons';
    ulStyle.display = 'grid';
    ulStyle.listStyle = 'none';
    ulStyle.gridTemplateColumns = '1fr 1fr';
    ulStyle.padding = '0';
    ulStyle.margin = '0';
}

const bodyStyle = () => {
    const body = document.getElementsByTagName('body')[0];
    body.style.boxSizing = 'border-box';
    body.style.backgroundColor = 'black';
}

const liStyle = (li) => {
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.color = 'white';
    li.style.margin = '5px 4px';
}

const h2 = () => {
    const h2 = document.createElement('h2');
    h2.innerText = 'Pokedex';
    h2.style.color = 'white';
    divUl.appendChild(h2);
}

const typeDetails = async (index) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${index+1}`)
    .then((response) => response.json())
    .then((response) => response.types[0])
    .then((response) => response.type.name)
}

const attackDetails = async (index) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${index+1}`)
    .then((response) => response.json())
    .then((response) => {
        if(index < 3 || response.types.length == 2) {
           return  response.types[1].type.name;
        } else {
           return response.types[0].type.name;
        }
    })
}



section.appendChild(divUl)
mainn.appendChild(section)
document.body.appendChild(mainn)