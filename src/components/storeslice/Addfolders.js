import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export const Addfolders = createSlice({
  name: "Folders",
  initialState: [],
  reducers: {
    //  Add a new folder
    addfolder: (state, action) => {
      state.push({
        id: nanoid(),
        ...action.payload,
        videos: [],
        documents: [],
        liveVideo: [],
        // Add other types later (images, zip files, etc.)
      });
    },

    //  Add video to a specific folder
    addVideoToFolder: (state, action) => {
      const { folderId, videoData } = action.payload;

      // Fix: state is already an array of folders
      const folder = state.find(folder => folder.id === folderId);

      if (folder) {
        if (!folder.videos) {
          folder.videos = [];
        }
        folder.videos.push(videoData);
      } else {
        console.warn(`Folder with id ${folderId} not found`);
      }
    },

    // add live videos
    addliveVideoToFolder: (state, action) => {
      const { folderId, livedata } = action.payload;

      // Fix: state is already an array of folders
      const folder = state.find(folder => folder.id === folderId);

      if (folder) {
        if (!folder.liveVideo) {
          folder.liveVideo = [];
        }
        folder.liveVideo.push(livedata);
      } else {
        console.warn(`Folder with id ${folderId} not found`);
      }
    },

    //  Add document to a specific folder
    addDocumentToFolder: (state, action) => {
      const { folderId, docData } = action.payload;

      const folder = state.find(folder => folder.id === folderId);

      if (folder) {
        if (!folder.documents) {
          folder.documents = [];
        }
        folder.documents.push(docData);
      } else {
        console.warn(`Folder with id ${folderId} not found`);
      }
    }

    //  You can add more reducers: images, zipFiles, tests, etc.
  },
});

export const {
  addfolder,
  addVideoToFolder,
  addDocumentToFolder,
  addliveVideoToFolder,
} = Addfolders.actions;

export default Addfolders.reducer;



// import { createSlice } from "@reduxjs/toolkit";
// import { nanoid } from "nanoid";

// export const Addfolders = createSlice({
//   name: "Folders",
//   initialState: [],
//   reducers: {
//     addfolder: (state, action) => {
//       state.push({ id: nanoid(), ...action.payload });
//     }
    
//   },
// });

// export const { addfolder} = Addfolders.actions;
// export default Addfolders.reducer;