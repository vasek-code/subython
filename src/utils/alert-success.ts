import Toastify from "toastify-js";

export default function alertSuccess(message: string) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#65a30d",
      boxShadow: "none",
      fontWeight: "700",
      borderRadius: "8px",
    },
  }).showToast();
}
