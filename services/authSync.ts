// services/authSync.ts
const authChannel = new BroadcastChannel("auth_updates");

export const notifyAuthSuccess = () => {
  authChannel.postMessage("AUTH_SUCCESS");
};

export const listenForAuthUpdates = (callback: () => void) => {
  const listener = (event: MessageEvent) => {
    if (event.data === "AUTH_SUCCESS") {
      callback();
    }
  };
  authChannel.addEventListener("message", listener);
  return () => authChannel.removeEventListener("message", listener);
};
