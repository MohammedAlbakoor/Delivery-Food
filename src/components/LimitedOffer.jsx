import { useEffect, useState } from "react";

const LimitedOffer = () => {
  const [time, setTime] = useState(7200); // ثانيتين = ساعتين

  useEffect(() => {
    const timer = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const h = Math.floor(time / 3600);
  const m = Math.floor((time % 3600) / 60);
  const s = time % 60;

  return (
    <div className="bg-orange-500 text-white text-center py-4">
      ⏳ Offer ends in {h}:{m}:{s}
    </div>
  );
};

export default LimitedOffer;
