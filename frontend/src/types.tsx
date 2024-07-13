import { ReactNode } from "react"
import SliderContent from "./components/items/sliders/SliderContent"

export interface SliderContentInterface {
    "contentSubject": string;
    "contentName": string;
    "contentDate": string;
    "contentImage": any;
  }

export type note = {
    "color": string, 
    "title": string, 
    "text": string | ReactNode, 
    "subject": string,
    "content": string
} 

export type slidesContent = {
    "contentSubject": string,
    "contentName": string,
    "contentDate": string,
    "contentImage": any
}