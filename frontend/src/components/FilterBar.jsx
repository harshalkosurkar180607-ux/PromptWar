import React from 'react';
import { 
  Search, 
  X, 
  Sparkles, 
  Utensils, 
  Compass, 
  Hotel, 
  Landmark, 
  ShieldCheck, 
  DollarSign, 
  Moon, 
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { CATEGORIES } from '../data/citiesData';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  activeModifiers,
  toggleModifier,
  resetFilters,
  totalPlacesCount,
  filteredPlacesCount,
  cityName
}) {
  const getCategoryIcon = (id) => {
    switch (id) {
      case 'food': return <Utensils size={15} />;
      case 'attraction': return <Compass size={15} />;
      case 'hotel': return <Hotel size={15} />;
      case 'heritage': return <Landmark size={15} />;
      default: return <Sparkles size={15} />;
    }
  };

  const isFiltered = searchQuery !== '' || selectedCategory !== 'all' || activeModifiers.length > 0;

  return (
    <div className="filter-bar-card" role="search" aria-label="Explore Filter Engine">
      {/* Search Input */}
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" aria-hidden="true" />
        <input 
          id="places-search-input"
          type="text"
          className="search-input"
          placeholder={`Search attractions, street food, heritage spots or neighborhoods in ${cityName}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search places"
        />
        {searchQuery && (
          <button 
            className="search-clear-btn" 
            onClick={() => setSearchQuery('')}
            title="Clear search query"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="category-pills-row" role="tablist" aria-label="Place Categories">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`filter-cat-${cat.id}`}
              className={`category-pill ${isActive ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
              role="tab"
              aria-selected={isActive}
            >
              {getCategoryIcon(cat.id)}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Modifiers & Result Counter */}
      <div className="modifiers-row">
        <div className="filter-chip-group">
          <span style={{ color: 'var(--text-subtle)', fontWeight: 600, fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <SlidersHorizontal size={13} /> Quick Filters:
          </span>

          <button
            id="filter-budget"
            className={`filter-chip ${activeModifiers.includes('budget') ? 'active' : ''}`}
            onClick={() => toggleModifier('budget')}
            aria-pressed={activeModifiers.includes('budget')}
          >
            <DollarSign size={13} />
            <span>Budget Friendly ($)</span>
          </button>

          <button
            id="filter-safety"
            className={`filter-chip ${activeModifiers.includes('safety') ? 'active' : ''}`}
            onClick={() => toggleModifier('safety')}
            aria-pressed={activeModifiers.includes('safety')}
          >
            <ShieldCheck size={13} />
            <span>High Safety (90+)</span>
          </button>

          <button
            id="filter-night"
            className={`filter-chip ${activeModifiers.includes('night') ? 'active' : ''}`}
            onClick={() => toggleModifier('night')}
            aria-pressed={activeModifiers.includes('night')}
          >
            <Moon size={13} />
            <span>Night-Safe Corridors</span>
          </button>

          {isFiltered && (
            <button
              id="btn-reset-filters"
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.76rem', padding: '0.2rem 0.6rem' }}
              onClick={resetFilters}
              title="Reset all search queries and active filters"
            >
              <RotateCcw size={12} /> Reset
            </button>
          )}
        </div>

        <div className="results-count">
          Showing <strong style={{ color: 'var(--primary-cyan-light)' }}>{filteredPlacesCount}</strong> of {totalPlacesCount} places in {cityName}
        </div>
      </div>
    </div>
  );
}
