// const { error } = required("neverthrow");
// import { emailjs } from "emailjs-com";

// turn pages when clicking next or previous buttons
const pageTurnBtn = document.querySelectorAll('.nextprev-btn');

pageTurnBtn.forEach((el, index) => {
    el.onclick = () => {
        const pageTurnId = el.getAttribute('data-page');
        const pageTurn = document.getElementById(pageTurnId);

        if (pageTurn.classList.contains('turn')) {
            pageTurn.classList.remove('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 - index;
            }, 500);
        } else {
            pageTurn.classList.add('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 + index;
            }, 500);
        }
    }
})

//contact me button when click
const pages = document.querySelectorAll('.book-page.page-right');
const contactMeBtn = document.querySelector('.btn.contact-me');

contactMeBtn.onclick = () => {
    pages.forEach((page, index) => {
        setTimeout(() => {
            page.classList.add('turn');

            setTimeout(() => {
                page.style.zIndex = 20 + index;
            }, 500)
        }, (index + 1) * 200 + 100)
    })
}

//create reverse index function
let totalPages = pages.length;
let pageNumber = 0;

function reverseIndex() {
    pageNumber--;
    if (pageNumber < 0) {
        pageNumber = totalPages - 1;
    }
}

//back profile button when click
const backProfileBtn = document.querySelector('.back-profile');

backProfileBtn.onclick = () => {
    pages.forEach((_, index) => {
        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].classList.remove('turn');

            setTimeout(() => {
                reverseIndex();
                pages[pageNumber].style.zIndex = 10 + index;
            }, 500)
            }, (index + 1) * 200 + 100)
        })
}
    
//opening animation
const coverRight = document.querySelector('.cover.cover-right');
const pageLeft = document.querySelector('.book-page.page-left');

//opeining animation (cover right animation)
setTimeout(() => {
    coverRight.classList.add('turn');
}, 2100)

setTimeout(() => {
    coverRight.style.zIndex = -1;
}, 2800)

//opeining animation (page left or profile page animation)
setTimeout(() => {
    pageLeft.style.zIndex = 20;
}, 3200)

//opeining animation (all pages right animation)
pages.forEach((_, index) => {
        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].classList.remove('turn');

            setTimeout(() => {
                reverseIndex();
                pages[pageNumber].style.zIndex = 10 + index;
            }, 500)
            }, (index + 1) * 200 + 2100)
})
   
//Get all needed elements from the DOM
const contactForm = document.querySelector("#contact-form");
const submitBtn = document.querySelector("#submit");
const nameInput = document.querySelector("#user_name");
const emailInput = document.querySelector("#user_email");
const messageInput = document.querySelector("#message");

//Get needed data from email JS
const publicKey = "mzt23mQO2JnJOZjSU";
const serviceID = "service_ngbjzja";
const templateID = "template_cbwl6so";

// Initialize email JS with public key
emailjs.init(publicKey);

//Add submit event to the form
contactForm.addEventListener("submit", e => {
    //Prevent form default behaviour
    e.preventDefault();
    //Change button text
    submitBtn.innerHTML = "Sending...";
    //Get all input field values
    const inputFields = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value,
    }
    /*Send the email
    (Add service, template ID and input field values)*/
    emailjs.send(serviceID, templateID, inputFields)
        .then(() => {
            //Change button text
            submitBtn.innerHTML = "Message Sent Successfully";
            //Clear out all fields
            nameInput.value = "";
            emailInput.value = "";
            messageInput.value = "";
        }, (error) => {
            //Console log the error
            console.log(error);
            //Change button text
            submitBtn.innerHTML = "Error Sending Message";
        });
});
