/**
 * Classe générale du Postit
 */
class Postit {
    x;
    y;
    largeur;
    hauteur;
    couleur;
    texte;
    id;
    /**
     * 
     * @param {number} x Position horizontal
     * @param {number} y Position vertical
     * @param {number} largeur Définie la largeur du postit
     * @param {number} hauteur Définie la hauteur du postit
     * @param {string} couleur Définie la couleur du postit
     * @param {string} texte Définie le texte du postit
     * @param {string} id Définie le numéro du postit
     */
    constructor(x,y, largeur, hauteur, couleur, texte,id ) {
        this.x=x;
        this.y=y;
        this.largeur=largeur;
        this.hauteur=hauteur;
        this.couleur=couleur;
        this.texte=texte;
        this.id=id;
    }
    /**
     * Zone d'insertion des nouveaux Postit
     */
    affichage(){
        let elem=document.getElementById("Postit"+this.id);
        if(elem==null){
        elem=document.createElement("div");
        document.body.appendChild(elem);
        }
        elem.id="Postit"+this.id;
        elem.style.position="fixed";
        elem.style.top=this.y+"px";
        elem.style.left=this.x+"px";
        elem.style.width=this.largeur+"px";
        elem.style.height=this.hauteur+"px";
        elem.style.backgroundColor=this.couleur;
        elem.innerHTML=this.texte;
        let menu=document.createElement("div");
        /**
         * Menu des paramètres sur les Postit
         */
        menu.className="menu"
        /**
         * On crée le bouton permettant de déplacer le postit
         */
        let boutondeplacer=document.createElement("div");
        menu.appendChild(boutondeplacer);
        boutondeplacer.className="fas fa-expand-arrows-alt"
        boutondeplacer.addEventListener("click", (event) => {
            if(numpostit==this.id){
                numpostit=-1
                action=""
            }
            else{
                numpostit=this.id
                action="deplacer"
            }
            event.stopPropagation()
        })
        /**
         * On crée le bouton permettant de redimmenssioner le postit
         */
        let boutonredim=document.createElement("div");
        menu.appendChild(boutonredim);
        boutonredim.className="fas fa-compress-arrows-alt"
        boutonredim.addEventListener("click", (event) => {
            numpostit=this.id
            action="redimmensionne"
            event.stopPropagation()
            this.hauteurorig=this.hauteur
            this.largeurorig=this.largeur
            this.posy=event.clientY
            this.posx=event.clientX
        })
        /**
         * On crée le bouton permettant d'ajouter du texte à l'intérieur du postit
         */
        let boutontexte=document.createElement("div");
        menu.appendChild(boutontexte);
        boutontexte.className="fas fa-heading"
        boutontexte.addEventListener("click",(event) => {
            numpostit=this.id
            action="texte"
            event.stopPropagation()
        })
        /**
         * On crée le bouton permettant de changer la couleur du postit
         */
        let boutoncolor=document.createElement("div");
        menu.appendChild(boutoncolor);
        boutoncolor.className="fas fa-palette";
        boutoncolor.addEventListener("click", () => {
            if (this.couleur=="blue"){
                this.couleur="red"
            }else if (this.couleur=="red"){
                this.couleur="green"
            }else{
                this.couleur="blue"
            }
            this.affichage()
        })
        /**
         * On crée le bouton permettant de supprimer le postit
         */
        let boutondelete=document.createElement("div");
        menu.appendChild(boutondelete);
        boutondelete.className="far fa-trash-alt"
        boutondelete.addEventListener("click", () => {
            document.body.removeChild(elem);
            delPost(this.id);
        })
        elem.appendChild(menu)
    }

    /**
     * Permets de déplacer le postit
     * @param {number} x valeur axe horizontal
     * @param {number} y valeur axe vertical
     */
    deplace(x,y){
        this.x=x
        this.y=y
    }
    /**
     * Permets de redimmenssionner le Postit
     * @param {number} largeur 
     * @param {number} longueur 
     */
    redimmensionne(largeur,longueur){
        this.largeur=largeur
        this.hauteur=longueur
    }
    /**
     * Permets de changer la couleur du Postit
     * @param {string} couleur 
     */
    changeCouleur(couleur){
        this.couleur=couleur
    }
    /**
     * Permets d'ajouter du texte sur le Postit
     * @param {string} texte 
     */
    changeTexte(texte){
        this.texte=texte
    }
}