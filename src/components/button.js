const Button = ({ onClick, text, customClasss }) => {
  return (
    <button className={customClasss} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
