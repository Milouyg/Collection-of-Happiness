class JsonData {
    data;
    url;

    constructor(newUrl){
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
        this.headerH1.innerText = "Logotext";

        this.headerFigure = document.createElement("figure");
        this.headerFigure.classList = "happiness__logo";

        this.headerIcon = document.createElement("i");
        this.headerIcon.classList = " fa-solid fa-microphone icoon";
    }

    render() {
        this.placeToRenderHeader.appendChild(this.header);
        this.header.appendChild(this.headerH1);
        this.header.appendChild(this.headerFigure);
        this.header.appendChild(this.headerFigure);
        this.headerFigure.appendChild(this.headerIcon);
    }
}

class Main {
    placeToRenderMain;
    happinessMain;
    happinessRightSection;
    happinessLeftSection;

    constructor(placeToRenderMain, episodes) {
        this.placeToRenderMain = document.getElementsByTagName(placeToRenderMain)[0];

        this.happinessMain = document.createElement("main");
        this.happinessMain.classList = "happiness";

        this.happinessLeftSection = new LeftSection(this.happinessMain, this, episodes);
        this.happinessRightSection = new RightSection(this.happinessMain);
    }

    render() {
        this.placeToRenderMain.appendChild(this.happinessMain);
        this.happinessLeftSection.render();
        this.happinessRightSection.render();
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

    constructor(placeToRender, happinessClassMain, episodes) {

        this.placeToRender = placeToRender;
        this.happinessClassMain = happinessClassMain;

        this.happinessLeftSection = document.createElement("section");
        this.happinessLeftSection.classList = "happiness__section happiness__section--left";

        this.happinessUl = document.createElement("ul");
        this.happinessUl.classList = "happiness__ul";

        for(let i = 0; i < 4 ; i++){

                this.happinessLi = document.createElement("li");
                this.happinessLi.classList = "happiness__li";
    
                this.happinessImg = document.createElement("img");
                this.happinessImg.classList = "happiness__img";
                this.happinessImg.setAttribute("src", "https://via.placeholder.com/400x400");
                this.happinessImg.setAttribute("alt", "");   //   <----- Don't forget
    
                this.happinessPDate = document.createElement("p");
                this.happinessPDate.classList = "detail__p detail__p--date";
                this.happinessPDate.innerText = "Datum";
    
                this.happinessPTitle = document.createElement("p");
                this.happinessPTitle.classList = "detail__p detail__p--title";
                this.happinessPTitle.innerText = "Titel";
    
                this.happinessUl.appendChild(this.happinessLi);
                this.happinessLi.appendChild(this.happinessImg);
                this.happinessLi.appendChild(this.happinessPDate);
                this.happinessLi.appendChild(this.happinessPTitle);
        }      
        
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

    constructor(placeToRender) {
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
        this.detailImg.setAttribute("src", "https://via.placeholder.com/600x200");
        this.detailImg.setAttribute("alt", "")  //   <----- Don't forget
        
        this.detailPDate = document.createElement("p");
        this.detailPDate.classList = "detail__p detail__p--date";

        this.detailPTitle = document.createElement("p");
        this.detailPTitle.classList = "detail__p detail__p--title";

        this.detailPText = document.createElement("p");
        this.detailPText.classList = "detail__p detail__p--text";
        this.detailPText.innerText = "Hier moet Json data gepakt worden";

        this.detailGroup = document.createElement("div");
        this.detailGroup.classList = "detail__group";

        this.detailDownload = document.createElement("button");
        this.detailDownload.classList = "detail__download";
        this.detailDownload.innerText = "Downloaden";

        this.detailLink = document.createElement("a");
        this.detailLink.classList = "detail__link";
        this.detailLink.innerText = "Source >";
        this.detailLink.setAttribute("href", "")    //   <----- Don't forget
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
}

class Footer {
    placeToRenderFooter;
    footer;
    footerP;

    constructor(placeToRenderFooter){
        this.placeToRenderFooter = document.getElementsByTagName(placeToRenderFooter)[0];

        this.footer = document.createElement("footer");
        this.footer.classList = "footer";

        this.footerP = document.createElement("p");
        this.footerP.classList = "footer__p";
        this.footerP.innerText = "Gemaakt door: Milou Geervliet, 2D, Mediacollege";
    }

    render(){
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


