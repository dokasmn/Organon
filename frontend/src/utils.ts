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

// SMALL SUBJECT IMAGES

import GeographySmall from "./assets/images/subjects_image/geography-small.png";
import PhysicsSmall from "./assets/images/subjects_image/physics-small.png"
import MathmaticsSmall from "./assets/images/subjects_image/mathematics-small.png"
import HistorySmall from "./assets/images/subjects_image/history-small.png"
import PhilosophySmall from "./assets/images/subjects_image/philosophy-small.png"
import GrammarSmall from "./assets/images/subjects_image/grammar-small.png"
import LiteratureSmall from "./assets/images/subjects_image/literature-small.png"
import EnglishSmall from "./assets/images/subjects_image/english-small.png"
import ChemicalSmall from "./assets/images/subjects_image/chemical-small.png"
import SociologySmall from "./assets/images/subjects_image/sociology-small.png"
import ArtsSmall from "./assets/images/subjects_image/arts-small.png"
import BiologySmall from "./assets/images/subjects_image/biology-small.png"

export const subjects: string[] = [
    "Matemática", "Gramática", "Filosofia", "Inglês",
    "Sociologia", "História", "Física", "Química",
    "Biologia", "Artes", "Literatura", "Geografia"
]

export const subjectsDict = {
    "Matemática":"Matemática",
    "Gramática":"Gramática",
    "Filosofia":"Filosofia",
    "Inglês":"Inglês",
    "Sociologia":"Sociologia",
    "História":"História",
    "Física":"Física",
    "Química":"Química",
    "Biologia":"Biologia",
    "Artes":"Artes", 
    "Literatura":"Literatura",
    "Geografia":"Geografia"
}

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
    if (index !== -1) {
        return subjectColors[index]
    }

    return "bg-gray-1 bg-opacity-30"
}

export function getSubjectImage(subject:string): any {
    if (subject == "Geografia"){
        return GeographySmall
    }
    if (subject == "Física"){
        return PhysicsSmall
    }
    if (subject == "Matemática"){
        return MathmaticsSmall
    }
    if (subject == "Biologia"){
        return BiologySmall
    }
    if (subject == "Literatura"){
        return LiteratureSmall
    }
    if (subject == "Gramática"){
        return GrammarSmall
    }
    if (subject == "Artes"){
        return ArtsSmall
    }
    if (subject == "Inglês"){
        return EnglishSmall
    }
    if (subject == "História"){
        return HistorySmall
    }
    if (subject == "Sociologia"){
        return SociologySmall
    }
    if (subject == "Filosofia"){
        return PhilosophySmall
    }
    if (subject == "Quimica"){
        return ChemicalSmall
    }
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

export const listObjectsToComboBox = (list: any[], field: string) => {
    let dict: {[key: string]: string} = {};
    
    list.map((item) => {
        dict[`${item[`${field}`]}`] = item[`${field}`];
    })

    return dict;
}   

export const professions = {
'adm': 'Administrador',
'adv': 'Advogado',
'agr': 'Agrônomo',
'ana_cred': 'Analista de Crédito',
'ana_inv': 'Analista de Investimentos',
'ana_log': 'Analista de Logística',
'ana_mark': 'Analista de Marketing',
'ana_neg': 'Analista de Negócios',
'ana_rh': 'Analista de Recursos Humanos',
'ana_sis': 'Analista de Sistemas',
'ana_fin': 'Analista Financeiro',
'ant': 'Antropólogo',
'arq': 'Arquiteto',
'art': 'Artesão',
'ass_adm': 'Assistente Administrativo',
'ass_com': 'Assistente Comercial',
'ass_atend': 'Assistente de Atendimento',
'ass_compras': 'Assistente de Compras',
'ass_contab': 'Assistente de Contabilidade',
'ass_mark': 'Assistente de Marketing',
'ass_rh': 'Assistente de Recursos Humanos',
'ass_jur': 'Assistente Jurídico',
'ass_soc': 'Assistente Social',
'ast': 'Astrônomo',
'aten': 'Atendente',
'aud': 'Auditor',
'aux_adm': 'Auxiliar Administrativo',
'aux_almox': 'Auxiliar de Almoxarifado',
'aux_contab': 'Auxiliar de Contabilidade',
'aux_cozinha': 'Auxiliar de Cozinha',
'aux_escrit': 'Auxiliar de Escritório',
'aux_limp': 'Auxiliar de Limpeza',
'aux_prod': 'Auxiliar de Produção',
'aux_serv': 'Auxiliar de Serviços Gerais',
'bab': 'Babá',
'bib': 'Bibliotecário',
'bio': 'Biólogo',
'caixa': 'Caixa',
'carp': 'Carpinteiro',
'chef': 'Chef de Cozinha',
'comp': 'Comprador',
'cons': 'Consultor',
'cont': 'Contador',
'coor_rh': 'Coordenador de Recursos Humanos',
'coor_mark': 'Coordenador de Marketing',
'coor_vend': 'Coordenador de Vendas',
'cor_imv': 'Corretor de Imóveis',
'design': 'Designer',
'desenv_sis': 'Desenvolvedor de Sistemas',
'desenv_web': 'Desenvolvedor Web',
'dir_geral': 'Diretor Geral',
'dir_mark': 'Diretor de Marketing',
'dir_fin': 'Diretor Financeiro',
'dir_tec': 'Diretor Técnico',
'econ': 'Economista',
'educ': 'Educador',
'eletr': 'Eletricista',
'eng_civil': 'Engenheiro Civil',
'eng_eletr': 'Engenheiro Eletricista',
'eng_mec': 'Engenheiro Mecânico',
'eng_prod': 'Engenheiro de Produção',
'eng_quim': 'Engenheiro Químico',
'enferm': 'Enfermeiro',
'entrev': 'Entrevistador',
'escr': 'Escritor',
'esp_educ': 'Especialista em Educação',
'esp_tec': 'Especialista Técnico',
'estat': 'Estatístico',
'estud': 'Estudante',
'farm': 'Farmacêutico',
'fisio': 'Fisioterapeuta',
'fotog': 'Fotógrafo',
'garcom': 'Garçom',
'geog': 'Geógrafo',
'ger_proj': 'Gerente de Projetos',
'ger_vend': 'Gerente de Vendas',
'histor': 'Historiador',
'jard': 'Jardineiro',
'jorn': 'Jornalista',
'lavr': 'Lavrador',
'logist': 'Logístico',
'manut': 'Mecânico de Manutenção',
'marc': 'Marceneiro',
'mec': 'Mecânico',
'med': 'Médico',
'mercad': 'Merchandiser',
'model': 'Modelo',
'mot': 'Motorista',
'nutr': 'Nutricionista',
'odont': 'Odontologista',
'pedag': 'Pedagogo',
'pesq': 'Pesquisador',
'pint': 'Pintor',
'pol': 'Policial',
'port': 'Porteiro',
'prod': 'Produtor',
'prof': 'Professor',
'psic': 'Psicólogo',
'publ': 'Publicitário',
'recepc': 'Recepcionista',
'redat': 'Redator',
'seg_trab': 'Segurança do Trabalho',
'serv_ger': 'Servente Geral',
'sist_info': 'Sistema de Informação',
'soc_civ': 'Sociólogo',
'tecn': 'Técnico',
'telec': 'Telecomunicador',
'terap': 'Terapeuta',
'trad': 'Tradutor',
'trein': 'Treinador',
'vig': 'Vigilante',
'zel': 'Zelador',
'zoot': 'Zootecnista',
}
