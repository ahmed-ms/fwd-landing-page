// Globale variables


// Section text
const text = `A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite
A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite
A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite`;

// Hold all section data 
const sections = [];
// deley scroll action
let delay = null;
// To hold  setions container in DOM
const sectionsElement = document.getElementById('sections');
// To hold NAV
const navElement = document.querySelector('#nav');
// To hold last nav item clicked 
let lastItmeLinke = null;
// To hold last section visited
let lastSectionScrolled = null;
// Sections data generator
for (let i = 1; i <= 4; i++) {
    const section = {
        id: `section${i}`,
        navID: `nav-item${i}`,
        title: `Section ${i}`,
        text: text,
        footer: `Auther ${i}`
    }
    sections.push(section);
}



// Start function execution

addSectionsToPage();


buildNav();


window.addEventListener('scroll', function(e) {
    if (delay != null) { clearTimeout(delay); }
    delay = setTimeout(scrollAction, 100);
});


/**
* @description add sections to page 

*/

function addSectionsToPage() {

    for (const section of sections) {
        const li = document.createElement('li');
        li.id = section.id;
        const title = document.createElement('h2');
        const text = document.createElement('p');
        const footer = document.createElement('small');

        title.textContent = section.title;
        text.textContent = section.text;
        footer.textContent = section.footer;

        li.appendChild(title);
        li.appendChild(text);
        li.appendChild(footer);

        li.classList = 'section'
        li.setAttribute('data-nav', section.navID)
        if (li.id === 'section1') {
            li.classList.add('activeSection');
            lastSectionScrolled = li;

        }
        sectionsElement.appendChild(li);



    }
}


/**
* @description Navigation Building

*/
function buildNav() {
    for (const section of sections) {
        // Create dom elements of nav
        const li = document.createElement('li');
        const linkItem = document.createElement('a');
        // Assign text to item
        linkItem.textContent = section.title;
        linkItem.setAttribute('id', section.navID)
            // Add click event  
        linkItem.addEventListener('click', function(e) {
            // Get target section to scroll
            const sectionElement = document.getElementById(section.id);
            removeStyle()
                // Assign  active style for cliced link item
            e.target.classList = 'activeLinke';
            // Assign last linke clicked
            lastItmeLinke = e.target;
            // Assign  active style target section
            sectionElement.classList.add('activeSection');
            // Assign last section visited
            lastSectionScrolled = sectionElement;
            // Scroll to target section
            sectionElement.scrollIntoView({ behavior: "smooth", block: "center" });
            document.body.scrollTop -= 30;
        });

        // Assign style for page loaded - first item of nav
        if (section.id === 'section1') {
            linkItem.classList = 'activeLinke';
            lastItmeLinke = linkItem;
        }

        // Add item anchor to li
        li.appendChild(linkItem);

        // Add li  to ul nav
        navElement.appendChild(li)
    }
    // Assign style to ul nav
    navElement.classList = 'nav'
}

/**
* @description add style while 
/* page scroll to section and navigation

*/
function scrollAction() {

    // To hold all setions elemnt in DOM
    const sectionsContenet = document.querySelectorAll(".section");
    // get window Y offset with added 200px to have good look
    const curentWindowTop = window.pageYOffset + 200;

    for (const section of sectionsContenet) {
        // Check if section is less than window Y offset
        // and section heihgt plus its top offset greater than window Y offset
        // To apply style
        if (curentWindowTop >= section.offsetTop &&
            curentWindowTop < (section.offsetTop + section.offsetHeight)) {

            removeStyle();

            // Assign last section visited

            section.classList.add('activeSection');
            lastSectionScrolled = section;


            let link = document.getElementById(section.getAttribute('data-nav'));

            // Assign  active style for cliced link item
            link.classList = 'activeLinke';
            lastItmeLinke = link;
        }

    }

}

// MEDIA QUERY
//In this approach the media read at page loaded. 
//If media changed during browsing no action taken.
const mq = window.matchMedia("(min-width: 600px)");
if (!mq.matches) {
    // To hold nav items
    const nav_items = navElement.querySelectorAll('li');
    // assign new class for mobile
    for (let item of nav_items) {
        item.classList = 'mobile-item';
    }
    // To hold sections 
    const sections = sectionsElement.querySelectorAll('li');
    // assign new class for mobile
    for (let section of sections) {
        section.classList.add('section-mobile');
    }
    // Menu icon container
    const menuIconDiv = document.createElement('div');
    const linkItem = document.createElement('a');

    linkItem.innerHTML = '<i class="fa fa-bars"></i>';
    linkItem.addEventListener('click', function() {
        // Show and hide navigation menu for mobile
        if (navElement.style.display === 'none') {
            navElement.style.display = 'block';
        } else {
            navElement.style.display = 'none';
        }
    });
    menuIconDiv.appendChild(linkItem);
    menuIconDiv.id = "menu-icon";
    menuIconDiv.classList = "menu-icon";
    navElement.style.display = 'none'
    document.querySelector('header').appendChild(menuIconDiv);
}


/**
* @description remove style from last visted section
/* and last clicked nav item

*/
function removeStyle() {
    if (lastSectionScrolled != null) {
        lastSectionScrolled.classList.remove('activeSection');
    }
    if (lastItmeLinke != null) {
        lastItmeLinke.classList.remove('activeLinke');
    }
}