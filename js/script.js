//==================================================
// HARU PORTFOLIO
// script.js
//==================================================

const viewer = document.querySelector("#viewer");

const cards = document.querySelectorAll(".project-card");

const viewerTitle = document.querySelector("#viewerTitle");

const viewerDescription = document.querySelector("#viewerDescription");



//==================================================
// CREATE ANIMATION PANEL
//==================================================

const animationPanel = document.createElement("div");

animationPanel.className = "animation-selector";

animationPanel.innerHTML = `

<h3>Animations</h3>

<div class="animation-buttons"></div>

`;

document.querySelector(".viewer").appendChild(animationPanel);

const animationButtons = animationPanel.querySelector(".animation-buttons");



//==================================================
// CREATE LOADING
//==================================================

const loading = document.createElement("div");

loading.className = "viewer-loading";

loading.textContent = "Loading model...";

document.querySelector(".viewer").appendChild(loading);



//==================================================
// LOADING EVENTS
//==================================================

viewer.addEventListener("load", () => {

    loading.classList.remove("visible");

    createAnimationButtons();

});

viewer.addEventListener("error", () => {

    loading.textContent = "Failed to load model.";

    loading.classList.add("visible");

});



//==================================================
// CHANGE MODEL
//==================================================

cards.forEach(card => {

    card.addEventListener("click", () => {

        cards.forEach(c => c.classList.remove("active"));

        card.classList.add("active");

        loading.textContent = "Loading model...";

        loading.classList.add("visible");

        viewer.src = card.dataset.model;

        viewerTitle.textContent = card.dataset.title;

        viewerDescription.textContent = card.dataset.description;

    });

});



//==================================================
// CREATE ANIMATION BUTTONS
//==================================================

function createAnimationButtons(){

    animationButtons.innerHTML = "";

    const animations = viewer.availableAnimations;

    if(!animations || animations.length === 0){

        animationPanel.style.display = "none";

        return;

    }

    animationPanel.style.display = "block";

    animations.forEach((animation,index)=>{

        const button = document.createElement("button");

        button.textContent = animation;

        if(index===0){

            button.classList.add("active");

            viewer.animationName = animation;

        }

        button.addEventListener("click",()=>{

            animationButtons
                .querySelectorAll("button")
                .forEach(b=>b.classList.remove("active"));

            button.classList.add("active");

            viewer.animationName = animation;

        });

        animationButtons.appendChild(button);

    });

}



//==================================================
// AUTO ROTATION
//==================================================

viewer.autoRotate = true;

viewer.rotationPerSecond = "18deg";



//==================================================
// PAUSE AUTO ROTATE
//==================================================

viewer.addEventListener("camera-change", () => {

    viewer.autoRotate = false;

    clearTimeout(window.rotateTimeout);

    window.rotateTimeout = setTimeout(() => {

        viewer.autoRotate = true;

    },3000);

});



//==================================================
// DEFAULT MODEL
//==================================================

window.addEventListener("load",()=>{

    loading.classList.add("visible");

});
