// App.tsx
import React from 'react';
import PictureDropzone from './PictureDropzone';

const App: React.FC = () => {
  return (
    <div className="App" style={{ width: '100%', minHeight: '100vh', padding: '20px' }}>
      {/* PictureDropzone handles the dropping of images and displaying them */}
      <PictureDropzone />
    </div>
  );
};

export default App;
