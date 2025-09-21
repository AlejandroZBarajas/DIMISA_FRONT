import { useState, useEffect } from "react";

interface Props {
  id_cama: number;
  numero_cama: number;
  habilitada: boolean; 
  turnOn: (id_cama: number) => void;
  turnOff: (id_cama: number) => void;
}

export default function CamaIOswitch({
  id_cama,
  numero_cama,
  habilitada,
  turnOn,
  turnOff,
}: Props) {
  const [enabled, setEnabled] = useState(habilitada);

  useEffect(() => {
    setEnabled(habilitada);
  }, [habilitada]);

  const handleToggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    if (newState) {
      turnOn(id_cama);
    } else {
      turnOff(id_cama);
    }
  };

  return (
    <div className="relative flex items-center gap-3 border-verde1 border-2 rounded-full p-2">
      <h2 className="text-lg font-semibold">{numero_cama}</h2>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={enabled}
          onChange={handleToggle}
        />
        <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-all"></div>
        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-full"></div>
      </label>
    </div>
  );
}
