import React from 'react';

import Button from '../../../components/ui/Button';

const LeaderboardPagination = ({
  currentPage = 1,
  totalPages = 1,
  totalUsers = 0,
  usersPerPage = 50,
  onPageChange = () => {},
  className = ''
}) => {
  const startUser = (currentPage - 1) * usersPerPage + 1;
  const endUser = Math.min(currentPage * usersPerPage, totalUsers);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range?.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots?.push(1, '...');
    } else {
      rangeWithDots?.push(1);
    }

    rangeWithDots?.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots?.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots?.push(totalPages);
    }

    return rangeWithDots;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirst = () => {
    if (currentPage !== 1) {
      onPageChange(1);
    }
  };

  const handleLast = () => {
    if (currentPage !== totalPages) {
      onPageChange(totalPages);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`bg-card rounded-lg border border-border ${className}`}>
      {/* Results Info */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="text-sm text-muted-foreground">
          Showing {startUser?.toLocaleString()} to {endUser?.toLocaleString()} of {totalUsers?.toLocaleString()} users
        </div>
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
      </div>
      {/* Desktop Pagination */}
      <div className="hidden md:flex items-center justify-between p-4">
        {/* Previous Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleFirst}
            disabled={currentPage === 1}
            iconName="ChevronsLeft"
            iconPosition="left"
          >
            First
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>
        </div>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {getVisiblePages()?.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-muted-foreground">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="min-w-[40px]"
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLast}
            disabled={currentPage === totalPages}
            iconName="ChevronsRight"
            iconPosition="right"
          >
            Last
          </Button>
        </div>
      </div>
      {/* Mobile Pagination */}
      <div className="md:hidden p-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>

          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e?.target?.value);
                if (page >= 1 && page <= totalPages) {
                  handlePageChange(page);
                }
              }}
              className="w-16 px-2 py-1 text-center border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <span className="text-sm text-muted-foreground">of {totalPages}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        </div>

        {/* Quick Jump Buttons */}
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={handleFirst}
            disabled={currentPage === 1}
          >
            First
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={handleLast}
            disabled={currentPage === totalPages}
          >
            Last
          </Button>
        </div>
      </div>
      {/* Page Size Options */}
      <div className="hidden lg:block p-4 border-t border-border">
        <div className="flex items-center justify-center space-x-4 text-sm">
          <span className="text-muted-foreground">Users per page:</span>
          {[25, 50, 100]?.map((size) => (
            <button
              key={size}
              onClick={() => {
                // This would typically trigger a page size change
                console.log(`Change page size to ${size}`);
              }}
              className={`px-3 py-1 rounded-md transition-colors duration-200 ${
                usersPerPage === size
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPagination;