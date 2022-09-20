import Priorities from "./Priorities";

const priorities = Priorities();

const ColorSwitcher = (priority: string): string => {
  return (
    priorities.find((result) => result.value === priority)?.color || "light"
  );
};

export default ColorSwitcher;
