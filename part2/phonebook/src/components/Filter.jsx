const Filter = ({ newSearchText, handleFilterChange }) => {
  return (
    <div>
      filter shown with:
      <input value={newSearchText} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
