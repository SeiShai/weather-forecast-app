// Search Bar Component
// TODO: Create a search input component for city search

interface SearchBarProps {
  // TODO: Define your props
}

export default function SearchBar() {
  // TODO: Add state management for input value
  // TODO: Add form submission handler

  return (
    <form className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter city name..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>
    </form>
  );
}
