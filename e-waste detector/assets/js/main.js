// NEW LOOKUP TABLE GENERATED FROM YOUR SPREADSHEET
        const lookup = {
                "Battery": "Resell: N/A. Recycle: Hazardous waste drop-off, Battery recycling programs (e.g., local battery collection drives)",
    "Microwave": "Resell: OLX, Quikr, Amazon. Recycle: Local e-waste recycling center, Appliance exchange programs",
    "Keyboard": "Resell: OLX, Quikr, eBay. Recycle: Local e-waste recycling center, Manufacturer take-back programs",
    "mobile": "Resell: OLX, Quikr, Cashify, Best Buy Trade-In. Recycle: Local e-waste collection center, Manufacturer buyback or trade-in services",
    "PCB": "Resell: N/A. Recycle: Electronics recycler / scrap dealer, Specialized e-waste dismantlers",
    "Mouse": "Resell: OLX, Quikr, eBay. Recycle: Local e-waste recycling center, Community e-waste drives",
    "Player": "Resell: OLX, Quikr, Amazon. Recycle: Local e-waste recycling center, Audio device recycling programs",
    "Television": "Resell: OLX, Quikr, eBay. Recycle: E-waste recycling center, Retailer take-back schemes",
    "Printer": "Resell: OLX, Quikr, Amazon. Recycle: Local e-waste recycling center, Ink cartridge recycling programs",
    "Washing Machine": "Resell: OLX, Quikr, Appliance exchange platforms. Recycle: E-waste recycling center, Local appliance disposal services",
    "Refrigerator": "Resell: OLX, Quikr, Amazon. Recycle: E-waste recycling center, Hazardous material disposal centers",
    "LED": "Resell: OLX, Quikr, eBay. Recycle: Local e-waste collection center, Light bulb recycling drives",
    "Air Conditioner": "Resell: OLX, Quikr, Amazon. Recycle: E-waste recycling center, Refrigerant recovery programs",
    "Routers": "Resell: OLX, Quikr, eBay. Recycle: Local e-waste collection center, Electronics manufacturer recycling initiatives",
    "Motherboard": "Resell: N/A. Recycle: Electronics recycler / scrap dealer, Computer component recycling centers",
    "Fans": "Resell: OLX, Quikr, eBay. Recycle: Local e-waste collection center, Small appliance recycling programs",
    "Bulb": "Resell: N/A. Recycle: Hazardous waste drop-off, LED bulb take-back programs",
    "Tubelights": "Resell: N/A. Recycle: Hazardous waste drop-off, Fluorescent tube recycling centers",
    
    // New devices added with expanded resell and recycle info
    "Laptop": "Resell: OLX, Quikr, Cashify, Best Buy Trade-In. Recycle: Local e-waste recycling center, Manufacturer laptop recycling programs (e.g., Dell or HP take-back)",
    "Computer": "Resell: OLX, Quikr, eBay. Recycle: E-waste recycling center, PC component disposal services",
    "Tablet": "Resell: OLX, Quikr, Cashify, Amazon. Recycle: Local e-waste collection center, Tablet manufacturer trade-in options",
    "Camera": "Resell: OLX, Quikr, eBay, Best Buy Trade-In. Recycle: Local e-waste recycling center, Photography equipment recycling drives",
    "Speakers": "Resell: OLX, Quikr, Amazon. Recycle: Local e-waste collection center, Audio device manufacturer programs",
    "Headphones": "Resell: OLX, Quikr, eBay. Recycle: Local e-waste recycling center, Earphone recycling initiatives (e.g., via brands like Bose)",
    "Charger": "Resell: N/A. Recycle: Hazardous waste drop-off, Cable and charger collection drives",
    "Hard Drive": "Resell: OLX, Quikr, eBay. Recycle: Electronics recycler / scrap dealer, Data destruction and recycling services",
    "Monitor": "Resell: OLX, Quikr, Amazon. Recycle: E-waste recycling center, Screen recycling programs",
    "Gaming Console": "Resell: OLX, Quikr, Cashify, GameStop Trade-In. Recycle: Local e-waste recycling center, Console manufacturer recycling options (e.g., Sony or Microsoft)"
        };

        // The link to your hosted Teachable Machine model
        // **IMPORTANT: You MUST replace this URL with the actual URL from your Teachable Machine export!**
        const URL = "https://teachablemachine.withgoogle.com/models/IwlfkkKFr/";

        let model, webcam, maxPredictions;

        // Load the model and setup the webcam
        async function init() {
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";

            // Load the model
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();

            // Setup the webcam
            const flip = true; // Flips the webcam image horizontally
            webcam = new tmImage.Webcam(300, 300, flip); // Increased size for better view
            await webcam.setup(); // Request access
            await webcam.play();
            window.requestAnimationFrame(loop); // Start the prediction loop

            // Append webcam to the container
            document.getElementById("webcam-container").appendChild(webcam.canvas);
        }

        async function loop() {
            webcam.update(); // Update the webcam frame
            await predict();
            window.requestAnimationFrame(loop); // Keep looping for real-time results
        }

        // Run the webcam image through the image model and update the lookup table
        async function predict() {
            // Predict the class
            const prediction = await model.predict(webcam.canvas);

            // Find the class with the highest probability (the prediction)
            let highestProb = 0;
            let predictedClass = "Unknown";

            for (let i = 0; i < maxPredictions; i++) {
                if (prediction[i].probability.toFixed(2) > highestProb) {
                    highestProb = prediction[i].probability.toFixed(2);
                    predictedClass = prediction[i].className;
                }
            }

            // Update the HTML display
            document.getElementById("item-prediction").innerText = predictedClass + ` (${(highestProb * 100).toFixed(0)}% confidence)`;
            
            // Look up the disposal advice from your spreadsheet data
            const disposalAdvice = lookup[predictedClass] || "Disposal information not found for this item.";
            document.getElementById("item-lookup").innerText = disposalAdvice;
        }
        /*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 50,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SHOW SCROLL UP ===============*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-toggle-right'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-toggle-left' : 'bx-toggle-right'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-toggle-left' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})