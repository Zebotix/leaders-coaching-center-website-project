'use client';
import React, { useMemo, useState } from 'react';
import { RESOURCES, Resource, ClassLevel, ResourceKind } from '@/lib/data/resources';
import { toast } from 'sonner';

const CLASS_OPTIONS: ('All' | ClassLevel)[] = ['All', '9th', '10th', '11th', '12th'];
const KIND_OPTIONS: ('All' | ResourceKind)[] = ['All', 'document', 'image', 'video', 'link'];

export default function Resources() {
  const [classFilter, setClassFilter] = useState<(typeof CLASS_OPTIONS)[number]>('All');
  const [kindFilter, setKindFilter] = useState<(typeof KIND_OPTIONS)[number]>('All');
  const [query, setQuery] = useState('');
  const [showCount, setShowCount] = useState(6); // load more
  const [preview, setPreview] = useState<{
    kind: ResourceKind;
    url: string;
    title?: string;
  } | null>(null);

  const filtered = useMemo(() => {
    return RESOURCES.filter((r) => {
      if (classFilter !== 'All' && !r.classes.includes(classFilter as ClassLevel)) return false;
      if (kindFilter !== 'All' && r.kind !== kindFilter) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (
          !r.title.toLowerCase().includes(q) &&
          !(r.description || '').toLowerCase().includes(q) &&
          !r.category.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [classFilter, kindFilter, query]);

  const visible = filtered.slice(0, showCount);

  return (
    <section id='resources' className='py-16 px-6 shadow-sm bg-linear-to-b from-blue-50 to-white'>
      <div className='max-w-6xl mx-auto'>
        <header className='mb-6'>
          <h2 className='text-2xl font-bold text-slate-800'>Resources</h2>
          <p className='text-sm text-slate-600'>
            Past papers, notes, videos and useful links — organized by class & type.
          </p>
        </header>

        {/* Filters */}
        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center mb-6'>
          <div className='flex items-center gap-2'>
            <label className='text-sm text-slate-700'>Class:</label>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value as any)}
              className='border rounded px-3 py-1 text-sm'
            >
              {CLASS_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className='flex items-center gap-2'>
            <label className='text-sm text-slate-700'>Type:</label>
            <select
              value={kindFilter}
              onChange={(e) => setKindFilter(e.target.value as any)}
              className='border rounded px-3 py-1 text-sm'
            >
              {KIND_OPTIONS.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>

          <div className='flex-1'>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search title, description or category...'
              className='w-full border rounded px-3 py-1 text-sm'
            />
          </div>

          <div className='text-sm text-slate-600'>
            <strong>{filtered.length}</strong> results
          </div>
        </div>

        {/* Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {visible.map((r) => (
            <article key={r.id} className='border rounded-lg p-4 bg-white shadow-sm flex flex-col'>
              <div className='flex items-start gap-3'>
                <TypeIcon kind={r.kind} />
                <div className='flex-1'>
                  <h3 className='font-semibold text-slate-800'>{r.title}</h3>
                  <p className='text-xs text-slate-600 mt-1'>{r.description}</p>
                </div>
              </div>

              <div className='mt-3 flex flex-wrap items-center gap-2'>
                {r.classes.map((c) => (
                  <span key={c} className='text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded'>
                    {c}
                  </span>
                ))}
                <span className='text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded'>
                  {r.category}
                </span>
                {r.featured && (
                  <span className='text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded'>
                    Featured
                  </span>
                )}
              </div>

              <div className='mt-4 flex items-center gap-2'>
                {/* Primary action depends on type */}
                {r.kind === 'document' && (
                  <a
                    href={r.url}
                    download={r.filename || undefined}
                    target='_blank'
                    rel='noreferrer'
                    className='inline-block px-3 py-1 text-sm bg-blue-600 text-white rounded'
                  >
                    Download
                  </a>
                )}

                {r.kind === 'link' && (
                  <a
                    href={r.url}
                    target='_blank'
                    rel='noreferrer'
                    className='inline-block px-3 py-1 text-sm bg-green-600 text-white rounded'
                  >
                    Open Link
                  </a>
                )}

                {r.kind === 'image' && (
                  <button
                    onClick={() => setPreview({ kind: 'image', url: r.url, title: r.title })}
                    className='inline-block px-3 py-1 text-sm bg-indigo-600 text-white rounded'
                  >
                    Preview
                  </button>
                )}

                {r.kind === 'video' && (
                  <button
                    onClick={() => setPreview({ kind: 'video', url: r.url, title: r.title })}
                    className='inline-block px-3 py-1 text-sm bg-indigo-600 text-white rounded'
                  >
                    Play
                  </button>
                )}

                <button
                  id={`copy-link-button-${r.id}`}
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.origin + r.url);
                    alert('Link copied to clipboard');
                  }}
                  className='cursor-pointer ml-auto text-xs px-2 py-1 border rounded'
                >
                  Copy Link
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Load more */}
        {visible.length < filtered.length && (
          <div className='mt-6 text-center'>
            <button
              onClick={() => setShowCount((s) => s + 6)}
              className='px-4 py-2 bg-slate-800 text-white rounded'
            >
              Load more
            </button>
          </div>
        )}

        {/* Preview modal */}
        {preview && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
            <div className='bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto p-4'>
              <div className='flex items-center justify-between mb-3'>
                <h3 className='font-semibold'>{preview.title}</h3>
                <button
                  onClick={() => setPreview(null)}
                  className='text-sm px-2 py-1 border rounded'
                >
                  Close
                </button>
              </div>

              <div>
                {preview.kind === 'image' && (
                  // using img to keep it simple compatible with public folder
                  // if using Next/Image you may need to allow static path
                  <img src={preview.url} alt={preview.title} className='w-full h-auto rounded' />
                )}
                {preview.kind === 'video' && (
                  <video controls src={preview.url} className='w-full h-auto rounded' />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* Small inline type icon */
function TypeIcon({ kind }: { kind: ResourceKind }) {
  return (
    <div className='w-10 h-10 flex items-center justify-center rounded bg-slate-50 border'>
      {kind === 'document' && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-5 h-5 text-slate-700'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M7 7h6l3 3v7a2 2 0 0 1-2 2H7V7z'
          />
        </svg>
      )}
      {kind === 'image' && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-5 h-5 text-slate-700'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3 7a2 2 0 0 1 2-2h3l2 2h6a2 2 0 0 1 2 2v7H5a2 2 0 0 1-2-2V7z'
          />
        </svg>
      )}
      {kind === 'video' && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-5 h-5 text-slate-700'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 10l4.553-2.276A1 1 0 0 1 21 8.618V15.382a1 1 0 0 1-1.447.894L15 14v-4zM4 6h7v12H4z'
          />
        </svg>
      )}
      {kind === 'link' && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-5 h-5 text-slate-700'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M10 14a5 5 0 0 0 7.07 0l1.83-1.83a3 3 0 0 0-4.24-4.24L12.83 9.76M14 10l-1.5 1.5M6 10a5 5 0 0 1 7.07 0l1.83 1.83a3 3 0 0 1-4.24 4.24L11.17 14.24'
          />
        </svg>
      )}
    </div>
  );
}
