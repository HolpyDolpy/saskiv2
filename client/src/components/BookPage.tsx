import { useState } from 'react';

interface BookPageProps {
  page: {
    id: number;
    type: 'message' | 'photo';
    title?: string;
    content?: string;
    images?: string[];
    message?: string;
    isEditable?: boolean;
  };
  isEditing: boolean;
  onEdit: () => void;
  onUpdate: (updates: Record<string, any>) => void;
  onCancelEdit: () => void;
}

export default function BookPage({
  page,
  isEditing,
  onEdit,
  onUpdate,
  onCancelEdit,
}: BookPageProps) {
  const [editContent, setEditContent] = useState(page.content || page.message || '');
  const [editTitle, setEditTitle] = useState(page.title || '');

  const handleSave = () => {
    if (page.type === 'message') {
      onUpdate({ title: editTitle, content: editContent });
    } else {
      onUpdate({ message: editContent });
    }
  };

  if (page.type === 'message') {
    return (
      <div
        className="h-full p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-rose-50/50 transition-colors relative"
        onClick={() => !isEditing && onEdit()}
      >
        {/* Vintage tape decoration */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-100 opacity-60 rounded-sm shadow-md transform -rotate-3" />

        {isEditing ? (
          <div className="w-full max-w-md space-y-4">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full text-3xl font-bold text-rose-900 text-center bg-transparent border-b-2 border-rose-400 focus:outline-none focus:border-rose-600"
              placeholder="Enter title..."
              autoFocus
            />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full h-32 text-base text-rose-800 text-center bg-transparent border-2 border-rose-300 rounded p-3 focus:outline-none focus:border-rose-600 resize-none"
              placeholder="Enter your message..."
            />
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition-colors text-sm font-serif"
              >
                Save
              </button>
              <button
                onClick={onCancelEdit}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors text-sm font-serif"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-4xl font-bold text-rose-900 mb-6">{page.title}</h2>
            <p className="text-base text-rose-800 leading-relaxed max-w-sm">{page.content}</p>
            {page.images && page.images.length > 0 && page.images[0] && (
              <div className="mt-6 relative">
                <div className="bg-white p-3 shadow-lg transform -rotate-2">
                  <img
                    src={page.images[0]}
                    alt="Memory"
                    className="h-32 w-auto object-cover rounded-sm"
                  />
                </div>
              </div>
            )}
            {page.images && page.images.length > 0 && !page.images[0] && (
              <div className="mt-6 relative">
                <div className="bg-white p-3 shadow-lg transform -rotate-2 border-2 border-dashed border-rose-300 flex items-center justify-center h-32 w-24">
                  <span className="text-rose-400 text-xs text-center">Add photo</span>
                </div>
              </div>
            )}
            <p className="text-xs text-rose-400 mt-8 font-handwritten">Click to edit</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      className="h-full p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-amber-50/30 transition-colors relative overflow-hidden"
      onClick={() => !isEditing && onEdit()}
    >
      {/* Vintage tape decorations */}
      <div className="absolute top-3 left-4 w-12 h-5 bg-amber-100 opacity-60 rounded-sm shadow-md transform -rotate-12" />
      <div className="absolute top-3 right-4 w-12 h-5 bg-amber-100 opacity-60 rounded-sm shadow-md transform rotate-12" />

      {/* Photo */}
      {page.images && page.images.length > 0 && page.images[0] && (
        <div className="mb-4 relative">
          <div className="bg-white p-3 shadow-lg transform -rotate-2">
            <img
              src={page.images[0]}
              alt="Memory"
              className="h-40 w-auto object-cover rounded-sm"
            />
          </div>
        </div>
      )}
      {page.images && page.images.length > 0 && !page.images[0] && (
        <div className="mb-4 relative">
          <div className="bg-white p-3 shadow-lg transform -rotate-2 border-2 border-dashed border-rose-300 flex items-center justify-center h-40 w-32">
            <span className="text-rose-400 text-sm text-center">Add photo here</span>
          </div>
        </div>
      )}

      {/* Message */}
      {isEditing ? (
        <div className="w-full max-w-xs space-y-3">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full h-20 text-sm text-rose-800 bg-transparent border-2 border-rose-300 rounded p-2 focus:outline-none focus:border-rose-600 resize-none"
            placeholder="Add your message..."
            autoFocus
          />
          <div className="flex gap-2 justify-center">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-rose-600 text-white rounded hover:bg-rose-700 transition-colors text-xs font-serif"
            >
              Save
            </button>
            <button
              onClick={onCancelEdit}
              className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors text-xs font-serif"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-sm text-rose-800 leading-relaxed max-w-xs font-serif">
            {page.message}
          </p>
          <p className="text-xs text-rose-400 mt-4 font-handwritten">Click to add message</p>
        </div>
      )}
    </div>
  );
}
