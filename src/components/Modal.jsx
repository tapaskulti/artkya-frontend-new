import { IoClose } from "react-icons/io5";
// eslint-disable-next-line react/prop-types
export default function Modal({
  open,
  onClose,
  children,
  title,
  headerColour,
  headertextColour,
  buttonOne,
  buttonOneClick,
  buttonTwo,
  buttonTwoClick,
  modalWidth,
}) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/20" : "invisible"} absolute z-20
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white rounded-xl shadow p-3 transition-all ${modalWidth}
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        {/* Heading */}
        <div
          className={`${headerColour} flex justify-between items-center text-xl ${headertextColour} px-2 space-x-2 rounded-md py-2`}
        >
          <div className="">{title}</div>
          <button onClick={onClose} className="">
            <IoClose />
          </button>
        </div>
        {/* body */}
        <div className=" text-lg">{children}</div>

        {/* fotter */}
        <div className="flex justify-end space-x-4">
          <div
            className="px-4 py-2 rounded-md cursor-pointer"
            onClick={buttonOneClick}
          >
            {buttonOne}
          </div>
          <div
            onClick={buttonTwoClick}
            className="px-4 py-2 rounded-md cursor-pointer"
          >
            {buttonTwo}
          </div>
        </div>
      </div>
    </div>
  );
}
