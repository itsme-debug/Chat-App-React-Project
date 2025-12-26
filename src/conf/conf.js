const conf = {
    appWrite_EndPoint : String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appWrite_ProjectName : String(import.meta.env.VITE_APPWRITE_PROJECT_NAME),
    appWrite_ProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWrite_DatabaseID: String(import.meta.env.VITE_APPWRITE_DatabaseID),
    appWrite_CollectionID : String(import.meta.env.VITE_APPWRITE_CollectionID),
}

export default conf