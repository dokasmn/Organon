import { ReactNode } from "react"
import SliderContent from "./components/items/sliders/SliderContent"

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

export type slidesContent = {
    content_description:string,
    content_id:number,
    content_name:string,
    content_pdf:string,
    content_position:number,
    content_professor_user:string,
    content_subject: string,
    content_video: string,
}

export type noteContent = {
    id: string,
    note_content: { note_content: string; subject_id: string, subject: string };
    note_text: string;
    note_title: string;
  };