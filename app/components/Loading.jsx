const Loading = () => {
  return (
    <div className="loading">
      <svg width="64px" height="48px" className="fill-current text-transparent">
        <polyline
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
          id="back"
          className="stroke-current"
          style={{ stroke: "#ff4d5033" }}
        />
        <polyline
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
          id="front"
          className="stroke-current animate-heart_beat"
          style={{
            stroke: "#ff4d4f",
            strokeDasharray: "48, 144",
            strokeDashoffset: "192",
          }}
        />
      </svg>
    </div>
  );
};

export default Loading;
