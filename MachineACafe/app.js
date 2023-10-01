import {injectElements, renewTag, createElement} from "./functions/dom.js";


const machineACafe = {
    eau: 400,
    lait: 540,
    grains: 120,
    argent: 550,
    tassesJetables: 9
}

window.onload = function() {
    var quantiteTassesInput = document.getElementById('quantiteTasses');
    quantiteTassesInput.placeholder = `Eau disponible: ${machineACafe.eau} ml, Lait disponible: ${machineACafe.lait} ml, Grains de café disponibles: ${machineACafe.grains} g`;
    setTimeout(function() {quantiteTassesInput.placeholder = `Nb tasses ?`;}, 2000);
  }
  


function calcul() {
    const quantiteTassesInput = document.getElementById('quantiteTasses');
    quantiteTassesInput.placeholder = `Eau disponible: ${machineACafe.eau} ml, Lait disponible: ${machineACafe.lait} ml, Grains de café disponibles: ${machineACafe.grains} g`;

    var quantiteTasses =  Number(document.getElementById('quantiteTasses').value);
    const NbEau = quantiteTasses * 200;
    const NbLait = quantiteTasses * 50;
    const NbGrains = quantiteTasses * 15;

    alert(`Eau disponible: ${machineACafe.eau} ml, Lait disponible: ${machineACafe.lait} ml, Grains de café disponibles: ${machineACafe.grains} g`);
    if (quantiteTasses > 0) {
        const nbTasse = Math.floor(Math.min(machineACafe.eau / 200,machineACafe.lait / 50,machineACafe.grains / 15) ); //min va recuperer parmi les 3 divisions la plus petite valeur = nb de tasses maximal que l'on peux créer
        if (machineACafe.eau >= NbEau && machineACafe.lait >= NbLait &&machineACafe.grains >= NbGrains) {
            
            var quantiteSupplementaire = nbTasse - quantiteTasses ;
            if (nbTasse > 0 && quantiteSupplementaire > 0) {
                alert(`Oui, je peux faire cette quantité de café (et même ${quantiteSupplementaire} plus que cela)`);
            } else {
                alert('Oui, je peux faire cette quantité de café');
            }
        } else {
            alert(`Non, je ne peux faire que ${nbTasse} tasses de café`);
        }

}
else {
        alert('Nombres de tasses invalides');
    }
}


const wrapper = document.querySelector('#controle')

function start() {
    
    const etapes = [
         
        { title: "Commence à faire le café", duree: 2 }, 
        { title: "Mouds les grains de café", duree: 3 }, 
        { title: "Fait chauffer l'eau", duree: 10 }, 
        { title: "Infuse les grains de café moulus", duree: 4 }, 
        { title: "Verse le café dans une tasse", duree: 1 }, 
        { title: "Ajoute un peu de lait dans la tasse", duree: 1 }, 
        { title: "Le café est terminé.", duree: 0 } ]

    const laListe = renewTag('ul');
    wrapper.append(laListe)
    injectElements(etapes, laListe)
}

function acheterCafe(type) {
    let prix = 0;
    let eauNecessaire = 0;
    let laitNecessaire = 0;
    let grainsDeCafeNecessaires = 0;

    switch (type) {
        case "expresso":
            prix = 4;
            eauNecessaire = 250;
            grainsDeCafeNecessaires = 16;
            break;
        case "latte":
            prix = 7;
            eauNecessaire = 350;
            laitNecessaire = 75;
            grainsDeCafeNecessaires = 20;
            break;
        case "cappuccino":
            prix = 6;
            eauNecessaire = 200;
            laitNecessaire = 100;
            grainsDeCafeNecessaires = 12;
            break;
        default:
            alert("Type de café non valide.");
            return;
    }
    
    if (machineACafe.eau >= eauNecessaire && machineACafe.lait >= laitNecessaire && machineACafe.grains >= grainsDeCafeNecessaires && machineACafe.tassesJetables > 0) {
        machineACafe.argent += prix;
        machineACafe.eau -= eauNecessaire;
        machineACafe.lait -= laitNecessaire;
        machineACafe.grains -= grainsDeCafeNecessaires;
        machineACafe.tassesJetables--;

        alert(`Vous avez acheté un ${type}. Prix: ${prix} €`);

    } else {
       alert("Désolé, pas assez de ressources pour préparer ce café.");
    }
}

function remplirMachine(eau, lait, grains, tasses) {
    machineACafe.eau += eau;
    machineACafe.lait += lait;
    machineACafe.grains += grains;
    machineACafe.tassesJetables += tasses;

    alert("La machine à café a été remplie avec succès.");
}

function retirerArgent() {
    alert(`Vous avez retiré ${machineACafe.argent} € de la machine à café.`);
    machineACafe.argent = 0;
}

const etatMachineACafeElement = document.getElementById('etatMachineACafe');

function afficherEtatMachineACafe() {
    etatMachineACafeElement.innerHTML = `<h3>Etat Machine </h3>
        <p>Argent : ${machineACafe.argent} €</p>
        <p>Eau : ${machineACafe.eau} ml</p>
        <p>Lait : ${machineACafe.lait} ml</p>
        <p>Grains de café : ${machineACafe.grains} g</p>
        <p>Tasses jetables : ${machineACafe.tassesJetables}</p>
    `;
}



document.querySelector('#start').addEventListener('click', start)
document.getElementById('calculer').addEventListener('click', () => {
    calcul()
});

document.getElementById('acheter').addEventListener('click', function() {
    let typeCafe = prompt("Quel type de café souhaitez-vous acheter ? (expresso, latte, cappuccino)");
    acheterCafe(typeCafe);
    afficherEtatMachineACafe();
});

document.getElementById('remplir').addEventListener('click', function() {
    let eau = parseInt(prompt("Quantité d'eau à ajouter (en ml) :"));
    let lait = parseInt(prompt("Quantité de lait à ajouter (en ml) :"));
    let grains= parseInt(prompt("Quantité de grains de café à ajouter (en g) :"));
    let tasses = parseInt(prompt("Nombre de tasses jetables à ajouter :"));
    remplirMachine(eau, lait, grains, tasses);
    afficherEtatMachineACafe();
});

document.getElementById('prendre').addEventListener('click', function() {
    retirerArgent();
    afficherEtatMachineACafe();
});



