import React from 'react';
import { BookOpen, FileText, Folder } from 'lucide-react';

const DocsPage = () => {
  // Placeholder data - will be replaced with real API data
  const mockDocs = [
    { id: 1, title: 'Getting Started', type: 'file', path: '/getting-started' },
    { id: 2, title: 'API Reference', type: 'folder', path: '/api' },
    { id: 3, title: 'Components', type: 'folder', path: '/components' },
    { id: 4, title: 'Installation Guide', type: 'file', path: '/installation' },
    { id: 5, title: 'Configuration', type: 'file', path: '/config' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
          Documentation
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Browse through your generated documentation
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Contents
            </h2>
            <nav className="space-y-2">
              {mockDocs.map((doc) => (
                <a
                  key={doc.id}
                  href={doc.path}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {doc.type === 'folder' ? (
                    <Folder className="h-4 w-4" />
                  ) : (
                    <FileText className="h-4 w-4" />
                  )}
                  <span className="text-sm">{doc.title}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="card p-8">
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-secondary-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                No Documentation Generated Yet
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                Generate documentation from a GitHub repository to see it here
              </p>
              <a
                href="/"
                className="btn-primary inline-flex items-center"
              >
                Generate Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;