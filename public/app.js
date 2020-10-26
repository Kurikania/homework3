
let currentTab = 0; 
let t = document.getElementsByClassName("tab"); 
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
showtab(currentTab); 


    // toggleClasses(document.getElementById('start-screen'), 'hide', 'show');

function showtab(n) {
t[n].style.display = "block"
// showing the right buttons 
if(n === 0) {
    prevBtn.style.display = "none";  // if it is the first tab, there is no prev button 
    nextBtn.style.innerHTML = "Start"
} else {
    prevBtn.style.display = "inline"
    nextBtn.innerHTML = "Next" 
}

if (n == (t.length - 1)) { // if it is thr last tab
    nextBtn.setAttribute("onClick", nextLink);
    nextBtn.innerHTML = "Done"
} 
else if (n !== 0) {
    nextBtn.innerHTML = "Next"  
    }
}

function nextPrev (n) { // on prev button n = -1 , on  next btn n = 1 
    t[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= t.length){
        return false 
    }
    showtab(currentTab)
}