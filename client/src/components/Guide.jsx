export default function Guide ({ howTo }) {

  return (
    <div className="accordion accordion-flush" id="howToAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
          Taking a Selfie
          </button>
        </h2>
        <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#howToAccordion">
          <div className="accordion-body">
            <ul>
              <li>Navigate to camera from home page</li>
              <li>Click white shutter button</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
          Viewing Selfies Taken
          </button>
        </h2>
        <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#howToAccordion">
          <div className="accordion-body">
            <ul>
              <li>Navigate to saved photos from hompage</li>
              <li>Click on the image url you would like to view</li>
              <li>Click the same image to close or a new image</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
          Deleting a Selfie
          </button>
        </h2>
        <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#howToAccordion">
          <div className="accordion-body">
            <ul>
              <li>Select image you wish to delete</li>
              <li>Press the button combination 'Shift' + 'D'</li>
              <li>Hit the confirm button once sure</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseThree">
          Saving a Song
          </button>
        </h2>
        <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#howToAccordion">
          <div className="accordion-body">
            <ul>
              <li>Navigate to new song from the homepage</li>
              <li>Enter song name</li>
              <li>Upload the mp3 file</li>
              <li>Hit submit once everything has been filled</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseThree">
          Listening to Saved Songs
          </button>
        </h2>
        <div id="flush-collapseFive" className="accordion-collapse collapse" data-bs-parent="#howToAccordion">
          <div className="accordion-body">
            <ul>
              <li>Navigate to saved songs from homepage</li>
              <li>Click on anysong you would like to play</li>
              <li>Pause and Play with media controls</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseThree">
          Deleting Saved Songs
          </button>
        </h2>
        <div id="flush-collapseSix" className="accordion-collapse collapse" data-bs-parent="#howToAccordion">
          <div className="accordion-body">
            <ul>
              <li>Select song you wish to delete</li>
              <li>Pres the button combination 'Shift' + 'D'</li>
              <li>Hit the confirm button once sure</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
};
