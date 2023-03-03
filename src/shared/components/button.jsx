import React from "react";
import addNotification from "react-push-notification";
const buttonClick = () => {
  addNotification({
    title: "Warning",
    subtitle: "This is a subtitle",
    message: "This is a very long message",
    theme: "darkblue",
    native: true, // when using native, your OS will handle theming.
  });
};
export const Button = () => {
  return (
  <>
    <button
          onClick={buttonClick}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Button
    </button>
  </>
  );
};
