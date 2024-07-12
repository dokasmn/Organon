import { ReactNode } from "react"

export interface SliderContentInterface{
    "subject":string, 
    "content":string,
    "date":string, 
    "image":string,
} 

export type note = {
    color: string, 
    title: string, 
    text: string | ReactNode, 
    subject: string,
    content: string
} 