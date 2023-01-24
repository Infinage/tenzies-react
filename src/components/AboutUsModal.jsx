import Modal from 'react-modal';
Modal.setAppElement('#root');

const AboutUsModal = (props) => {

  const handleInstall = (event) => {
    event.preventDefault();
    props.promptInstall.prompt();
  }
  
  return (
      <Modal
      isOpen={props.isOpen}
      onRequestClose={() => props.setIsOpen(false)}
      contentLabel="Victory!"
      className="modal-container"
    >
      <h2>Enjoying the game?</h2>
      <p>Please consider checking out some of my other works on <a href="https://github.com/Infinage/tenzies-react">Github</a>.</p>
      <div className='modal-container-btns'>
        {props.isPWASupported && <button onClick={handleInstall}>Install Tenzies</button> }
        <button onClick={() => props.setIsOpen(false)}>Close</button>
      </div>
    </Modal>
  )
}

export default AboutUsModal;