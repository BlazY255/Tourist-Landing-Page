let imgNames: string[] = [
    'airplane',
    'bridge',
    'beach',
    'ship',
    'cave',
    'people'
];
let imgTags = {
    smallTag: '_s',
    mediumTag: '_m',
}
let headers: string[] = [
    'flight booking',
    'hotel & resort booking',
    'family trip planner',
    'cruise tour',
    'fire camp',
    'corporate holidays'
];
let descriptions: string[] = [
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem.',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem.',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem.',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem.',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem.',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem.',
];

let serviceBox = document.getElementById('service_Flexbox');

let serviceDisplay = document.getElementsByClassName('service_Display')[0];
let serviceHeader = document.getElementById('service_Header');
let serviceImage = document.getElementById('service_Image_Container');
let serviceParagraph = document.getElementById('service_Paragraph');

let cards: card[] = [];

type card = {
    imageid: string;
    header: string;
    description: string;
}

let CreateCards = () => {
    for (let name of imgNames) {
        let imgIndex = imgNames.indexOf(name);

        let newCard: card = {
            imageid: `../Assets/UsedImages/Section_One/${name}`,
            header: headers[imgIndex],
            description: descriptions[imgIndex]
        }

        cards.push(newCard);
    }
}

let OpenDisplay = (open: boolean, id: number) => {
    if (open) {
        serviceDisplay.classList.add('open');

        if (serviceImage != null) serviceImage.style.backgroundImage = `url(${cards[id].imageid}${imgTags.mediumTag}.png)`;
        if (serviceHeader != null) serviceHeader.textContent = cards[id].header;
        if (serviceParagraph != null) serviceParagraph.textContent = cards[id].description;
    }
    else {
        serviceDisplay.classList.remove('open');
    }
}

let GenerateCards = () => {
    CreateCards();

    for (let card of cards) {
        if (serviceBox != null) {
            serviceBox.innerHTML +=
                `
                <div class="service_container" onclick="OpenDisplay(true,${cards.indexOf(card)})">
                    <div>
                        <img src="${card.imageid + `${imgTags.smallTag}.png`}" draggable="false" alt="Banner" class=""> 
                    </div>
                    <h6 class="">${card.header}</h6> 
                    <p class="">${card.description}</p>
                </div>
            `
        }
    }
}
GenerateCards();

