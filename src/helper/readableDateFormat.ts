export const getLastUpdateAt = (updatedAt: string) => {
  console.log("updatedAt", updatedAt)
  if (updatedAt === 'just now' || updatedAt === 'No updated time found') return updatedAt;
  if (!updatedAt) {
    return "No updated time found";
  }

  let lastUpdateTime;
  try {
    lastUpdateTime = new Date(JSON.parse(updatedAt));
  } catch (error) {
    console.error("Error parsing updatedAt:", error);
    return "Invalid date";
  }

  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - lastUpdateTime.getTime();

  const seconds = Math.floor((timeDifference / 1000) % 60);
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let lastUpdatedAt = "";
  if (days > 0) {
    lastUpdatedAt += `${days} day${days > 1 ? "s" : ""} `;
  }
  if (hours > 0) {
    lastUpdatedAt += `${hours} hour${hours > 1 ? "s" : ""} `;
  }
  if (minutes > 0) {
    lastUpdatedAt += `${minutes} minute${minutes > 1 ? "s" : ""} `;
  }
  if (seconds > 0) {
    lastUpdatedAt += `${seconds} second${seconds > 1 ? "s" : ""} `;
  }

  return lastUpdatedAt.trim() || "just now";
}
