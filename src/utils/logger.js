const LOG_API = "http://4.224.186.213/evaluation-service/logs";

const TOKEN = import.meta.env.VITE_LOG_TOKEN;

export const Log = async (stack, level, pkg, message) => {
  try {
    const response = await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
    });

    const data = await response.json();

    console.log("Log created:", data);
  } catch (error) {
    console.log("Logging failed:", error);
  }
};