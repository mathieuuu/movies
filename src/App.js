import './App.css';
import {useEffect, useState, useCallback} from "react";
import {PAGE_SIZE, moveSelectedIndex} from "./utils";

const App = () => {
  const [posters, setPosters] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const pageStartIndex = selectedIndex - selectedIndex % PAGE_SIZE;
  const pageEndIndex = Math.min(pageStartIndex + PAGE_SIZE, posters.length);
  const displayedPosters = posters.map((poster, index) => [poster, index]).slice(pageStartIndex, pageEndIndex);
  const nbTotalPosters = posters.length;

  const handleKeyDown = useCallback(
      (evt) => {
        evt.preventDefault();
        moveSelectedIndex(evt.keyCode, selectedIndex, setSelectedIndex, nbTotalPosters);
      },
      [selectedIndex, nbTotalPosters]
  );

  useEffect(() => {
      fetch("https://gist.githubusercontent.com/el-gringo/a9d7d6dfcacfb44047b3aa5bfa484cfb/raw/64973e72cf006b1b99ff8f667e90c8000e9546a8/movies.json")
          .then((res) => res.json())
          .then((json) => setPosters(json.map((movie) => movie.poster)));
  }, []);

  useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="app">
        {nbTotalPosters > 0 ?
            <>
                <div>{pageStartIndex+1} - {pageEndIndex} / {nbTotalPosters}</div>
                <div className="grid">
                    {displayedPosters.map(([poster, index]) =>
                        <div className={index === selectedIndex ? "selected" : "movie"} key={index}>
                            <img src={poster} width={200} alt={poster}></img>
                        </div>
                    )}
                </div>
            </> : <span>No  movie was retrieved</span>
        }
    </div>
  );
}

export default App;
