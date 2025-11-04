import './App.css';

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#1a1a1a',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/grain-texture-grey.svg'})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}
    >
      <h1>LOWFATOR</h1>
    </div>
  );
}

export default App;

