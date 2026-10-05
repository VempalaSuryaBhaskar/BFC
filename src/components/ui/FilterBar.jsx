import { useId } from 'react';
import Icon from './Icon';
import { classNames } from '../../lib/format';
import styles from './FilterBar.module.css';

/**
 * Category chips + optional search box.
 * options: array of strings or { value, label }.
 */
export default function FilterBar({
  options,
  value,
  onChange,
  label = 'Filter by category',
  allLabel = 'All',
  search,
  onSearch,
  searchPlaceholder = 'Search',
  resultCount,
  resultNoun = 'result',
}) {
  const searchId = useId();
  const items = [{ value: 'all', label: allLabel }, ...options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o))];

  return (
    <div className={styles.bar}>
      <div className={styles.row}>
        <div className={styles.chips} role="group" aria-label={label}>
          {items.map((item) => {
            const active = value === item.value;
            return (
              <button
                key={item.value}
                type="button"
                className={classNames(styles.chip, active && styles.active)}
                aria-pressed={active}
                onClick={() => onChange(item.value)}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {onSearch ? (
          <div className={styles.search}>
            <label htmlFor={searchId} className="visually-hidden">
              {searchPlaceholder}
            </label>
            <Icon name="search" size={18} className={styles.searchIcon} />
            <input
              id={searchId}
              type="search"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder={searchPlaceholder}
              autoComplete="off"
            />
          </div>
        ) : null}
      </div>

      {typeof resultCount === 'number' ? (
        <p className={styles.count} aria-live="polite">
          Showing {resultCount} {resultNoun}
          {resultCount === 1 ? '' : 's'}
        </p>
      ) : null}
    </div>
  );
}
