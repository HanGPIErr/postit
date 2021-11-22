/* let testpostit=new Postit(500,500,125,175,"red", "texte",1)
console.log(testpostit.affichage())
testpostit.deplace(200,300)
testpostit.affichage()
testpostit.redimmensionne(500,1200)
testpostit.affichage()
testpostit.changeTexte("blue")
testpostit.affichage()
testpostit.changeCouleur("purple")
testpostit.affichage()
*/
let tabpostit= []
let numpostit=-1
let action=""
document.querySelector(".pibleu").addEventListener("click", ()=>{
    tabpostit.push(new Postit(500,200,125,175,"blue","Post-it Bleu",tabpostit.length))
    tabpostit[tabpostit.length-1].affichage()
})
document.querySelector(".pirouge").addEventListener("click", ()=>{
    tabpostit.push(new Postit(350,350,125,175,"red","Post-it Rouge",tabpostit.length))
    tabpostit[tabpostit.length-1].affichage()
})
document.querySelector(".pivert").addEventListener("click", ()=>{
    tabpostit.push(new Postit(450,450,125,175,"green","Post-it Vert",tabpostit.length))
    tabpostit[tabpostit.length-1].affichage()
})
document.body.addEventListener("mousemove", (event) => {
    if (numpostit>-1 && action=="deplacer"){
        tabpostit[numpostit].deplace(event.clientX-tabpostit[numpostit].largeur+100,event.clientY-tabpostit[numpostit].hauteur+10);
        tabpostit[numpostit].affichage()
    }
    if (numpostit>-1 && action=="redimmensionne"){
        tabpostit[numpostit].redimmensionne(tabpostit[numpostit].largeurorig+(event.clientX-tabpostit[numpostit].posx),tabpostit[numpostit].hauteurorig+(event.clientY-tabpostit[numpostit].posy));
        tabpostit[numpostit].affichage()
    }
})
document.body.addEventListener("click", (event) => {
    numpostit=-1
    action=""
})
document.body.addEventListener("keypress", (event) => {
    console.log(event)
    if (numpostit>-1 && action=="texte"){
        if (event.key)
        tabpostit[numpostit].changeTexte(tabpostit[numpostit].texte+event.key);
        tabpostit[numpostit].affichage()
    }
})
/**
 * Fonction pour supprimer le Postit
 * @param {number} num 
 */
function delPost(num) {
    delete tabpostit[num]
}
document.cookie="user=Pierre-Romain"

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

setInterval(() => {
    localStorage.setItem("lol",JSON.stringify(tabpostit),365)
console.log(JSON.stringify(tabpostit))}, 1000);



window.addEventListener("load", () => {
    let ncookie = JSON.parse(localStorage.getItem("lol"))
    for(i=0;i<ncookie.length;i++){
        if(ncookie[i]!==null){
            
        tabpostit.push(new Postit(ncookie[i].x,ncookie[i].y, ncookie[i].largeur, ncookie[i].hauteur, ncookie[i].couleur, ncookie[i].texte, tabpostit.length))
        
        tabpostit[tabpostit.length-1].affichage()
        }
    }
})
/**
 * On test le drag n drop
 * @param {string} event 
 */
 function drag_start(event) {
	var style = window.getComputedStyle(event.target, null);
	event.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY) + ',' + event.target.getAttribute(Postit));
}

function drag_over(event) {
	event.preventDefault();
	return false;
}

function drop(event) {
	var offset = event.dataTransfer.getData("text/plain").split(',');
	var dm = document.getElementsByClassName('dragme');
	dm[parseInt(offset[2])].style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
	dm[parseInt(offset[2])].style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
	event.preventDefault();
	return false;
}

var dm = document.getElementsByClassName('dragme');
for (var i = 0; i < dm.length; i++) {
	document.body.addEventListener('dragover', drag_over, false);
	document.body.addEventListener('drop', drop, false);
}