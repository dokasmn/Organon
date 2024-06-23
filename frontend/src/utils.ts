// IMAGES
import geographySmall from './assets/images/subjects_image/geography-yellow-small.png'
import artsSmall from './assets/images/subjects_image/arts-orange-small.png'
import biologySmall from './assets/images/subjects_image/biology-green-blue-small.png'
import chemicalSmall from './assets/images/subjects_image/chemical-pink-small.png'
import englishSmall from './assets/images/subjects_image/english-purple-small.png'
import grammarSmall from './assets/images/subjects_image/grammar-marine-blue-small.png'
import historySmall from './assets/images/subjects_image/history-yellow-small.png'
import literatureSmall from './assets/images/subjects_image/literature-green-yellow-small.png'
import mathematicsSmall from './assets/images/subjects_image/math-blue-small.png'
import philosophySmall from './assets/images/subjects_image/philosophy-red-small.png'
import physicsSmall from './assets/images/subjects_image/philosophy-red-small.png'
import sociologySmall from './assets/images/subjects_image/sociology-red-pink-small.png'

export const subjects: string[] = [
    "Matemática", "Gramática", "Filosofia", "Inglês",
    "Sociologia", "História", "Física", "Química",
    "Biologia", "Artes", "Literatura", "Geografia"
]

export const setColorSubject = (title: string): string => {
    let color: string = "bg-red-subject";

    if(title === "Matemática"){
        color = "bg-blue-subject" 
    }
    
    if(title === "Biologia"){
        color = "bg-green-subject" 
    }
    
    if(title === "Física"){
        color = "bg-purple-subject" 
    }
    
    if(title === "Geografia"){
        color = "bg-yellow-subject" 
    }
    
    if(title === "História"){
        color = "bg-yellow-orange-subject" 
    } 
    
    if(title === "Química"){
        color = "bg-pink-subject" 
    }
    
    if(title === "Gramática"){
        color = "bg-marine-blue-subject" 
    }
    
    if(title === "Artes"){
        color = "bg-orange-subject" 
    }
    
    if(title === "Literatura"){
        color = "bg-green-yellow-subject" 
    }
    
    if(title === "Inglês"){
        color = "bg-purple-pink-subject" 
    }
    
    if(title === "Sociologia"){
        color = "bg-red-pink-subject" 
    }

    return color
}

export function getImageSubject(subject: string): string|null{
    let image: string|null = null;

    if (subject === "FILOSOFIA" ){
        image = philosophySmall;
    }

    if(subject === "MATEMÁTICA"){
        image = mathematicsSmall 
    }
    
    if(subject === "BIOLOGIA"){
        image = biologySmall 
    }
    
    if(subject === "FÍSICA"){
        image = physicsSmall 
    }
    
    if(subject === "GEOGRAFIA"){
        image = geographySmall 
    }
    
    if(subject === "HISTÓRIA"){
        image = historySmall
    } 
    
    if(subject === "QUÍMICA"){
        image = chemicalSmall 
    }
    
    if(subject === "GRAMÁTICA"){
        image = grammarSmall 
    }
    
    if(subject === "ARTES"){
        image = artsSmall
    }
    
    if(subject === "LITERATURA"){
        image = literatureSmall 
    }
    
    if(subject === "INGLÊS"){
        image = englishSmall 
    }
    
    if(subject === "SOCIOLOGIA"){
        image = sociologySmall 
    }

    if(image){
        return image
    }
    return null
}