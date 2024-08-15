import "./index.css";

interface PointsProps {
  onEnter: () => void;
  value: number | "";
  onValueChange: (value: number | "") => void;
}

const Points: React.FC<PointsProps> = ({ onEnter, value, onValueChange }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default behavior of Enter key
      onEnter(); // Call the onEnter prop function
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // Convert the string to a number or keep it as an empty string
    onValueChange(inputValue === "" ? "" : Number(inputValue));
  };

  return (
    <input
      className="points"
      type="number"
      value={value}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    />
  );
};

export default Points;
