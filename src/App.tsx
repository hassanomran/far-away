import React, { useState } from 'react';
import './App.css';

type ItemType = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

const initialItems: ItemType[] = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 6, packed: false },
];

function App() {
  const [items, setItems] = useState<ItemType[]>(initialItems);

  function handleItems(item: ItemType) {
    setItems((items) => [...items, item]);
  }

  return (
    <div className="app">
      <Lego />
      <Form onAddItems={handleItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

function Lego() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ onAddItems }: { onAddItems: (item: ItemType) => void }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newItem: ItemType = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 Trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((element) => (
          <option value={element} key={element}>
            {element}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items }: { items: ItemType[] }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} obj={item} />
        ))}
      </ul>
    </div>
  );
}

function Item({ obj }: { obj: ItemType }) {
  return (
    <li>
      <span style={obj.packed ? { textDecoration: "line-through" } : {}}>
        {obj.quantity} {obj.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>Start adding some items to your packing list 🚀</em>
    </footer>
  );
}

export default App;
