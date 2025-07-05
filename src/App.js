import React, { useEffect, useState } from "react";
import "./style.css";

const concepts = [
  { id: 1, type: "concept", value: "useState", match: 101 },
  { id: 101, type: "definition", value: "Permet de gérer l'état local dans un composant fonctionnel.", match: 1 },
  { id: 2, type: "concept", value: "useEffect", match: 102 },
  { id: 102, type: "definition", value: "Exécute une fonction après le rendu du composant.", match: 2 },
  { id: 3, type: "concept", value: "props", match: 103 },
  { id: 103, type: "definition", value: "Données passées d’un composant parent à un enfant.", match: 3 },
  { id: 4, type: "concept", value: "JSX", match: 104 },
  { id: 104, type: "definition", value: "Syntaxe qui mélange JavaScript et HTML.", match: 4 },
];

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setCards(shuffle(concepts));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  const handleClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(cards[index].id)) return;
    setFlipped([...flipped, index]);
    setMoves(moves + 1);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      const card1 = cards[first];
      const card2 = cards[second];
      if (card1.match === card2.id) {
        setMatched((prev) => [...prev, card1.id, card2.id]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  }, [flipped, cards]);

  const isFlipped = (index) => flipped.includes(index) || matched.includes(cards[index].id);

  return (
    <div className="app">
      <h1>🧠 Memory Cards – Apprends React</h1>
      <div className="stats">
        <p>🧮 Coups : {moves}</p>
        <button onClick={resetGame}>🔁 Rejouer</button>
      </div>

      <div className="grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${isFlipped(index) ? "flipped" : ""}`}
            onClick={() => handleClick(index)}
          >
            <div className="card-inner">
              <div className="card-front">❓</div>
              <div className="card-back">{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      {matched.length === cards.length && (
        <div className="win-message">
          🎉 Bravo ! Tu as terminé en {moves} coups !
        </div>
      )}
    </div>
  );
}
