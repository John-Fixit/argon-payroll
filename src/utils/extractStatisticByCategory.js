export function extractStatisticsByCategory(statistics) {
  const result = {};

  for (const [category, data] of Object.entries(statistics)) {
    const labels = [];
    const stat_data = [];

    for (const [key, value] of Object.entries(data)) {
      const label = key === "" ? "Unspecified" : key; // Replace ""(empty) with "unspecified"
      labels.push(label);
      stat_data.push(value?.length); // Extract the length of each array
    }

    result[category] = {
      labels,
      stat_data,
    };
  }

  return result;
}
