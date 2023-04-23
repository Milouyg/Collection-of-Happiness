class JsonData {
    data;
    url;

    constructor(newUrl) {
        this.url = newUrl;
    }

    async getJsonData() {
        await fetch(this.url)
            .then((response) => {
                return response.json();
            }).then((data) => {
                this.data = data["episodes"];
            });
        return this.data;
    }
}

class Header {
    placeToRenderHeader;

    header;
    headerH1;
    headerFigure;
    headerIcon;

    constructor(placeToRenderHeader) {

        this.placeToRenderHeader = document.getElementsByTagName(placeToRenderHeader)[0];

        this.header = document.createElement("header");
        this.header.classList = "happiness__header";

        this.headerH1 = document.createElement("h1");
        this.headerH1.classList = "happiness__h1";
        this.headerH1.innerText = "Collection of Happiness";

        this.headerFigure = document.createElement("figure");
        this.headerFigure.classList = "happiness__logo";

        this.headerIcon = document.createElement("i");
        this.headerIcon.classList = " fa-solid fa-microphone happiness__icon";
    }

    render() {
        this.placeToRenderHeader.appendChild(this.header);
        this.header.appendChild(this.headerFigure);
        this.header.appendChild(this.headerH1);
        this.headerFigure.appendChild(this.headerIcon);
    }
}

class Main {
    placeToRenderMain;
    happinessMain;
    happinessRightSection;
    happinessLeftSection;
    firstEpisode;

    constructor(placeToRenderMain, episodes) {
        this.placeToRenderMain = document.getElementsByTagName(placeToRenderMain)[0];

        this.happinessMain = document.createElement("main");
        this.happinessMain.classList = "happiness";

        this.happinessLeftSection = new LeftSection(this.happinessMain, this, episodes);
        this.happinessRightSection = new RightSection(this.happinessMain, this.firstEpisode);
    }

    render() {
        this.placeToRenderMain.appendChild(this.happinessMain);
        this.happinessLeftSection.render();
        this.happinessRightSection.render();
    }

    changeRightSection(clickedEpisode) {
        this.happinessRightSection.changeRightSectionContent(clickedEpisode);
    }
}

class LeftSection {
    placeToRender;
    happinessClassMain;
    happinessLeftSection;

    happinessUl;
    happinessLi;
    happinessImg;

    happinessPDate;
    happinessPTitle;
    happinessPText;
    episodes;

    constructor(placeToRender, happinessClassMain, episodes) {
        this.episodes = episodes;

        this.placeToRender = placeToRender;
        this.happinessClassMain = happinessClassMain;

        this.happinessLeftSection = document.createElement("section");
        this.happinessLeftSection.classList = "happiness__section happiness__section--left";

        this.happinessUl = document.createElement("ul");
        this.happinessUl.classList = "happiness__ul";

        let existingNumbers = [];
        for (let i = 0; i < 4; i++) {
            let randomNumber = this.randomizer();
            if(i === 0){
                this.happinessClassMain.firstEpisode = this.episodes[randomNumber];
            }

            // The number may not be there twice
            while(existingNumbers.includes(randomNumber)){
                randomNumber = this.randomizer();
            }

            existingNumbers.push(randomNumber);

            this.happinessLi = document.createElement("li");
            this.happinessLi.classList = "happiness__li";
            this.happinessLi.addEventListener("click", () => this.happinessClassMain.changeRightSection(this.episodes[randomNumber]));

            this.happinessImg = document.createElement("img");
            this.happinessImg.classList = "happiness__img";
            this.happinessImg.setAttribute("src", episodes[randomNumber]["image"]["src"]);
            this.happinessImg.setAttribute("alt", episodes[randomNumber]["image"]["alt"]);   //   <----- Don't forget

            this.happinessPDate = document.createElement("p");
            this.happinessPDate.classList = "happiness__p happiness__p--date";
            this.happinessPDate.innerText = episodes[randomNumber]["date (dd-mm-yyyy)"];

            this.happinessPTitle = document.createElement("p");
            this.happinessPTitle.classList = "happiness__p happiness__p--title";
            this.happinessPTitle.innerText = episodes[randomNumber]["title"];

            this.happinessUl.appendChild(this.happinessLi);
            this.happinessLi.appendChild(this.happinessImg);
            this.happinessLi.appendChild(this.happinessPDate);
            this.happinessLi.appendChild(this.happinessPTitle);
        }
    }

    randomizer() {
        return Math.floor(Math.random() * this.episodes.length);
    }

    render() {
        this.placeToRender.appendChild(this.happinessLeftSection);
        this.happinessLeftSection.appendChild(this.happinessUl);
    }
}

class RightSection {
    placeToRender;
    happinessRightSection;
    detailUl;
    detailLi;

    detailImg;
    detailPDate;
    detailPTitle;
    detailPText;

    detailGroup;
    detailDownload;
    detailLink;

    constructor(placeToRender, firstEpisode) {
        this.placeToRender = placeToRender;

        this.happinessRightSection = document.createElement("section");
        this.happinessRightSection.classList = "happiness__section happiness__section--right";

        this.detailUl = document.createElement("ul");
        this.detailUl.classList = "detail__ul";

        // All li's
        this.detailLiTop = document.createElement("li");
        this.detailLiTop.classList = "detail__li";

        this.detailLiMiddle = document.createElement("li");
        this.detailLiMiddle.classList = "detail__li";

        this.detailBottom = document.createElement("li");
        this.detailBottom.classList = "detail__li";
        // --------------------

        this.detailImg = document.createElement("img");
        this.detailImg.classList = "detail__img";
        this.detailImg.setAttribute("src", firstEpisode["image"]["src"]);
        this.detailImg.setAttribute("alt", "")  //   <----- Don't forget

        this.detailPDate = document.createElement("p");
        this.detailPDate.classList = "detail__p detail__p--date";
        this.detailPDate.innerText = firstEpisode["date (dd-mm-yyyy)"];

        this.detailPTitle = document.createElement("p");
        this.detailPTitle.classList = "detail__p detail__p--title";
        this.detailPTitle.innerText = firstEpisode["title"];

        this.detailPText = document.createElement("p");
        this.detailPText.classList = "detail__p detail__p--summary";
        this.detailPText.innerText = firstEpisode["summary"];

        this.detailGroup = document.createElement("div");
        this.detailGroup.classList = "detail__group";

        this.detailDownload = document.createElement("button");
        this.detailDownload.classList = "detail__download";
        this.detailDownload.innerText = "Downloaden";
        this.detailDownload.addEventListener("click", () => window.location = firstEpisode["audio"]);

        this.detailLink = document.createElement("a");
        this.detailLink.classList = "detail__link";
        this.detailLink.innerText = "Source >";
        this.detailLink.setAttribute("href", firstEpisode["url"]);    //   <----- Don't forget
        this.detailLink.setAttribute("target", "_blank");
    }

    render() {
        this.placeToRender.appendChild(this.happinessRightSection);
        this.happinessRightSection.appendChild(this.detailUl);
        // Li top
        this.detailUl.appendChild(this.detailLiTop);
        this.detailLiTop.appendChild(this.detailImg);
        this.detailLiTop.appendChild(this.detailPDate);
        this.detailLiTop.appendChild(this.detailPTitle);
        // Li middle
        this.detailUl.appendChild(this.detailLiMiddle);
        this.detailLiMiddle.appendChild(this.detailPText);

        this.detailUl.appendChild(this.detailBottom);
        this.detailBottom.appendChild(this.detailGroup);
        this.detailGroup.appendChild(this.detailDownload);
        this.detailGroup.appendChild(this.detailLink);
    }

    changeRightSectionContent(clickedEpisode) {
        this.detailImg.setAttribute("src", clickedEpisode["image"]["src"]);
        this.detailImg.setAttribute("alt", clickedEpisode["image"]["alt"]);

        this.detailPText.innerText = clickedEpisode["summary"];

        this.detailPDate.innerText = clickedEpisode["date (dd-mm-yyyy)"];
        this.detailPTitle.innerText = clickedEpisode["title"];

        this.detailDownload.addEventListener("click", () => window.location = clickedEpisode["audio"]);

        this.detailLink.setAttribute("href", clickedEpisode["url"]);
    }
}

class Footer {
    placeToRenderFooter;
    footer;
    footerP;

    constructor(placeToRenderFooter) {
        this.placeToRenderFooter = document.getElementsByTagName(placeToRenderFooter)[0];

        this.footer = document.createElement("footer");
        this.footer.classList = "footer";

        this.footerP = document.createElement("p");
        this.footerP.classList = "footer__p";
        this.footerP.innerText = "Gemaakt door: Milou Geervliet, 2D, Mediacollege";
    }

    render() {
        this.placeToRenderFooter.appendChild(this.footer);
        this.footer.appendChild(this.footerP);
    }
}


class Collection {
    apiData;

    header;
    main;
    footer;

    constructor() {

        this.header = new Header("body");
        this.header.render();

        this.apiData = new JsonData("../data/data.json");
        this.apiData.getJsonData()
            .then((episodes) => {
                this.main = new Main("body", episodes);
                this.main.render();

                this.footer = new Footer("body");
                this.footer.render();
            });
    }
}

const app = new Collection();


