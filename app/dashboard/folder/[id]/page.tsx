"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { doc, DocumentReference, Firestore, getDoc } from "firebase/firestore";
import Documents from "../../../../components/Documents";
import { UserAuth } from "../../../authContext";
import { useSession } from "next-auth/react";
import { db } from "../../../../firebase";
import Title from "../../../../components/Title";
import NewModal from "../../../../components/NewModal";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const FolderPage = ({}: Props) => {
  const pathname = usePathname();
  const { showModal, setShowModal, getFoldersDocuments, id } = UserAuth();
  const { data: session } = useSession();
  const [documents, setDocuments] = useState<any>(null);
  const [folder, setFolder] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [warningAlert, setWarningAlert] = React.useState(false);

  useEffect(() => {
    setIsClient(true);
    fetchDocs();
  }, []);

   const handleClose = () => {
    setShowModal(false);
    setWarningAlert(false);
  };

  const inputRef = React.useRef();

  async function fetchDocs() {
    let docs: any[] = []
    if (pathname) {
        const queryId = pathname.substring(pathname.lastIndexOf("/") + 1);
        const uid = id
        const docRef = await getDoc(
          doc(db, "users", uid, "folders", queryId.toString()),
        );
        const docData = await docRef.data();
        if (docData) {
            setFolder(docData);
            for (let i in docData?.documents){
              console.log('docData', docData)
              console.log(docData?.documents[i])
              const newdocRef = await getDoc(doc(db, "users", uid, "documents", docData?.documents[i]));
              const newdocData = newdocRef.data();
              docs.push(newdocData)
            }
            setDocuments(docs)
        }
    }
        
  }

  return (
    <>
      {!isClient || !folder ? (
        "This is never prerendered"
      ) : (
        <>
          <div className="flex w-full h-full">
            <div className="grow w-full">
              <Title
                id={id}
                showModal={showModal}
                setShowModal={setShowModal}
                button={"Folder Doc"}
                title={`Folder: ${folder.name || 'No Name'}`}
                session={session}
                path={pathname?.substring(pathname?.lastIndexOf("/") + 1)}
                data={inputRef}
              />
              <main className="flex flex-col h-full items-center mx-auto">
                <nav className="bg-grey-light p-3 rounded font-sans w-full m-4">
                  <ol className="list-reset flex text-grey-dark">
                      <li><a href="/dashboard/documents" className="text-blue font-bold">Folders</a></li>
                      <li><span className="mx-2">/</span></li>
                      <li>Folder: {folder.name || 'No Name'}</li>
                  </ol>
                </nav>
                <div>
                  <button>edit</button>
                  <button>delete</button>
                </div>
                <div>Filter</div>
                <div>Pagination</div>
                <Documents
                  setShowModal={setShowModal}
                  documents={documents}
                  session={session}
                />
              </main>
            </div>
          </div>
          <>
          {showModal ? (
            <NewModal
              session={session}
              inputRef={inputRef}
              handleClose={handleClose}
              showModal={showModal}
              setShowModal={setShowModal}
              warningAlert={warningAlert}
              setWarningAlert={setWarningAlert}
            />
          ) : null}
      </>
        </>
      )}
    </>
  );
};

export default FolderPage;