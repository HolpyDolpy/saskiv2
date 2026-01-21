import { useState } from 'react';
import BookPage from '@/components/BookPage';

type PageType = 'message' | 'photo';

interface Page {
  id: number;
  type: PageType;
  title?: string;
  content?: string;
  images?: string[];
  message?: string;
  isEditable?: boolean;
}

export default function Home() {
  const initialPages: Page[] = [
    {
      id: 1,
      type: 'message',
      title: 'Happy Birthday!',
      content: 'Click to add your opening message here...',
      isEditable: true,
    },
    {
      id: 2,
      type: 'photo',
      images: ['/images/63022464-206F-438C-A175-023E47CF47E1.jpg'],
      message: 'Click to add a message for this page...',
      isEditable: true,
    },
    {
      id: 3,
      type: 'photo',
      images: ['/images/81984757-197D-4EEE-B1F8-5952C1D12EE8.jpg'],
      message: 'Click to add a message for this page...',
      isEditable: true,
    },
    {
      id: 4,
      type: 'photo',
      images: ['/images/D9B9B793-31A0-4321-A1B0-6D0825BC0D5F.jpg'],
      message: 'Click to add a message for this page...',
      isEditable: true,
    },
    {
      id: 5,
      type: 'photo',
      images: ['/images/D9D075B5-DA0F-4313-86FD-20EA9A5936A5.jpg'],
      message: 'Click to add a message for this page...',
      isEditable: true,
    },
    {
      id: 6,
      type: 'photo',
      images: [''],
      message: 'Click to add a message for this page...',
      isEditable: true,
    },
    {
      id: 7,
      type: 'photo',
      images: [''],
      message: 'Click to add a message for this page...',
      isEditable: true,
    },
    {
      id: 8,
      type: 'message',
      title: 'Final Message',
      content: 'Click to add your closing message here...',
      images: [''],
      message: 'Add a photo here too!',
      isEditable: true,
    },
  ];

  const [pages, setPages] = useState<Page[]>(initialPages);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [editingPageId, setEditingPageId] = useState<number | null>(null);

  const handleUpdatePage = (pageId: number, updates: Record<string, any>) => {
    setPages(pages.map(p => p.id === pageId ? { ...p, ...updates } : p));
    setEditingPageId(null);
  };

  const handleNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const currentPage = pages[currentPageIndex];
  const nextPage = pages[currentPageIndex + 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-amber-50 p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-rose-900 mb-2">
            A Book of Love
          </h1>
          <p className="text-lg text-rose-700 font-handwritten">
            Click the pages to open and read
          </p>
        </div>

        {/* Book Container */}
        <div className="relative h-96 md:h-[500px] bg-gradient-to-b from-amber-100 to-amber-50 rounded-lg shadow-2xl overflow-hidden">
          <div className="flex h-full">
            {/* Left Page */}
            <div className="flex-1 border-r-8 border-amber-900 bg-white relative overflow-hidden">
              {currentPage && (
                <BookPage
                  page={currentPage}
                  isEditing={editingPageId === currentPage.id}
                  onEdit={() => setEditingPageId(currentPage.id)}
                  onUpdate={(updates) => handleUpdatePage(currentPage.id, updates)}
                  onCancelEdit={() => setEditingPageId(null)}
                />
              )}
            </div>

            {/* Right Page */}
            <div className="flex-1 bg-white relative overflow-hidden">
              {nextPage && (
                <BookPage
                  page={nextPage}
                  isEditing={editingPageId === nextPage.id}
                  onEdit={() => setEditingPageId(nextPage.id)}
                  onUpdate={(updates) => handleUpdatePage(nextPage.id, updates)}
                  onCancelEdit={() => setEditingPageId(null)}
                />
              )}
            </div>
          </div>

          {/* Book Spine Shadow */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPageIndex === 0}
            className="px-6 py-2 bg-rose-900 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-800 transition-colors font-serif"
          >
            ← Previous
          </button>

          <div className="text-center">
            <p className="text-sm text-rose-700 font-serif">
              Page {currentPageIndex + 1} of {pages.length}
            </p>
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPageIndex === pages.length - 1}
            className="px-6 py-2 bg-rose-900 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-800 transition-colors font-serif"
          >
            Next →
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-sm text-rose-600 font-serif">
          <p>💝 Click on any text or message to edit it and personalize this book for your loved one</p>
        </div>
      </div>
    </div>
  );
}
