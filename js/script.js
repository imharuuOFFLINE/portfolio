// ==========================================================
// HARU PORTFOLIO
// SCRIPT
// ==========================================================


// =========================
// ACTIVE SIDEBAR SECTION
// =========================


const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".sidebar nav a");



function updateActiveSection() {


    let current = "";


    sections.forEach(section => {


        const sectionTop = section.offsetTop - 300;


        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }


    });



    navLinks.forEach(link => {


        link.classList.remove("active");


        if(link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }


    });


}



window.addEventListener(
    "scroll",
    updateActiveSection
);





// =========================
// SMOOTH NAVIGATION
// =========================


navLinks.forEach(link => {


    link.addEventListener(
        "click",
        event => {


            event.preventDefault();


            const target =
            document.querySelector(
                link.getAttribute("href")
            );


            if(target){


                target.scrollIntoView({

                    behavior:"smooth"

                });


            }


        }

    );


});





// =========================
// VIEWER PARALLAX
// =========================


const viewer =
document.querySelector(".viewer");



if(viewer){


    viewer.addEventListener(
        "mousemove",
        event => {


            const rect =
            viewer.getBoundingClientRect();



            const x =
            event.clientX - rect.left;



            const y =
            event.clientY - rect.top;



            const rotateX =
            ((y / rect.height) - .5) * -8;



            const rotateY =
            ((x / rect.width) - .5) * 8;



            viewer.style.transform = `

                perspective(800px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)

            `;


        }

    );



    viewer.addEventListener(
        "mouseleave",
        () => {


            viewer.style.transform = "";

        }

    );


}





// =========================
// IMAGE LOADING
// =========================


const images =
document.querySelectorAll(
    ".gallery-item img"
);



images.forEach(image => {


    image.addEventListener(
        "load",
        () => {


            image.classList.add("loaded");


        }

    );


});





// =========================
// INITIAL CHECK
// =========================


updateActiveSection();
