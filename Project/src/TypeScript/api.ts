const superHeroApiLink = 'https://superheroapi.com/api.php';
const token = '1815558128811173';
let id;

const displayImage = document.getElementById('displayImage');
const displayName = document.getElementById('name');
const displayUniverse = document.getElementById('universe');


function PullRandom() {
    id = GetRndInteger(0, 731)

    fetch(`${superHeroApiLink}/${token}/${id}`)
        .then(respnose => respnose.json())
        .then(json => DisplayHero(json))
}

function DisplayHero(heroInfo: any) {

    if (displayName != null) displayName.textContent = heroInfo.name;

    if (displayUniverse != null) displayUniverse.textContent = '';

    for (let info in heroInfo.biography) {
        if (displayUniverse != null) displayUniverse.innerHTML += `<br> ${info}: ${heroInfo.biography[info]}`;
        console.log(info);
    }

    console.log(heroInfo.image.url);
    if (displayImage != null) displayImage.style.backgroundImage = `url('${heroInfo.image.url}')`;
}

function GetRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}