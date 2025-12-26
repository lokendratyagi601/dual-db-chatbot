import React, { useState } from 'react';
import { 
  Table, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Eye, 
  EyeOff, 
  Download,
  Database,
  Clock,
  Hash
} from 'lucide-react';
import '../styles/ResultsDisplay.css';

const ResultsDisplay = ({ data }) => {
  const [viewMode, setViewMode] = useState('summary');
  const [showRawData, setShowRawData] = useState(false);

  if (!data) return null;

  const renderSummary = () => {
    return (
      <div className="results-summary">
        <div className="summary-header">
          <h4>Results Summary</h4>
          <div className="summary-stats">
            {data.total_results !== undefined && (
              <div className="stat">
                <Hash size={16} />
                <span>{data.total_results} records</span>
              </div>
            )}
            {data.sources && (
              <div className="stat">
                <Database size={16} />
                <span>{data.sources.join(', ')}</span>
              </div>
            )}
            {data.metadata?.processing_time && (
              <div className="stat">
                <Clock size={16} />
                <span>Processed</span>
              </div>
            )}
          </div>
        </div>

        {data.summary && (
          <div className="summary-text">
            <p>{data.summary}</p>
          </div>
        )}

        {data.aggregations && Object.keys(data.aggregations).length > 0 && (
          <div className="aggregations-summary">
            <h5>Key Metrics</h5>
            {renderAggregations()}
          </div>
        )}
      </div>
    );
  };

  const renderAggregations = () => {
    const { aggregations } = data;
    if (!aggregations) return null;

    return (
      <div className="aggregations">
        {Object.entries(aggregations).map(([source, aggs]) => (
          <div key={source} className="aggregation-source">
            <h6>{source.charAt(0).toUpperCase() + source.slice(1)}</h6>
            <div className="agg-items">
              {Object.entries(aggs).map(([key, value]) => (
                <div key={key} className="agg-item">
                  <span className="agg-label">{formatAggregationLabel(key)}</span>
                  <span className="agg-value">
                    {Array.isArray(value) ? (
                      <div className="bucket-list">
                        {value.slice(0, 5).map((bucket, idx) => (
                          <div key={idx} className="bucket-item">
                            <span>{bucket.key}</span>
                            <span className="bucket-count">{bucket.count}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      formatValue(value)
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTable = () => {
    if (!data.results || data.results.length === 0) {
      return <div className="no-results">No detailed results to display</div>;
    }

    const results = data.results.slice(0, 10); // Limit to first 10 results
    const columns = getTableColumns(results);

    return (
      <div className="results-table-container">
        <div className="table-header">
          <h4>Detailed Results</h4>
          <span className="result-count">
            Showing {results.length} of {data.total_results || results.length} results
          </span>
        </div>
        
        <div className="table-wrapper">
          <table className="results-table">
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col}>{formatColumnName(col)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, index) => (
                <tr key={index}>
                  {columns.map(col => (
                    <td key={col} className={getColumnClass(col)}>
                      {formatCellValue(row[col], col)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderTimeline = () => {
    if (!data.timeline || data.timeline.length === 0) return null;

    return (
      <div className="timeline-view">
        <h4>Timeline Analysis</h4>
        <div className="timeline">
          {data.timeline.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-date">{item.date}</div>
              <div className="timeline-content">
                <div className="timeline-count">{item.count} items</div>
                {item.items && item.items.length > 0 && (
                  <div className="timeline-samples">
                    {item.items.slice(0, 2).map((sample, idx) => (
                      <div key={idx} className="timeline-sample">
                        {JSON.stringify(sample).substring(0, 100)}...
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRawData = () => {
    return (
      <div className="raw-data">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  };

  const getTableColumns = (results) => {
    if (results.length === 0) return [];
    
    const allKeys = new Set();
    results.forEach(result => {
      Object.keys(result).forEach(key => {
        if (!key.startsWith('_')) { // Exclude metadata fields
          allKeys.add(key);
        }
      });
    });
    
    return Array.from(allKeys).slice(0, 6); // Limit columns for readability
  };

  const formatColumnName = (col) => {
    return col.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatCellValue = (value, column) => {
    if (value === null || value === undefined) return '-';
    
    if (typeof value === 'string' && value.includes('T') && value.includes('Z')) {
      // Likely a date
      try {
        return new Date(value).toLocaleDateString();
      } catch {
        return value;
      }
    }
    
    if (typeof value === 'number' && column.includes('price') || column.includes('salary')) {
      return `$${value.toLocaleString()}`;
    }
    
    if (typeof value === 'string' && value.length > 50) {
      return value.substring(0, 50) + '...';
    }
    
    return value.toString();
  };

  const getColumnClass = (column) => {
    if (column.includes('price') || column.includes('salary') || column.includes('amount')) {
      return 'currency';
    }
    if (column.includes('date') || column.includes('time')) {
      return 'date';
    }
    if (column.includes('id')) {
      return 'id';
    }
    return '';
  };

  const formatAggregationLabel = (key) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatValue = (value) => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  return (
    <div className="results-display">
      <div className="results-header">
        <div className="view-controls">
          <button
            className={viewMode === 'summary' ? 'active' : ''}
            onClick={() => setViewMode('summary')}
          >
            <BarChart3 size={16} />
            Summary
          </button>
          
          {data.results && data.results.length > 0 && (
            <button
              className={viewMode === 'table' ? 'active' : ''}
              onClick={() => setViewMode('table')}
            >
              <Table size={16} />
              Table
            </button>
          )}
          
          {data.timeline && data.timeline.length > 0 && (
            <button
              className={viewMode === 'timeline' ? 'active' : ''}
              onClick={() => setViewMode('timeline')}
            >
              <TrendingUp size={16} />
              Timeline
            </button>
          )}
        </div>

        <div className="data-controls">
          <button
            className="raw-data-toggle"
            onClick={() => setShowRawData(!showRawData)}
          >
            {showRawData ? <EyeOff size={16} /> : <Eye size={16} />}
            Raw Data
          </button>
        </div>
      </div>

      <div className="results-content">
        {showRawData ? (
          renderRawData()
        ) : (
          <>
            {viewMode === 'summary' && renderSummary()}
            {viewMode === 'table' && renderTable()}
            {viewMode === 'timeline' && renderTimeline()}
          </>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;