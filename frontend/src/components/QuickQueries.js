import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Zap, Search, BarChart3, Users, Package, ShoppingCart } from 'lucide-react';
import '../styles/QuickQueries.css';

const QuickQueries = ({ onQuickQuery }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickQueries = [
    {
      category: 'Search Queries',
      icon: <Search size={16} />,
      queries: [
        'Find documents about machine learning',
        'Search for articles by author john_doe',
        'Show me content with tag "technology"',
        'Find documents created this week'
      ]
    },
    {
      category: 'User Analytics',
      icon: <Users size={16} />,
      queries: [
        'How many users do we have?',
        'Show users from Engineering department',
        'List employees hired this year',
        'Find users with salary greater than 80000'
      ]
    },
    {
      category: 'Product Data',
      icon: <Package size={16} />,
      queries: [
        'Count products by category',
        'Show products with low stock',
        'Find most expensive products',
        'List products created last month'
      ]
    },
    {
      category: 'Order Analysis',
      icon: <ShoppingCart size={16} />,
      queries: [
        'Show recent orders',
        'Count orders by status',
        'Calculate total sales this month',
        'Find orders over $1000'
      ]
    },
    {
      category: 'Analytics',
      icon: <BarChart3 size={16} />,
      queries: [
        'Average salary by department',
        'Total revenue last quarter',
        'Group users by hire date',
        'Compare sales by month'
      ]
    }
  ];

  return (
    <div className="quick-queries">
      <button
        className="quick-queries-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Zap size={16} />
        <span>Quick Queries</span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isExpanded && (
        <div className="quick-queries-content">
          <div className="queries-grid">
            {quickQueries.map((category, index) => (
              <div key={index} className="query-category">
                <div className="category-header">
                  {category.icon}
                  <h4>{category.category}</h4>
                </div>
                <div className="category-queries">
                  {category.queries.map((query, queryIndex) => (
                    <button
                      key={queryIndex}
                      className="query-button"
                      onClick={() => onQuickQuery(query)}
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickQueries;