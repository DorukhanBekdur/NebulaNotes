const NoteFilters = ({ searchQuery, setSearchQuery, folderFilter, setFolderFilter, tagFilter, setTagFilter }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notes..."
          className="p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          type="text"
          value={folderFilter}
          onChange={(e) => setFolderFilter(e.target.value)}
          placeholder="Filter by folder..."
          className="p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          type="text"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          placeholder="Filter by tag..."
          className="p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
    );
  };
  
  export default NoteFilters;
  