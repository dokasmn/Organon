// IMAGES
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

export const subjectColors: string[] = [
    "bg-blue-subject" , "bg-marine-blue-subject", "bg-red-subject", "bg-purple-pink-subject",
    "bg-red-pink-subject", "bg-yellow-orange-subject", "bg-purple-subject", "bg-pink-subject", 
    "bg-green-subject", "bg-orange-subject", "bg-green-yellow-subject", "bg-yellow-subject",
]

export const setColorSubject = (title: string): string => {
    title = title.toUpperCase()

    const index = subjects.findIndex(subjectOfList => title === subjectOfList.toUpperCase());

    if (index !== -1) {
        return subjectColors[index]
    }

    return ""
}

export function getImageSubject(subject: string, size: "small" | "medium" | "big" = "small"): string|null{
    const index = subjects.findIndex(subjectOfList => subject === subjectOfList.toUpperCase());

    if (index !== -1) {
        if (size === "medium") {
            return subjectsImagesMedium[index];
        }
        if (size === "big") {
            return "";
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