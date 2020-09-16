import { ModalActivation } from "./ModalActivation";
import ModalArea from "./ModalArea";

//https://programmingwithmosh.com/javascript/create-modal-using-react/

//prevent scrolling after modal is shown
export const toggleScrollLock = () => {
  if (window.innerHeight <= document.body.scrollHeight) {
    document.querySelector("html").classList.toggle("scroll-lock");
  }
};

export { ModalActivation, ModalArea };
