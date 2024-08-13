import { useState, useRef } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const addressRef = useRef(null);

  const getData = async () => {
    let dataArray;
    const otherAddress = addressRef.current ? addressRef.current.value : null;

    try {
      if (otherAddress) {
        dataArray = await contract.display(otherAddress);
      } else {
        dataArray = await contract.display(account);
      }
      console.log("Data Array:", dataArray);
      const isEmpty = dataArray.length === 0;

      if (!isEmpty) {
        const images = dataArray.map((item, i) => (
          <a href={item} key={i} target="_blank" rel="noopener noreferrer">
            <img
              key={i}
              src={item}
              alt="Uploaded"
              className="image-list"
              onError={(e) => e.target.style.display = 'none'}
            />
          </a>
        ));
        setData(images);
      } else {
        alert("No image to display");
      }
    } catch (e) {
      alert("You don't have access");
    }
  };

  return (
    <>
      <div className="image-list-container">{data}</div>
      <input type="text" placeholder="Enter Address" className="address" ref={addressRef} />
      <button className="center button" onClick={getData}>
        Get Data
      </button>
    </>
  );
};

export default Display;
