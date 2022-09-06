import Toastify from "toastify-js";

export default function alertError(message: string) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#dc2626",
      boxShadow: "none",
      fontWeight: "700",
      borderRadius: "8px",
    },
  }).showToast();
}
