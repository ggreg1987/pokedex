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


section.appendChild(divUl)
mainn.appendChild(section)
document.body.appendChild(mainn)