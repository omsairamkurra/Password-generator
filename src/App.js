import usePasswordGenerator from "./hooks/use-password-generator";
import "./styles.css";
import { useState } from "react";
import PasswordStrengthIndicator from "./components/strengthChecker";
import Button from "./components/button";
import Checkbox from "./components/checkbox";

export default function App() {
  const [length, setLength] = useState(4);
  const [checkBoxData, setCheckBoxData] = useState([
    { title: "Include Uppercase Letters", state: true },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false }
  ]);
  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkBoxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckBoxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
    console.log({ password });
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  return (
    <div className="App">
      {/* {password text and copy} */}
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <Button
            text={copied ? "Copied" : "copy"}
            onClick={handleCopy}
            className="copyBtn"
          />
        </div>
      )}
      {/* {Character length} */}
      <div className="charlength">
        <span>
          <label>Character length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      {/* {checkboxes} */}
      <div className="checkboxes">
        {checkBoxData.map((checkbox, index) => {
          return (
            <Checkbox
              key={index}
              title={checkbox.title}
              onChange={() => handleCheckboxChange(index)}
              checked={checkbox.state}
            />
          );
        })}
      </div>
      {/* {Strength} */}
      <PasswordStrengthIndicator password={password} />
      {/* {Error Handling} */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {/* {Generate Button} */}

      <Button
        text="Generate Button"
        onClick={() => generatePassword(checkBoxData, length)}
        className="generateBtn"
      />
    </div>
  );
}
