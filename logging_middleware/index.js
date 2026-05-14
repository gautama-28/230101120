const LOG_API = "http://4.224.186.213/evaluation-service/log";

const ALLOWED_STACKS = ["frontend", "backend"];
const ALLOWED_LEVELS = ["debug", "info", "warn", "error", "fatal"];
const ALLOWED_PACKAGES = [
  "api",
  "component",
  "hook",
  "page",
  "state",
  "style",
];

const isAllowed = (value, allowed) =>
  typeof value === "string" && allowed.includes(value.toLowerCase());

const readTokenFromEnv = () => {
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_LOG_TOKEN) {
    return import.meta.env.VITE_LOG_TOKEN;
  }
  return null;
};

export async function Log(stack, level, pkg, message, opts = {}) {
  const token = opts && opts.token ? opts.token : readTokenFromEnv();

  if (!token) {
    console.error("Log token is missing.");
    return false;
  }

  if (!isAllowed(stack, ALLOWED_STACKS)) {
    console.error("Invalid stack value.");
    return false;
  }

  if (!isAllowed(level, ALLOWED_LEVELS)) {
    console.error("Invalid level value.");
    return false;
  }

  if (!isAllowed(pkg, ALLOWED_PACKAGES)) {
    console.error("Invalid package value.");
    return false;
  }

  if (typeof message !== "string" || !message.trim()) {
    console.error("Invalid message.");
    return false;
  }

  const payload = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: pkg.toLowerCase(),
    message: message.trim(),
  };

  try {
    const res = await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("Log request failed.");
      return false;
    }

    return true;
  } catch {
    console.error("Could not send log.");
    return false;
  }
}

// Default export for convenience
export default Log;
