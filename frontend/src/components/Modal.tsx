interface ModalProps {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = props => {
	const closeModal = (event: React.MouseEvent) => {
		event.stopPropagation();
		props.setIsModalOpen(false);
	};

	return (
		<div
			className="fullScreenModalLayer fixed w-full h-full z-10 top-0 bottom-0 left-0 right-0 bg-black bg-opacity-45"
			onClick={event => {
				closeModal(event);
			}}
		>
			<div
				className="modal fixed w-96 h-auto min-h-80 z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-200 
            rounded-xl flex flex-col shadow-lg shadow-"
				onClick={event => event.stopPropagation()}
			>
				{props.children}
			</div>
		</div>
	);
};

export default Modal;
