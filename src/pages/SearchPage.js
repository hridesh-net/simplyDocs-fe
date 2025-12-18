import React, { useState } from 'react';
import { Search, FileText, Clock, ArrowRight } from 'lucide-react';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock search results
  const mockResults = [
    {
      id: 1,
      title: 'Getting Started with React',
      snippet: 'Learn how to set up your first React application with create-react-app...',
      path: '/docs/getting-started',
      type: 'Documentation'
    },
    {
      id: 2,
      title: 'API Configuration',
      snippet: 'Configure your API endpoints and authentication settings...',
      path: '/docs/api/config',
      type: 'API Reference'
    },
    {
      id: 3,
      title: 'Component Props',
      snippet: 'Understanding how to pass and use props in React components...',
      path: '/docs/components/props',
      type: 'Components'
    }
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockResults.filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.snippet.toLowerCase().includes(searchQuery.toLowerCase())
      ));
      setIsSearching(false);
    }, 500);
  };

  const recentSearches = ['React hooks', 'API authentication', 'Component lifecycle'];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
          Search Documentation
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Find exactly what you're looking for in your generated docs
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-secondary-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for functions, classes, concepts..."
            className="input-primary pl-12 text-lg h-14"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
            disabled={isSearching}
          >
            <ArrowRight className="h-5 w-5 text-primary-600 hover:text-primary-700" />
          </button>
        </div>
      </form>

      {/* Recent Searches */}
      {!searchQuery && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Recent Searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(search)}
                className="px-4 py-2 bg-secondary-100 dark:bg-secondary-800 hover:bg-secondary-200 dark:hover:bg-secondary-700 rounded-lg text-sm text-secondary-700 dark:text-secondary-300 transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchQuery && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
              {isSearching ? 'Searching...' : `${searchResults.length} results for "${searchQuery}"`}
            </h2>
          </div>

          {isSearching ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-secondary-200 dark:bg-secondary-700 rounded w-full mb-2"></div>
                  <div className="h-3 bg-secondary-200 dark:bg-secondary-700 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((result) => (
                <div key={result.id} className="card p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer">
                      {result.title}
                    </h3>
                    <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-md">
                      {result.type}
                    </span>
                  </div>
                  <p className="text-secondary-600 dark:text-secondary-400 mb-3">
                    {result.snippet}
                  </p>
                  <div className="flex items-center text-sm text-secondary-500 dark:text-secondary-400">
                    <FileText className="h-4 w-4 mr-1" />
                    {result.path}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-secondary-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                No results found
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                Try adjusting your search terms or generate documentation first
              </p>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!searchQuery && (
        <div className="text-center py-16">
          <Search className="h-16 w-16 text-secondary-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
            Start Searching
          </h3>
          <p className="text-secondary-600 dark:text-secondary-400">
            Enter a search term to find relevant documentation
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;