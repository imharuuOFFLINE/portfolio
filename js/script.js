/* =========================================================
   PAGE NAVIGATION
========================================================= */

const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");

const pageTitle = document.getElementById("pageTitle");


const pageNames = {
    home: "OVERVIEW",
    projects: "PROJECTS",
    models: "3D MODELS",
    animations: "ANIMATIONS",
    about: "ABOUT",
    contact: "CONTACT"
};


function openPage(pageName) {

    pages.forEach(page => {
        page.classList.remove("active");
    });


    const targetPage = document.getElementById(pageName);

    if (!targetPage) {
        return;
    }

    targetPage.classList.add("active");


    navItems.forEach(item => {

        item.classList.remove("active");

        if (item.dataset.page === pageName) {
            item.classList.add("active");
        }

    });


    pageTitle.textContent =
        pageNames[pageName] || pageName.toUpperCase();


    const container =
        document.querySelector(".page-container");

    container.scrollTop = 0;
}


/* Sidebar */

navItems.forEach(item => {

    item.addEventListener("click", () => {

        const page =
            item.dataset.page;

        openPage(page);

    });

});


/* Buttons that navigate */

document
    .querySelectorAll("[data-page-button]")
    .forEach(button => {

        button.addEventListener("click", () => {

            openPage(
                button.dataset.pageButton
            );

        });

    });


/* =========================================================
   CLOCK
========================================================= */

const clock =
    document.getElementById("clock");


function updateClock() {

    const now = new Date();

    const hours =
        String(now.getHours()).padStart(2, "0");

    const minutes =
        String(now.getMinutes()).padStart(2, "0");

    const seconds =
        String(now.getSeconds()).padStart(2, "0");


    clock.textContent =
        `${hours}:${minutes}:${seconds}`;
}


updateClock();

setInterval(updateClock, 1000);


/* =========================================================
   MAIN MODEL VIEWER
========================================================= */

const mainModel =
    document.getElementById("mainModel");

const modelName =
    document.getElementById("modelName");

const assetItems =
    document.querySelectorAll(".asset-item");


assetItems.forEach(item => {

    item.addEventListener("click", () => {

        assetItems.forEach(asset => {
            asset.classList.remove("active");
        });

        item.classList.add("active");


        const model =
            item.dataset.model;

        const name =
            item.dataset.name;


        mainModel.src = model;

        modelName.textContent = name;

    });

});


/* =========================================================
   ANIMATION VIEWER
========================================================= */

const animationModel =
    document.getElementById("animationModel");

const playAnimationButton =
    document.getElementById("playAnimation");


playAnimationButton.addEventListener(
    "click",
    () => {

        if (!animationModel) {
            return;
        }


        if (
            animationModel.availableAnimations &&
            animationModel.availableAnimations.length > 0
        ) {

            animationModel.animationName =
                animationModel.availableAnimations[0];

            animationModel.play();

        } else {

            console.log(
                "Este modelo no contiene animaciones."
            );

        }

    }
);


/* =========================================================
   PROJECT ROWS
========================================================= */

const projectRows =
    document.querySelectorAll(".project-row");


projectRows.forEach(row => {

    row.addEventListener("click", () => {

        const project =
            row.dataset.project;


        console.log(
            "Opening project:",
            project
        );


        /*
         * Más adelante aquí podremos abrir
         * un editor/página específica del proyecto.
         */

        openPage("projects");

    });

});


/* =========================================================
   MODEL VIEWER EVENTS
========================================================= */

const heroModel =
    document.getElementById("heroModel");


if (heroModel) {

    heroModel.addEventListener(
        "load",
        () => {

            console.log(
                "Featured model loaded."
            );

        }
    );


    heroModel.addEventListener(
        "error",
        event => {

            console.error(
                "Could not load featured model.",
                event
            );

        }
    );

}


/* =========================================================
   MODEL DEBUG INFORMATION
========================================================= */

if (mainModel) {

    mainModel.addEventListener(
        "load",
        () => {

            console.log(
                "Loaded model:",
                mainModel.src
            );


            console.log(
                "Available animations:",
                mainModel.availableAnimations
            );

        }
    );

}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
         * 1 = Overview
         * 2 = Projects
         * 3 = Models
         * 4 = Animations
         * 5 = About
         * 6 = Contact
         */

        const pagesByKey = {
            "1": "home",
            "2": "projects",
            "3": "models",
            "4": "animations",
            "5": "about",
            "6": "contact"
        };


        const target =
            pagesByKey[event.key];


        if (target) {
            openPage(target);
        }

    }
);
