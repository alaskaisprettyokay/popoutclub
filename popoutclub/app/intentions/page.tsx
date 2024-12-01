'use client';
import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../firebaseConfig';
import { doc, getDoc, setDoc, collection, addDoc } from 'firebase/firestore';
import { ref, uploadString } from 'firebase/storage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const IntentionsPage: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData?.name || ''); // Set the user's name
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserName();
  }, []);

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        // Define the file type and path
        const fileType = 'text/plain'; // MIME type for plain text
        const fileExtension = '.txt'; // File extension for text files
        const storagePath = `intentions/${user.uid}/${Date.now()}${fileExtension}`;
        
        console.log('Storage Path:', storagePath); // Debugging: Check the storage path
        const storageRef = ref(storage, storagePath);
        
        // Upload the content with the specified MIME type
        await uploadString(storageRef, content, 'raw', { contentType: fileType });

        // Add a new document to the Firestore intentions collection without the content field
        await addDoc(collection(db, 'intentions'), {
          userId: user.uid,
          isPrivate,
          createdAt: new Date(),
        });

        alert('Intention saved successfully!');
        setContent(''); // Clear the editor
      } catch (error) {
        console.error('Error saving intention:', error);
      }
    } else {
      alert('Please log in first.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Intentions Page</h1>
      <p>
        Please set your intentions for 2025, {userName ? userName : 'Guest'}.
      </p>
      <div className="w-full max-w-2xl mt-8">
        <ReactQuill theme="snow" value={content} onChange={setContent} />
        <div className="flex items-center mt-4">
          <label className="mr-2">Private:</label>
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={() => setIsPrivate(!isPrivate)}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default IntentionsPage;