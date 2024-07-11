// IMAGES SUBJECTS
import geographySmall from './assets/images/subjects_image/geography-yellow-small.png'
import artsSmall from './assets/images/subjects_image/arts-orange-small.png'
import biologySmall from './assets/images/subjects_image/biology-green-blue-small.png'
import chemicalSmall from './assets/images/subjects_image/chemical-pink-small.png'
import englishSmall from './assets/images/subjects_image/english-purple-small.png'
import grammarSmall from './assets/images/subjects_image/grammar-marine-blue-small.png'
import historySmall from './assets/images/subjects_image/history-yellow-orange-small.png'
import literatureSmall from './assets/images/subjects_image/literature-green-yellow-small.png'
import mathematicsSmall from './assets/images/subjects_image/math-blue-small.png'
import philosophySmall from './assets/images/subjects_image/philosophy-red-small.png'
import physicsSmall from './assets/images/subjects_image/physics-purple-pink-small.png'
import sociologySmall from './assets/images/subjects_image/sociology-red-pink-small.png'

// IMAGES SUBJECTS - COLOR - MEDIUM
import geographyYellowMedium from './assets/images/subjects_image/geography-yellow-small.png'
import artsOrangeMedium from './assets/images/subjects_image/arts-orange-medium.png'
import biologyGreenBlueMedium from './assets/images/subjects_image/biology-green-blue-medium.png'
import chemicalPinkMedium from './assets/images/subjects_image/chemical-pink-medium.png'
import englishPurpleMedium from './assets/images/subjects_image/english-purple-medium.png'
import grammarMarineBlueMedium from './assets/images/subjects_image/grammar-marine-blue-medium.png'
import historyYellowOrangeMedium from './assets/images/subjects_image/history-yellow-orange-medium.png'
import literatureGreenYellowMedium from './assets/images/subjects_image/literature-green-yellow-medium.png'
import mathematicsBlueMedium from './assets/images/subjects_image/mathematics-blue-medium.png'
import philosophyRedMedium from './assets/images/subjects_image/philosophy-red-medium.png'
import physicsPurplePinkMedium from './assets/images/subjects_image/physics-purple-pink-medium.png'
import sociologyRedPinkMedium from './assets/images/subjects_image/sociology-red-pink-medium.png'

// IMAGES SUBJECTS - COLOR - SQUARE

import geographyYellowSquare from './assets/images/subjects_image/geography-yellow-square.png'
import artsOrangeSquare from './assets/images/subjects_image/arts-orange-square.png'
import biologyGreenBlueSquare from './assets/images/subjects_image/biology-green-blue-square.png'
import chemicalPinkSquare from './assets/images/subjects_image/chemical-pink-square.png'
import englishPurpleSquare from './assets/images/subjects_image/english-purple-square.png'
import grammarMarineBlueSquare from './assets/images/subjects_image/grammar-marine-blue-square.png'
import historyYellowOrangeSquare from './assets/images/subjects_image/history-yellow-orange-square.png'
import literatureGreenYellowSquare from './assets/images/subjects_image/literature-green-yellow-square.png'
import mathematicsBlueSquare from './assets/images/subjects_image/mathematics-blue-square.png'
import philosophyRedSquare from './assets/images/subjects_image/philosophy-red-square.png'
import physicsPurplePinkSquare from './assets/images/subjects_image/physics-purple-pink-square.png'
import sociologyRedPinkSquare from './assets/images/subjects_image/sociology-red-pink-square.png'

export const subjects: string[] = [
    "Matemática", "Gramática", "Filosofia", "Inglês",
    "Sociologia", "História", "Física", "Química",
    "Biologia", "Artes", "Literatura", "Geografia"
]

export const subjectsImagesSmall: string[] = [
    mathematicsSmall, grammarSmall, philosophySmall, englishSmall,
    sociologySmall, historySmall, physicsSmall, chemicalSmall, 
    biologySmall, artsSmall, literatureSmall, geographySmall,
]

export const subjectsImagesMedium: string[] = [
    mathematicsBlueMedium, grammarMarineBlueMedium, philosophyRedMedium, englishPurpleMedium,
    sociologyRedPinkMedium, historyYellowOrangeMedium, physicsPurplePinkMedium, chemicalPinkMedium, 
    biologyGreenBlueMedium, artsOrangeMedium, literatureGreenYellowMedium, geographyYellowMedium,
]

export const subjectsImagesSquare: string[] = [
    mathematicsBlueSquare, grammarMarineBlueSquare, philosophyRedSquare, englishPurpleSquare,
    sociologyRedPinkSquare, historyYellowOrangeSquare, physicsPurplePinkSquare, chemicalPinkSquare,
    biologyGreenBlueSquare, artsOrangeSquare, literatureGreenYellowSquare, geographyYellowSquare
]

export const subjectColors: string[] = [
    "bg-blue-subject" , "bg-marine-blue-subject", "bg-red-subject", "bg-purple-pink-subject",
    "bg-red-pink-subject", "bg-yellow-orange-subject", "bg-purple-subject", "bg-pink-subject", 
    "bg-green-subject", "bg-orange-subject", "bg-green-yellow-subject", "bg-yellow-subject",
]

export const setColorSubject = (title: string): string => {
    title = title.toUpperCase()
    
    const index = subjects.findIndex(subjectOfList => title === subjectOfList.toUpperCase());
    console.log(index)
    if (index !== -1) {
        console.log(subjectColors[index])
        return subjectColors[index]
    }

    return ""
}

export function getImageSubject(subject: string, size: "small" | "medium" | "big" | "square" = "small"): string|null{
    
    const index = subjects.findIndex(subjectOfList => subject.toUpperCase() == subjectOfList.toUpperCase());

    if (index !== -1) {
        if (size === "medium") {
            return subjectsImagesMedium[index];
        }
        
        if (size === "big") {
            return "";
        }

        if (size === "square") {
            return subjectsImagesSquare[index];
        }
        
        return subjectsImagesSmall[index];
    }

    return null;
}

export function decodeStringUrl(text: string){
    const encodedString = text;
    const decodedString =  decodeURIComponent(encodedString)

    return decodedString
}

export function upperCaseFirstLetter(text: string){
    let letter = text.split('');
    letter[0] = letter[0].toUpperCase(); 
    
    return letter.join('');
}

export function getRoute(): string[]{
    try{
        let urlSplit:string[] = location.pathname.split("/");
        urlSplit.shift();

        if(urlSplit[0] != ''){
            return urlSplit
        }
        return ['home']    
    }catch{
        return ['home']    
    }
}

type Dictionary = { [key: string]: any };

export function quickSort<T extends Dictionary>(arr: T[], key: string): T[] {
    if (arr.length <= 1) {
        return arr;
    } else {
        let pivot: T = arr[Math.floor(arr.length / 2)];
        let left: T[] = arr.filter(x => x[key] < pivot[key]);
        let middle: T[] = arr.filter(x => x[key] === pivot[key]);
        let right: T[] = arr.filter(x => x[key] > pivot[key]);
        return [...quickSort(left, key), ...middle, ...quickSort(right, key)];
    }
}

export const states = {
    "SC" : "Santa Catarina",
    "RS" : "Rio Grande do Sul",
    "PR" : "Paraná",
    "SP" : "São Paulo",
    "MT" : "Mato Grosso",
    "MS" : "Mato Grosso do Sul",
    "RJ" : "Rio de Janeiro",
    "MG" : "Minas Gerais",
    "GO" : "Goiás",
    "DF" : "Distrito Federal",
    "ES" : "Espírito Santo",
    "BA" : "Bahia",
    "PE" : "Pernanbuco",
    "MA" : "Maranhão",
    "AL" : "Alagoas",
    "RN" : "Rio Grande do Norte",
    "PB" : "Paaraíba",
    "CE" : "Ceará",
    "SE" : "Sergipe",
    "PI" : "Piauí",
    "TO" : "Tocantins",
    "PA" : "Pará",
    "AP" : "Amapá",
    "RO" : "Rondônia",
    "RR" : "Roraima",
    "AM" : "Amazonas",
    "AC" : "Acre"
}