const Priorities = () => {
  // Frontend should be okay when adding more priority types here.
  // Must add new priority into the backend as well (TaskController).
  return [
    { name: "Low", value: "1", color: "success" },
    { name: "Medium", value: "2", color: "warning" },
    { name: "High", value: "3", color: "danger" },
  ];
};

export default Priorities;
