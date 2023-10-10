// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";
import React from "react";
import Image from "next/image";
import { GrDocument } from "react-icons/gr";
import { collection, query, orderBy } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { Folder } from "./(components)/components";
import Title from "../../../components/Title";
import NewModal from "../../../components/NewModal";
import { UserAuth } from "../../authContext";

function Folders() {
  const { showModal, setShowModal, firebaseUser, folders, id } = UserAuth();
  const [warningAlert, setWarningAlert] = React.useState(false);

  const handleClose = () => {
    setShowModal(false);
    setWarningAlert(false);
  };

  const inputRef = React.useRef();

  return (
    <>
      <Title
        id={id}
        showModal={showModal}
        setShowModal={setShowModal}
        button="Folders"
        title="Folders"
      />
      <section>
        <div className="flex flex-col items-center {} dark:bg-night-blue p-5">
          <div className="flex flex-col items-center  ">
            {folders.length === 0 && (
              <Image
                  width={600}
                  height={600}
                  src="/folder.jpg"
                  alt="folders"
                  className="object-contain py-5 text-gray-400"
                />
            )}
          </div>
          <div className="flex flex-row flex-wrap w-full">
            {folders.map((folder) => (
              <Folder
                folders={folders}
                key={folder.id}
                folder={folder}
              />
            ))}
          </div>
        </div>
      </section>
      {showModal ? (
          <NewModal
            session={firebaseUser}
            inputRef={inputRef}
            handleClose={handleClose}
            showModal={showModal}
            setShowModal={setShowModal}
            warningAlert={warningAlert}
            setWarningAlert={setWarningAlert}
          />
        ) : null}
    </>
  );
}

export default Folders;