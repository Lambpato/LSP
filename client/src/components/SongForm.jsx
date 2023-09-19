import { ActionContext } from './ActionContext';
import { useContext, useState } from 'react';

export default function SongForm({ userId }) {
  const [title, setTitle] = useState('Upload New Song!');
  const { token } = useContext(ActionContext);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await fetch(`/api/${userId}/songs/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok)
        throw new Error(
          `Error Code: ${response.status} Error Message: It Boke`
        );
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="container">
      <div className="row min-vh-100 pb-5 justify-content-center align-items-center">
        <div className="col col-md-8">
          <h3 className="text-center mb-5">{title}</h3>
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column mb-3 w-25">
              <label className="form-label">
                <input
                  required
                  autoFocus
                  type="text"
                  id="song-name"
                  name="song name"
                  placeholder="song name"
                  className="form-control bg-light"
                />
              </label>
              <label className="form-label">
                <input
                  required
                  autoFocus
                  type="text"
                  id="artist"
                  name="artist"
                  placeholder="artist"
                  className="form-control bg-light"
                />
              </label>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <input required type="file" name="audio" accept=".mp3" />
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => {
                  setTitle('Song Saved!');
                }}>
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
