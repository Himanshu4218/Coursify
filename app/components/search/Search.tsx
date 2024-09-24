import { FormEvent, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

interface SuggestionType {
  id: number;
  courseName: string;
}

const Search = ({ data }: { data: SuggestionType[] }) => {
  const [active, setActive] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim() === "") {
      setQuery("");
      setSuggestions([]);
      return;
    }
    setQuery(value);
    const filteredSuggestions = data.filter((sugg) =>
      sugg.courseName.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSelectedSuggestion = (index: number) => {
    setActive(index);
    setQuery(suggestions[index - 1].courseName);
    console.log(suggestions[index - 1].courseName);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      active === suggestions.length
        ? setActive(1)
        : setActive((prev) => prev + 1);
    } else if (e.key === "ArrowUp") {
      active === 1
        ? setActive(suggestions.length)
        : setActive((prev) => prev - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSelectedSuggestion(active);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="relative w-[40%]">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white overflow-hidden border border-[#4B5563] flex items-center gap-3 py-2 px-3 rounded-full"
      >
        <button className="w-[8%] md:w-[5%]">
          <HiOutlineSearch size={20} />
        </button>
        <input
          type="text"
          placeholder="Search"
          value={query}
          className="md:w-[95%] w-[92%] text-[#4B5563] grow outline-none"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white flex flex-col border border-gray-200 shadow rounded-lg overflow-hidden z-50">
          {suggestions.map((sugg, index) => {
            return (
              <li
                key={sugg.id}
                className={`${
                  active === index + 1 ? "bg-gray-200" : ""
                } p-3 border-b border-gray-200 cursor-pointer text-secondary hover:bg-gray-200`}
                onClick={() => handleSelectedSuggestion(index + 1)}
              >
                {sugg.courseName}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Search;
