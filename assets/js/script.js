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

const spans = async (pokemons,index,li,ulPokemons) => {
    const divNameTypeAttack = document.createElement('div');
    const divTypeAndAttack = document.createElement('div');
    divTypeAndAttack.className = 'divTypeAndAttack'
    divNameTypeAttack.className = 'nameTypeAttack';
    const name = document.createElement('span');
    const pokeType = document.createElement('span');
    const attackType = document.createElement('span');
    name.innerText = `${pokemons[index].name}`;
    pokeType.innerText = `${await typeDetails(index)}`;
    li.className = `${await typeDetails(index)}`;
    attackType.innerText =  `${await attackDetails(index)}`;
    pokeType.className = 'pokeType';
    attackType.className = 'pokeAttack'
    pokeType.classList.add(`${await typeDetails(index)}`)
    attackType.classList.add(`${await attackDetails(index)}`)
    name.className = 'pokeName'
    divNameTypeAttack.appendChild(name);
    divTypeAndAttack.appendChild(pokeType)
    divTypeAndAttack.appendChild(attackType)
    divNameTypeAttack.appendChild(divTypeAndAttack)
    li.appendChild(divNameTypeAttack);
    ulPokemons.appendChild(li);
}

const numberAndImage = (index,li,img,ulPokemons) => {
    const divNumberAndPoke = document.createElement('div');
    const divNumber = document.createElement('div')
    const divImage = document.createElement('div');
    divNumberAndPoke.className = 'numberAndImage';
    img.className = 'pokeImg';
    const number = document.createElement('span');

    if(index < 9) {
        number.innerText = `#00${index+1}`;
    } else if(index >= 9 && index < 99) {
        number.innerText = `#0${index+1}`;
    } else {
        number.innerText = `#${index+1}`;
    }
    
    divNumber.appendChild(number);
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg`;
    
    divNumberAndPoke.appendChild(divNumber);
    divImage.append(img)
    divNumberAndPoke.appendChild(img);
    li.appendChild(divNumberAndPoke);
    ulPokemons.appendChild(li);
}

const ulPokemon = async () => {    
    fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150')
    .then((response) => response.json())
    .then((response) => response.results)
    .then(async (pokemons)  => {
        for (let index = 0; index < pokemons.length; index++) {            
            const li = document.createElement('li');
            const img = document.createElement('img'); 
            const img2 = document.createElement('img');
            liStyle(li);
            await spans(pokemons,index,li,ulPokemons)
            numberAndImage(index,li,img,ulPokemons);    
            openModal(li,img2,index,pokemons)  
        }   
    });
}

//---------------------------------Modal------------------------------------

const openModal =  (li,img2,index,pokemons) => {
    const modal = document.createElement('div');
    const modalWindow = document.createElement('div');
    const buttonClose = document.createElement('button');
    const divButton = document.createElement('div');
    modal.className = 'modal'
    modalWindow.className = 'modalWindow';
    buttonClose.className = 'buttonClose'
    divButton.className = 'divButton'
    buttonClose.innerText = 'X';
    li.addEventListener('click', async () => {
        modal.style.display = 'flex';     
        openModal(li,modal);
        closeModal(buttonClose,modal)
        divButton.appendChild(buttonClose);
        modalWindow.appendChild(divButton);
        contentModal(img2,index,modalWindow,pokemons)
        modal.appendChild(modalWindow);
        divUl.appendChild(modal)
    })
}

const contentModal = async (img2,index,modalWindow,pokemons) => {
    const divContent = document.createElement('div')   
    const divAbout = document.createElement('div');
    const divSpanAbout = document.createElement('div')
    divSpanAbout.className = 'divSpanAbout'
    const spanAbout = document.createElement('span')
    divAbout.className = 'divAbout'
    const divContentAbout = document.createElement('div');
    divContentAbout.className = 'divContentAbout';
    const name = document.createElement('span')
    const number = document.createElement('span');
    number.className = 'numberModal'
    const divImage = document.createElement('div');
    const divNameAndNumber = document.createElement('div');
    divNameAndNumber.className = 'nameAndNumber';
    const divTypeAndAttack = document.createElement('div');
    divTypeAndAttack.className = 'divTypeAndAttack2';
    const type = document.createElement('span');
    const attack = document.createElement('span');
    attack.className = 'attack'
    type.className = 'type'
    type.classList.add(`${await typeDetails(index)}`);
    attack.classList.add(`${await attackDetails(index)}`);
    if(index < 9) {
        number.innerText = `#00${index+1}`;
    } else if(index >= 9 && index < 99) {
        number.innerText = `#0${index+1}`;
    } else {
        number.innerText = `#${index+1}`;
    }

    number.style.marginRight = '10px'
    name.style.color = '#fff'
    name.innerText = `${pokemons[index].name}`;
    name.style.marginLeft = '10px'
    type.innerText = `${await typeDetails(index)}`;
    type.style.marginLeft = '10px'
    attack.innerText = `${await attackDetails(index)}`;
    attack.style.marginLeft = '10px'
    divContent.className = `${await typeDetails(index)}`;
    divContent.classList.add('divContent')

    spanAbout.innerText = 'about'
    spanAbout.style.marginLeft = '10px'

    divNameAndNumber.appendChild(name)
    divNameAndNumber.appendChild(number);
    divTypeAndAttack.appendChild(type);
    divTypeAndAttack.appendChild(attack);
        
    divImage.className = 'divImage'
    img2.className = 'imageModal';
    img2.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg`;
    divImage.appendChild(img2);
    divContent.appendChild(divNameAndNumber);
    divContent.appendChild(divTypeAndAttack);
    divContent.appendChild(divImage);
    divSpanAbout.appendChild(spanAbout)
    divAbout.appendChild(divSpanAbout);
    spansContentAbout(divContentAbout,index);
    divAbout.appendChild(divContentAbout)
    modalWindow.appendChild(divContent)
    modalWindow.appendChild(divAbout);    
}

const heightAbout = async (index) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${index+1}`)
    .then((response) => response.json())
    .then((response) => response.height)
    .then((response) => {
        if(response < 10) {
            return `${response * 10}cm`
        } else {
            return `${(response  * 0.1).toFixed(2)}m`
        }
    })
}

const weightAbout = async (index) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${index+1}`)
    .then((response) => response.json())
    .then((response) => response.weight)
    .then((response) => `${(response * 0.1).toFixed(1)}kg`)
}

const abilitiesAbout = async (index) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${index+1}`)
    .then((response) => response.json())
    .then((response) => response.abilities)
    .then((response) => response.map(res => res.ability.name))
}


divUl.appendChild(ulPokemons)
section.appendChild(divUl)
mainn.appendChild(section)
document.body.appendChild(mainn)