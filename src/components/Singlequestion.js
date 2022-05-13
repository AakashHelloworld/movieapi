import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
const Singlequestion = ({ question, answer }) => {
  const [showinfo, setshowinfo] = useState(false);
  return (
    <div>
      <div>
        <h4>{question}</h4>
        <button className="btn" onClick={() => setshowinfo(!showinfo)}>
          <AiOutlinePlusCircle />
        </button>
      </div>
      {showinfo && answer}
    </div>
  );
};

export default Singlequestion;
