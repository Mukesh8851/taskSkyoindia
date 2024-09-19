import React, { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import useDebounce from "../hooks/useDebounce";
import useFetch from "../hooks/useFetch";
import Table from "../components/Table";

function Home() {
  const [inputValue, setInputValue] = useState('');
  const debounceValue = useDebounce(inputValue, 300)
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = useFetch()
  const [filterData, setFilterData] = useState([])
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
//   const suggestionListRef = useRef(null);

  const hanlderChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };
  useEffect(()=>{
    if (inputValue.length > 0) {
        const filtered = suggestions?.data?.meals?.filter((suggestion) =>
        //    console.log(suggestion.strMeal)
            suggestion.strMeal.toLowerCase().includes(inputValue.toLowerCase()) 
        );
        setFilteredSuggestions(filtered);
        setShowSuggestions(true);
      } else {
        setFilteredSuggestions([]);
        setShowSuggestions(false);
      }
  },[debounceValue])
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    // Handle the up, down, and enter keys
    if (e.key === 'ArrowDown') {
      // Move selection down
      if (activeSuggestionIndex < filteredSuggestions.length - 1) {
        setActiveSuggestionIndex(activeSuggestionIndex + 1);
      }
    } else if (e.key === 'ArrowUp') {
      // Move selection up
      if (activeSuggestionIndex > 0) {
        setActiveSuggestionIndex(activeSuggestionIndex - 1);
      }
    } else if (e.key === 'Enter') {
      // Choose the active suggestion
      if (filteredSuggestions.length > 0) {
        setInputValue(filteredSuggestions[activeSuggestionIndex].strMeal);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
      }
    } else if (e.key === 'Escape') {
      // Close the suggestions list
      setShowSuggestions(false);
    }
  };

    // Scroll the suggestions list to keep the active suggestion visible
    // useEffect(() => {
    //     const suggestionList = suggestionListRef.current;
    //     const activeSuggestion = suggestionList?.children[activeSuggestionIndex];
    
    //     if (activeSuggestion) {
    //       const { offsetTop, clientHeight } = activeSuggestion;
    //       const { scrollTop, clientHeight: suggestionListHeight } = suggestionList;
    //       console.log(offsetTop, clientHeight)
    //       // Check if the active suggestion is out of the visible area and scroll accordingly
    //       if (offsetTop + clientHeight > scrollTop + suggestionListHeight) {
    //         suggestionList.scrollTop = offsetTop + clientHeight - suggestionListHeight;
    //       } else if (offsetTop < scrollTop) {
    //         suggestionList.scrollTop = offsetTop -20;
    //       }
    //     }
    //   }, [activeSuggestionIndex, filteredSuggestions]);
  
  return (
    <div>

      <div className="containers">
      <div class="search-bar"> <Input
        type="text"
        value={inputValue}
        onChange={hanlderChange}
        onKeyDown={handleKeyDown}
        placeholder="Type to search..."
      />
      </div>
     
      {showSuggestions &&  (
         <ul 
        //  ref={suggestionListRef}
        className="list-group"
        >
          {filteredSuggestions.length > 0 ? filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion.strMeal)}
              style={{
                padding: '8px',
                cursor: 'pointer',
                backgroundColor: index === activeSuggestionIndex ? '#bde4ff' : '#fff', // Highlight active suggestion
              }}
            >
              {suggestion.strMeal}
            </li>
          ))
        : (
            <li
              style={{
                padding: '8px',
                textAlign: 'center',
                color: '#999',
                backgroundColor: '#f9f9f9',
              }}
            >
              No suggestions available.
            </li>)}
        </ul>
      )}
      
    </div>
    {/* <Table data={suggestions?.data?.meals}/> */}
    </div>
  );
}

export default Home;
