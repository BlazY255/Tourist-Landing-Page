
////////////////////////////////Variables////////////////////////////////
let CarouselImageNames: string[] = ['4.png', '2.png', '3.png']
let CarouselTexts: string[] = ['', '', '']
let carouselGradientClasses: string[] = ['one', 'two', 'three']

let CarouselImageList: CarouselImage[] = [];



let carouselContainershtml = document.getElementsByClassName('carousel_Container') as HTMLCollectionOf<HTMLElement>;

let carouselContainers: Element[] = Array.from(document.getElementsByClassName('carousel_Container'))

let carouselContent = document.getElementsByClassName('carousel_Content');
let carousel_Overlay = document.getElementsByClassName('carousel_Overlay')[0];

let carouselDelayed: boolean = false;
let GradientId = 1;

////////////////////////////////Types////////////////////////////////

type CarouselImage = {
    imgUrl: string;
    imgText: string;
    imgGradientClassName: string;
}

////////////////////////////////FUNCTIONS////////////////////////////////
const SetImagesToCarousel = () => {
    for (let container of carouselContainershtml) {
        let indexOfContainer = Array.from(carouselContainershtml).indexOf(container);

        CarouselImageList.push(
            {
                imgUrl: `Url(../Assets/UsedImages/Carousel/${CarouselImageNames[indexOfContainer]})`,
                imgText: CarouselTexts[indexOfContainer],
                imgGradientClassName: carouselGradientClasses[indexOfContainer]
            }
        );
        container.style.backgroundImage = CarouselImageList[indexOfContainer].imgUrl;
    }
}

const LaunchCarouselMovement = (lift: boolean, move: boolean, right: boolean): void => {

    if (lift) {
        if (carouselDelayed) return;

        carouselDelayed = true;

        for (let content of carouselContent) {
            content.classList.contains('bottom') ? content.classList.add('Down') : content.classList.add('Up');
        }
        carousel_Overlay.classList.add('Fade');

        for (let classTag of CarouselImageList) {
            carousel_Overlay.classList.remove(classTag.imgGradientClassName);
        }
        GradientId != 2 ? GradientId++ : GradientId = 0;

        carousel_Overlay.classList.add(CarouselImageList[GradientId].imgGradientClassName);

        if (move) setTimeout(function () { MoveCarousel(right) }, 510);
    }
    else {
        for (let content of carouselContent) {
            content.classList.contains('bottom') ? content.classList.remove('Down') : content.classList.remove('Up');
        }
        carousel_Overlay.classList.remove('Fade');

        setTimeout(function () { carouselDelayed = false; }, 760);
    }
}

const MoveCarousel = (right: boolean): void => {
    LaunchCarouselMovement(false, false, false);

    let firstContainerName = carouselContainers[0].className;
    let lastContainerName = carouselContainers[carouselContainers.length - 1].className;

    if (right) {

        for (let container of carouselContainers) {

            let nextId: number = carouselContainers.indexOf(container) + 1;

            if (nextId != carouselContainers.length) {
                container.className = carouselContainers[nextId].className;
            }
            else {
                container.className = firstContainerName;
            }

            !container.classList.contains('one') ? container.classList.add('flow') : container.classList.remove('flow');
        }

    }
    else {

        for (let i = carouselContainers.length - 1; i >= 0; i--) {
            let container = carouselContainers[i];


            if (i != 0) {
                container.className = carouselContainers[i - 1].className;
            }
            else {
                container.className = lastContainerName;
            }
            !container.classList.contains('three') ? container.classList.add('flow') : container.classList.remove('flow');

        }
    }

}



const OpenBar = () => {
    const bar = document.getElementsByClassName('nav_links')[0];
    bar.classList.contains('open') ? bar.classList.remove('open') : bar.classList.add('open');
}


////////////////////////////////Function Calls////////////////////////////////
LaunchCarouselMovement(false, false, false);
SetImagesToCarousel();