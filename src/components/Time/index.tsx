interface TimeProps {
  timeElapsed: number;
}

const Time = ({ timeElapsed }: TimeProps) => {
  // Convert timeElapsed to seconds
  const seconds = (timeElapsed % 60).toFixed(1);

  return (
    <div className="timer-container">
      <h1>{seconds}s</h1>
    </div>
  );
};

export default Time;
