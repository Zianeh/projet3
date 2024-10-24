
const prompt = require('prompt-sync')()





console.log("La partie commence !")

let attaqueOne = {
    nom: "Frappe Rapide",
    puissance: -10,
    precision: 2
}

let attaqueDeux = {
    nom: "Soin Léger",
    puissance: +15,
    precision: 3
}

let attaqueTrois = {
    nom: "Coup Puissant",
    puissance: -20,
    precision: 3
}

let attaqueQuatre = {
    nom: "Frappe Dévastatrice",
    puissance: -30,
    precision: 4
}

let joueur = {
    nom: "Guerrier du Feu",
    pv: 100,
    atks: [attaqueOne, attaqueDeux, attaqueTrois, attaqueQuatre]
}

let sombreLutin = {
    nom: "Sombre Lutin",
    pv: 100,
    atks: [attaqueOne, attaqueDeux, attaqueTrois, attaqueQuatre]
}






//  ---------- les function ------------

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function attaquer(attaquant, defenseur, attaque) {
    let chance = random(1, attaque.precision)

    if (chance == attaque.precision) {
        defenseur.pv += attaque.puissance
        if (attaque.puissance > 0) {



            if (attaque.nom === "Soin Léger") {
                console.log(attaquant.nom, "utilise", attaque.nom, "et soigne de", (attaque.puissance), "PV !")
            } else {
                console.log(attaquant.nom, "utilise", attaque.nom, "et inflige", Math.abs(attaque.puissance), "PV !")
            }

        } else {

        }

    } else {
        console.log(attaquant.nom, "a manqué son attaque !")
    }
    if (defenseur.pv < 0) defenseur.pv = 0
}

function attaqueAleatoire() {
    let randomIndex = Math.floor(Math.random() * sombreLutin.atks.length)
    return sombreLutin.atks[randomIndex]
}

function vieRestant() {
    if (sombreLutin.pv === 0) {
        console.log("\n", sombreLutin.nom, "est vaincu !", joueur.nom, "remporte le combat !")
    }
    if (joueur.pv === 0) {
        console.log("\n", joueur.nom, "est vaincu !", sombreLutin.nom, "remporte le combat !")
    }
}

function choix() {
    console.log("\nChoisissez une attaque :")
    for (let i = 0; i < joueur.atks.length; i++) {
        console.log(i + 1 + ": " + joueur.atks[i].nom + " - Puissance : " + joueur.atks[i].puissance + " - Précision : " + joueur.atks[i].precision + "%")
    }

    let choix = Number(prompt("Entrez le numéro de l'attaque: "))
    while (isNaN(choix) || choix < 1 || choix > joueur.atks.length) {
        console.log("Veuillez entrer un numéro valide compris entre 1 et", joueur.atks.length, ".")
        choix = Number(prompt("Entrez le numéro de l'attaque: "))
    }
    return choix - 1
}


// --------- code lancement jeu, j'ai retirer la function init mais c'est pareil---------

// function init() {
let tour = 0
while (joueur.pv > 0 && sombreLutin.pv > 0) {
    
    console.log("\n", joueur.nom, "- PV:", joueur.pv)
    console.log(sombreLutin.nom, "- PV:", sombreLutin.pv)

    let AttaqueJoueur = choix()

    attaquer(joueur, sombreLutin, joueur.atks[AttaqueJoueur])

    vieRestant()
    if (sombreLutin.pv === 0) break

    let attaqueLutin = attaqueAleatoire()
    attaquer(sombreLutin, joueur, attaqueLutin)

    vieRestant()
    if (joueur.pv === 0) break


    tour++
    console.log("\n", "-------------------------------------------");
    console.log("\n", "TOUR numéro: " + tour);


}

console.log("La partie est terminée.")
// }

// init()


