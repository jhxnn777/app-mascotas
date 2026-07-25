import { Notyf } from "notyf";

const notyf = new Notyf({
    duration: 2500,
    position: {
        x: "right",
        y: "top"
    },
    dismissible: true
});

export default notyf;