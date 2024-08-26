import { useState } from "react";
import "./assets/index.css";
import { Button } from "./components/Button";
import { FriendList } from "./components/FriendList";
import { FormAddFriend } from "./components/FormAddFriend";
import { FormSplitBill } from "./components/FormSplitBill";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const initialFriends = [
  {
    id: 118836,
    name: "Steve",
    image: "https://i.pravatar.cc/48?u=499481",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=499480",
    balance: 20,
  },
  {
    id: 499476,
    name: "Wolfe",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }
  function handleSelection(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <>
      <div>
        <Header></Header>
        <div className="app">
          <div className="sidebar">
            <FriendList
              friends={friends}
              selectedFriend={selectedFriend}
              onSelection={handleSelection}
            ></FriendList>

            {showAddFriend && (
              <FormAddFriend onAddFriend={handleAddFriend}></FormAddFriend>
            )}
            <Button onClick={handleShowAddFriend}>
              {showAddFriend ? "Close" : "Add Friend"}
            </Button>
          </div>
          {selectedFriend && (
            <FormSplitBill
              selectedFriend={selectedFriend}
              onSplitBill={handleSplitBill}
            ></FormSplitBill>
          )}
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
