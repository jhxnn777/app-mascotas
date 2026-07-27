import { Notyf } from "notyf";

const notyf = new Notyf({
  duration: 2500,
  position: {
    x: "right",
    y: "bottom"
  },
  dismissible: true
});

export default notyf;