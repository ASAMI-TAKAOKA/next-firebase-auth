import React from "react";
import Modal from "react-modal";
import { useForm, SubmitHandler } from "react-hook-form";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

type Props = {
  setShowModal: (show: boolean) => void; // setShowModal は boolean を引数に取り、void を返す関数
  showFlag: boolean;
  closeModal: () => void; // closeModal は引数を取らずに void を返す関数
};

type FormValues = {
  example: string;
};

const OneWeekMenuModal = ({ setShowModal, showFlag, closeModal }: Props) => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    closeModal();
  };

  return (
    <div>
      <Modal
        isOpen={showFlag}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>献立登録ボーダル</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("example")} />
          <button>献立を登録</button>
        </form>
        <button onClick={closeModal}>閉じる</button>
      </Modal>
    </div>
  );
};

export default OneWeekMenuModal;
