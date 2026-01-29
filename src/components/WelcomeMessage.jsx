import React from "react";

const WelcomeMessage = ({ name = "Guest" }) => {
  const hour = new Date().getHours();

  let message = "Welcome";
  let emoji = "👋";

  if (hour >= 5 && hour < 12) {
    message = "Good morning";
    emoji = "🌅";
  } else if (hour >= 12 && hour < 17) {
    message = "Good afternoon";
    emoji = "🌤️";
  } else {
    message = "Good evening";
    emoji = "🌙";
  }

  return (
    <div className="text-white text-lg md:text-xl font-semibold mb-3 drop-shadow">
      {message},{" "}
      <span className="text-orange-500 font-bold">{name}</span> {emoji}
    </div>
  );
};

export default WelcomeMessage;
