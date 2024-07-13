import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axiosInstance from '../axiosConfig';

// COMPONENTS
import TitleSection from '../components/layout/TitleSection';
import BottomNavigationBar from '../components/layout/BottomNavigationBar';
import SliderSubjectNotes from '../components/items/sliders/SliderSubjectNotes';
import Note from '../components/items/cards/Note';
import TopNavigationBar from '../components/layout/TopNavigationBar';
import HorizontalLine from '../components/items/texts/HorizontalLine';
import PopUpCreateNote from '../components/popups/PopUpCreateNote';
import PopUpEditNote from '../components/popups/PopUpEditNote';

// HOOKS
import { useLoading } from '../contexts/LoadingContext';
import { useAuth } from '../contexts/AuthContext';
import useShowError from '../hooks/useShowError';

// UTILS
import { subjects } from '../utils';

// IMAGES
import { IoAddCircleOutline } from 'react-icons/io5';

// TYPES
import { noteContent } from '../types';

const Notes: React.FC = () => {
  const { showError, showUnespectedResponse } = useShowError();
  const [showCreateNotePopup, setShowCreateNotePopup] = useState<boolean>(false);
  const [showEditNotePopUp, setshowEditNotePopUp] = useState<boolean>(false);
  const { user } = useAuth();
  const { setShowLoading } = useLoading();
  const [currentNote, setCurrentNote] = useState({
    id: '',
    color: '',
    title: '',
    text: '',
    subject: '',
    isCreateFromNote: false,
  });

  const [notesOfUser, setNotesOfUser] = useState<noteContent[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(2);
  const [fetchMore, setFetchMore] = useState<boolean>(true);
  const [subjectFilter, setSubjectFilter] = useState<string>('default')

  useEffect(() => {
    
    console.log(subjectFilter)
    const fetchDataNotes = async () => {
      try {
        setShowLoading(true);
        const response = await axiosInstance.get(`perfil/note/?page=${page}${subjectFilter != 'default' && subjectFilter != 'sem filtro' ? `&note_content__content_subject=${subjectFilter}`:''}`, {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        });
        setShowLoading(false);

        if (response.status === 200) {
          const notesList: noteContent[] = response.data.results;
          const count = response.data.count;
          const totalPages = Math.ceil(count / 10);
          console.log(response.data.results)
          setMaxPage(totalPages);

          if(subjectFilter != 'default'){
            setNotesOfUser(notesList);
          }
          else if (page <= totalPages ) {
            
            setNotesOfUser((prevNotes) => {
              const newNotes = notesList.filter(newNote => (
                !prevNotes.some(existingNote => existingNote.id === newNote.id)
              ));

              return [...prevNotes, ...newNotes];
            });

            if (response.data.next) {
              setPage((prevPage) => prevPage + 1);
            } else {
              setFetchMore(false);
            }
          }
        } else {
          showUnespectedResponse(response);
        }
      } catch (error: any) {
        showError(error);
      }
    };

    if ((fetchMore && page <= maxPage) || subjectFilter != 'default' ) {
      fetchDataNotes();
    }
  }, [page, fetchMore, subjectFilter]);

  const createNote = (note: any) => {
    setShowCreateNotePopup(true);
    setCurrentNote({
      id: '',
      color: note.color,
      title: note.title,
      text: '',
      subject: note.subject,
      isCreateFromNote: true,
    });
  };

  const editNote = (note: noteContent, id: string) => {
    setCurrentNote({
      id: id,
      color: note.note_content.subject,
      title: note.note_title,
      text: note.note_text,
      subject: note.note_content.subject,
      isCreateFromNote: false,
    });
    setshowEditNotePopUp(true);
  };

  return (
    <div className="sm:flex justify-center">
      {showCreateNotePopup && (
        <PopUpCreateNote
          onClose={() => setShowCreateNotePopup(false)}
          noteContent={currentNote.subject}
          isCreateFromNote={currentNote.isCreateFromNote}
        />
      )}
      {showEditNotePopUp && (
        <PopUpEditNote
          onClose={() => setshowEditNotePopUp(false)}
          noteText={currentNote.text}
          noteTitle={currentNote.title}
          noteId={currentNote.id}
        />
      )}
      <TopNavigationBar />
      <main className="xs:px-14 md:pt-32 md:px-5 max-w-160 sm:min-w-160 md:max-w-6xl">
        <section className="px-5 xs:px-0">
          <TitleSection title="CONTENTS" />
        </section>
        <div className="md:px-5">
          <SliderSubjectNotes returnSubjectId={(id: string) => {setSubjectFilter(id)}}/>
          <HorizontalLine style="hidden md:block mt-7 max-w-160 md:max-w-6xl mb-5" />
        </div>

        <section className="flex justify-center md:px-5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 lg:gap-5 md:w-full">
            <Note
              title="Criar Anotação"
              text={<IoAddCircleOutline className="text-2xl text-gray-2" />}
              subject=""
              key={uuidv4()}
              onClick={() => createNote({ color: '', title: 'Nova Anotação', text: '', subject: '' })}
            />
            {notesOfUser.map((note, index) => (
              <Note
                title={note.note_title}
                text={note.note_text}
                subject={note.note_content.subject}
                content={note.note_content.note_content}
                key={uuidv4()}
                onClick={() => editNote(note, note.id)}
              />
            ))}
          </div>
        </section>
      </main>
      <BottomNavigationBar />
    </div>
  );
};

export default Notes;
